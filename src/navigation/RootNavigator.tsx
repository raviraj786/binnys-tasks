import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTabs from "../screen/HomeTabs";
import UserDetailScreen from "../screen/UserDetailScreen";



export type RootStackParamList = {
  Tabs: undefined;
  UserDetails: { id: string };
};



const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen
       name="Tabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
           <Stack.Screen name="UserDetails" component={UserDetailScreen} options={{ title: 'User Details' }} />

    </Stack.Navigator>
  );
}

export default RootNavigator;
