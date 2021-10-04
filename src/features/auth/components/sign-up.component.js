import React from "react";
import { ScrollView, Keyboard, TouchableOpacity } from "react-native";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import {
  AuthButton,
  CheckBoxContainer,
  CheckTerms,
} from "../styles/auth-screen.styles";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { Text } from "../../../components/typography/text/text.component";
import { TextButton } from "../../../components/buttons/text-native-button.component";

export const SignUpComponent = (props) => {
  return (
    <ScrollView>
      <Input
        id="email"
        label="E-mail"
        keyboard="email-address"
        placeholder="my@email.my"
        required
        email
        autoCapitalize="none"
        returnKey="next"
        errorText="Please enter a valid email address"
        onInputChange={props.inputChangeHandler}
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
        keyboard="default"
        placeholder="mypassword"
        secureTextEntry
        required
        minLength={6}
        autoCapitalize="none"
        returnKey="done"
        errorText="Please enter a valid password"
        onInputChange={props.inputChangeHandler}
        initialValue=""
        submit={() => {
          props.isSignUp ? this.repeatPassRef.focus() : Keyboard.dismiss;
        }}
        inputRef={(passwordRef) => {
          this.passwordRef = passwordRef;
        }}
        blur={false}
      />
      {props.isSignUp ? null : (
        <TouchableOpacity onPress={() => props.setResetPassword(true)}>
          <Text variant="authLabel">Forgot password?</Text>
        </TouchableOpacity>
      )}
      {props.isSignUp ? (
        <>
          <Input
            id="repeatedPassword"
            label="Repeate Password"
            keyboardType="default"
            placeholder="mypassword"
            secureTextEntry
            required
            minLength={6}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={props.inputChangeHandler}
            initialValue=""
            submit={Keyboard.dismiss}
            inputRef={(repeatPassRef) => {
              this.repeatPassRef = repeatPassRef;
            }}
            blur={false}
          />
          <CheckBoxContainer>
            <CheckTerms
              checked={props.isChecked}
              onIconPress={() => props.setIsChecked((prevState) => !prevState)}
              onPress={() => props.setIsChecked((prevState) => !prevState)}
            />
            <Text variant="agreeLabel">I agree to </Text>
            <TextButton
              buttonTitle="Terms"
              onPress={() =>
                props.navigation.navigate("Terms of Use", { auth: true })
              }
            />
            <Text variant="agreeLabel"> and </Text>
            <TextButton
              buttonTitle="Policy."
              onPress={() =>
                props.navigation.navigate("Privacy Policy", { auth: true })
              }
            />
          </CheckBoxContainer>
        </>
      ) : null}
      <AuthButton
        buttonTitle={props.isSignUp ? "SignUp" : "Login"}
        buttonColor={theme.colors.ui.primary}
        onPress={props.authHandler}
        buttonLoading={props.isLoading}
        buttonIcon={props.isSignUp ? "account-plus" : "account-circle-outline"}
        disabled={props.isSignUp && !props.isChecked ? true : false}
        labelColor={
          !props.isSignUp || (props.isSignUp && props.isChecked)
            ? theme.colors.ui.primary
            : theme.colors.bg.grey
        }
      />
      <AuthButton
        buttonTitle={`To ${props.isSignUp ? "Login" : "SignUp"}`}
        buttonColor={theme.colors.ui.primary}
        mode="outlined"
        buttonIcon="account-convert"
        onPress={() => props.setIsSignUp((prevState) => !prevState)}
      />
      <Spacer size="xxxl" />
    </ScrollView>
  );
};
