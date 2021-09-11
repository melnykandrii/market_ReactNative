import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../../../../store/actions/auth";

import { BodyButton } from "../../../components/buttons/body.button.component";
import { Card } from "../../../components/cards/card.component";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import { LogoImage } from "../styles/auth-screen.styles";

import { LinearGradient } from "expo-linear-gradient";
import { AccountBackground, AccountCover } from "../styles/auth-screen.styles";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      repeatedPassword: "",
    },
    inputValidities: {
      email: false,
      password: false,
      repeatedPassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      return Alert.alert("An error occured!", error);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.logIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      //navigation.navigate("Places");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <AccountBackground>
      <AccountCover>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
          style={styles.screenContainer}
        >
          <View style={styles.logoContainer}>
            <LogoImage style={styles.logo} />
          </View>

          <Card style={styles.authScreenContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,0.5)", "transparent"]}
              style={styles.gradiant}
            >
              <ScrollView>
                <Input
                  id="email"
                  label="E-mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid email address"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={6}
                  autoCapitalize="none"
                  errorText="Please enter a valid password"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                {isSignUp ? (
                  <Input
                    id="repeatedPassword"
                    label="RepeatePassword"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={6}
                    autoCapitalize="none"
                    errorText="Please enter a valid password"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                ) : null}
                <BodyButton
                  title={isSignUp ? "SignUp" : "Login"}
                  buttonColor={theme.colors.ui.tertiary}
                  onNavi={authHandler}
                  loading={isLoading}
                  style={styles.button}
                  buttonIcon={
                    isSignUp ? "account-plus" : "account-circle-outline"
                  }
                />
                <BodyButton
                  title={`To ${isSignUp ? "Login" : "SignUp"}`}
                  buttonColor={theme.colors.ui.tertiary}
                  mode="outlined"
                  buttonIcon="account-convert"
                  style={styles.button}
                  onNavi={() => setIsSignUp((prevState) => !prevState)}
                />
              </ScrollView>
            </LinearGradient>
          </Card>
        </KeyboardAvoidingView>
      </AccountCover>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  authScreenContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: "#AF8BFA",
  },
  gradiant: {
    paddingVertical: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    marginHorizontal: "20%",
  },
  logoContainer: { marginBottom: -20, zIndex: 1, elevation: 20 },
  logo: {},
});
