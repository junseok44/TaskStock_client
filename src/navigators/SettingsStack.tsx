import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import ThemeScreen from "../screens/Settings/ThemeScreen";

const NativeStack = createNativeStackNavigator();

const SettingsStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen
      name="Settings"
      component={SettingsHomeScreen}
      options={{}}
    />
    <NativeStack.Screen
      name="SettingsTheme"
      component={ThemeScreen}
      options={{}}
    />
  </NativeStack.Navigator>
);

export default SettingsStack;