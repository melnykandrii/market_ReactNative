import React from "react";
import { Keyboard } from "react-native";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import { AuthButton } from "../styles/auth-screen.styles";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { Text } from "../../../components/typography/text/text.component";
import styled from "styled-components";

const Container = styled.View`
  align-items: center;
`;

export const ResetPassComponent = (props) => {
  return (
    <Container>
      {props.code ? (
        <>
          <Text variant="authHeader">Check your email.</Text>
          <Text variant="authHeader">
            The password reset confirmation letter was sent to your email.
            Please follow the instruction in order to change your password.
          </Text>

          <Spacer position="bottom" size="xl" />

          <AuthButton
            buttonTitle="Ok"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onPress={() => props.setResetPassword(false)}
          />
        </>
      ) : (
        <>
          <Text variant="authHeader">Reset Password</Text>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            placeholder="my@email.my"
            required
            email
            autoCapitalize="none"
            returnKey="done"
            errorText="Please enter a valid email address"
            onInputChange={props.inputChangeHandler}
            initialValue=""
            submit={Keyboard.dismiss}
          />
          <Spacer position="bottom" size="xl" />

          <AuthButton
            buttonTitle="Send"
            buttonColor={theme.colors.ui.primary}
            onPress={props.resetPasswordHandler}
            buttonLoading={props.isLoading}
            buttonIcon="email-outline"
          />
          <AuthButton
            buttonTitle="Go Back"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            buttonIcon="account-arrow-left-outline"
            onPress={() => props.setResetPassword(false)}
          />
        </>
      )}
    </Container>
  );
};
