import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AuthScreen } from "../../features/auth/screens/authentication.screen";
import { TermsScreen } from "../../features/auth/screens/termsService.screen";
import { PolicyScreen } from "../../features/auth/screens/privatePolicy.screen";

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
      <AuthStack.Screen name="Terms of Use" component={TermsScreen} />
      <AuthStack.Screen name="Privacy Policy" component={PolicyScreen} />
    </AuthStack.Navigator>
  );
};
