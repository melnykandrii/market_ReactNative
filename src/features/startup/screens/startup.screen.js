import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Colors from "../../../../constants/Colors";
import * as authActions from "../../../../store/actions/auth";
import { Background, Container } from "../styles/startup-screen.styles";

export const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setAuth());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setAuth());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <Background>
      <Container>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </Container>
    </Background>
  );
};
