import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CartScreen from "./CartScreen";
import ProductListScreen from "./ProductListScreen";
import TokenScreen from "./TokenScreen";
import UsersScreen from "./UsersScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Token" component={TokenScreen} />
    </Tab.Navigator>
  );
}
