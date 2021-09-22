import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../../../../store/actions/auth";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import {
  LogoImage,
  AccountBackground,
  AccountCover,
  KeyboardView,
  LogoContainer,
  AuthCard,
  AuthButton,
} from "../styles/auth-screen.styles";
import { Spacer } from "../../../components/typography/spacer/spacer.component";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <AccountBackground>
        <AccountCover>
          <KeyboardView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
          >
            <LogoContainer>
              <LogoImage />
            </LogoContainer>

            <AuthCard>
              <ScrollView>
                <Input
                  id="email"
                  label="E-mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  returnKey="next"
                  errorText="Please enter a valid email address"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  submit={() => {
                    this.passwordRef.focus();
                  }}
                  blur={false}
                />
                <Spacer position="bottom" size="xl" />
                <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={6}
                  autoCapitalize="none"
                  returnKey="done"
                  errorText="Please enter a valid password"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  submit={() => {
                    isSignUp ? this.repeatPassRef.focus() : Keyboard.dismiss;
                  }}
                  inputRef={(passwordRef) => {
                    this.passwordRef = passwordRef;
                  }}
                  blur={false}
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
                    submit={Keyboard.dismiss}
                    inputRef={(repeatPassRef) => {
                      this.repeatPassRef = repeatPassRef;
                    }}
                    blur={false}
                  />
                ) : null}
                <Spacer position="bottom" size="xl" />
                <AuthButton
                  buttonTitle={isSignUp ? "SignUp" : "Login"}
                  buttonColor={theme.colors.ui.primary}
                  onPress={authHandler}
                  buttonLoading={isLoading}
                  buttonIcon={
                    isSignUp ? "account-plus" : "account-circle-outline"
                  }
                />
                <AuthButton
                  buttonTitle={`To ${isSignUp ? "Login" : "SignUp"}`}
                  buttonColor={theme.colors.ui.primary}
                  mode="outlined"
                  buttonIcon="account-convert"
                  onPress={() => setIsSignUp((prevState) => !prevState)}
                />
              </ScrollView>
            </AuthCard>
          </KeyboardView>
        </AccountCover>
      </AccountBackground>
    </TouchableWithoutFeedback>
  );
};
