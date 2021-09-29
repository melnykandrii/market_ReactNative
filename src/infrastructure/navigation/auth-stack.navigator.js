import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AuthScreen } from "../../features/auth/screens/authentication.screen";
import { AboutTabsNavigator } from "./about.tabs.navigator";

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      headerMode="none"
      backBehavior="none"
      initialRouteName="Auth"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <AuthStack.Screen name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="Tabs" component={AboutTabsNavigator} />
    </AuthStack.Navigator>
  );
};
