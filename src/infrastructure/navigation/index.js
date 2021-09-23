import React from "react";
import { useSelector } from "react-redux";
import { MainDrawerNavi } from "./main-drawer.navigator";
import { NavigationContainer } from "@react-navigation/native";

import { StartupScreen } from "../../features/startup/screens/startup.screen";
import { AuthStackNavigator } from "./auth-stack.navigator";

export const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const tryAuth = useSelector((state) => state.auth.onTryAuth);

  return (
    <NavigationContainer>
      {isAuth && <MainDrawerNavi />}
      {!isAuth && tryAuth && <AuthStackNavigator />}
      {!isAuth && !tryAuth && <StartupScreen />}
    </NavigationContainer>
  );
};
