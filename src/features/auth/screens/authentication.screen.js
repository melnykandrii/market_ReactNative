import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../../../services/store/actions/auth";
import {
  LogoImage,
  AccountBackground,
  AccountCover,
  KeyboardView,
  LogoContainer,
  AuthCard,
} from "../styles/auth-screen.styles";
import { SignUpComponent } from "../components/sign-up.component";
import { ResetPassComponent } from "../components/reset-password.component";

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

export const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [resetPassword, setResetPassword] = useState(false);
  const [code, setCode] = useState(false);
  const [vCode, setVCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const Agree = props.route ? props.route.params : false;

  useEffect(() => {
    if (Agree) {
      setIsChecked(Agree.setAgree);
    }
  }, [Agree, props.route.params]);

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
      return Alert.alert("Error", error);
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

  const resetPasswordHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.resetPassword(formState.inputValues.email));
      setCode(true);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
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
              {resetPassword ? (
                <ResetPassComponent
                  {...props}
                  setResetPassword={setResetPassword}
                  isLoading={isLoading}
                  inputChangeHandler={inputChangeHandler}
                  resetPasswordHandler={resetPasswordHandler}
                  setCode={setCode}
                  code={code}
                  vCode={vCode}
                  setVCode={setVCode}
                />
              ) : (
                <SignUpComponent
                  {...props}
                  isLoading={isLoading}
                  inputChangeHandler={inputChangeHandler}
                  authHandler={authHandler}
                  isSignUp={isSignUp}
                  setIsSignUp={setIsSignUp}
                  setResetPassword={setResetPassword}
                  navigation={props.navigation}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              )}
            </AuthCard>
          </KeyboardView>
        </AccountCover>
      </AccountBackground>
    </TouchableWithoutFeedback>
  );
};
