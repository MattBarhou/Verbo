import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TranslateScreen from "./screens/TranslateScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: null,
            headerStyle: { backgroundColor: "#4caf50" },
            headerTintColor: "#ffffff",
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Translate"
          options={{
            title: "Verbo",
            headerStyle: { backgroundColor: "#4caf50" },
            headerBackVisible: false,
          }}
          component={TranslateScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
