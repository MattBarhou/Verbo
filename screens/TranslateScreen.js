import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { languages } from "../constants/languages";

export default function TranslateScreen() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [inputLanguage, setInputLanguage] = useState("auto");
  const [openInputDropdown, setOpenInputDropdown] = useState(false);
  const [openTargetDropdown, setOpenTargetDropdown] = useState(false);

  // Dynamic Translation
  useEffect(() => {
    const fetchTranslation = async () => {
      if (inputText.trim() === "") {
        setTranslatedText("");
        return;
      }

      const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
        inputText
      )}`;

      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setTranslatedText(result[0][0][0]);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    fetchTranslation();
  }, [inputText, inputLanguage, targetLanguage]);

  const speakText = () => {
    if (translatedText) {
      Speech.speak(translatedText, { language: targetLanguage });
    } else {
      console.warn("No translated text to speak!");
    }
  };

  // Function to swap input and target languages
  const swapLanguages = () => {
    const temp = inputLanguage;
    setInputLanguage(targetLanguage);
    setTargetLanguage(temp);
    const tempInputText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempInputText);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder="Type text here..."
          value={inputText}
          multiline={true}
          onChangeText={setInputText}
        />

        {/* Divider */}
        {translatedText !== "" && <View style={styles.divider} />}

        {/* Translated Text */}
        {translatedText !== "" && (
          <View style={styles.translationContainer}>
            <Text style={styles.translatedText}>{translatedText}</Text>

            {/* Listen Button */}
            <TouchableOpacity style={styles.listenButton} onPress={speakText}>
              <Text style={styles.buttonText}>Listen</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Language Selection at Bottom */}
        <View style={styles.languageContainer}>
          <View style={[styles.dropdownWrapper, { marginRight: 10 }]}>
            <DropDownPicker
              open={openInputDropdown}
              value={inputLanguage}
              items={languages}
              setOpen={setOpenInputDropdown}
              setValue={setInputLanguage}
              placeholder="Input Language"
              style={styles.dropdownStyle}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
            />
          </View>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <Ionicons name="swap-horizontal" size={24} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openTargetDropdown}
              value={targetLanguage}
              items={languages}
              setOpen={setOpenTargetDropdown}
              setValue={setTargetLanguage}
              placeholder="Translate To"
              style={styles.dropdownStyle}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#4caf50",
    marginVertical: 10,
  },
  translationContainer: {
    marginTop: 10,
  },
  translatedText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 15,
  },
  listenButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto", // Push to bottom
    marginBottom: 30,
  },
  dropdownWrapper: {
    flex: 4,
  },
  swapButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 50,
    height: 50,
    marginRight: 10,
    width: 50,
    elevation: 3,
  },
  dropdownStyle: {
    backgroundColor: "#1f1f1f",
    borderColor: "#4caf50",
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: "#1f1f1f",
    borderColor: "#4caf50",
  },
  dropdownText: {
    color: "#ffffff",
    fontSize: 14,
  },
});
