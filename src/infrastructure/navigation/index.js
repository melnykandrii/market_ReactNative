import React from "react";
import { useSelector } from "react-redux";
import { MainDrawerNavi } from "../../../navigation/MainDrawerNavi";
//import { AuthStackNavigator } from "../navigation/auth-stack.navigator";
//import AuthScreen from "../../../screens/user/AuthScreen";

import { NavigationContainer } from "@react-navigation/native";

import { StartupScreen } from "../../features/startup/screens/startup.screen";
import { AuthScreen } from "../../features/auth/screens/authentication.screen";

export const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const tryAuth = useSelector((state) => state.auth.onTryAuth);

  return (
    <NavigationContainer>
      {isAuth && <MainDrawerNavi />}
      {!isAuth && tryAuth && <AuthScreen />}
      {!isAuth && !tryAuth && <StartupScreen />}
    </NavigationContainer>
  );
};
