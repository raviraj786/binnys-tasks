import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTabs from "../screen/HomeTabs";
import ProductListScreen from "../screen/ProductListScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
