import React, { useState } from "react";
import { ScrollView, Keyboard, TouchableOpacity } from "react-native";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import { AuthButton } from "../styles/auth-screen.styles";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { Text } from "../../../components/typography/text/text.component";
import { CheckBox } from "react-native-elements";

export const SignUpComponent = (props) => {
  const [checked, setChecked] = useState(false);
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
          <CheckBox
            title="By accepting you are argreed to Terms and Policy"
            checked={checked}
            onIconPress={() => setChecked((prevState) => !prevState)}
            onPress={() => props.navigation.navigate("Tabs")}
            checkedColor="black"
            fontFamily="abril"
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
          />
        </>
      ) : null}
      <Spacer position="bottom" size="xl" />
      <AuthButton
        buttonTitle={props.isSignUp ? "SignUp" : "Login"}
        buttonColor={theme.colors.ui.primary}
        onPress={props.authHandler}
        buttonLoading={props.isLoading}
        buttonIcon={props.isSignUp ? "account-plus" : "account-circle-outline"}
        disabled={props.isSignUp && !checked ? true : false}
      />
      <AuthButton
        buttonTitle={`To ${props.isSignUp ? "Login" : "SignUp"}`}
        buttonColor={theme.colors.ui.primary}
        mode="outlined"
        buttonIcon="account-convert"
        onPress={() => props.setIsSignUp((prevState) => !prevState)}
      />
    </ScrollView>
  );
};
