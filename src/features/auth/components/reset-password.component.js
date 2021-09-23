import React, { useState } from "react";
import { View, Keyboard, TouchableOpacity, TextInput } from "react-native";
import { Input } from "../../../components/typography/input/input.component";
import { theme } from "../../../infrastructure/theme";
import { AuthButton } from "../styles/auth-screen.styles";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { Text } from "../../../components/typography/text/text.component";

export const ResetPassComponent = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      {props.code ? (
        <>
          <Text variant="authHeader">Code verification</Text>
          <Text variant="authHeader">Code:</Text>
          <TextInput
            value={props.vCode}
            keyboardType="numeric"
            onChangeText={props.setVCode}
            placeholder="Code"
            style={{
              borderWidth: 1,
              marginTop: 10,
              height: 40,
              width: 100,
              borderColor: theme.colors.bg.grey,
              color: theme.colors.bg.primary,
              backgroundColor: theme.colors.ui.primary,
            }}
            selectionColor={theme.colors.bg.grey}
            cursorColor={theme.colors.bg.grey}
            placeholderTextColor={props.phtextColor || theme.colors.bg.grey}
          />
          <Spacer position="bottom" size="xl" />

          <AuthButton
            buttonTitle="Verify"
            buttonColor={theme.colors.ui.primary}
            onPress={props.codeVerifyHandler}
            buttonLoading={props.isLoading}
            buttonIcon="email-outline"
          />
          <AuthButton
            buttonTitle="Go Back"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            buttonIcon="email-outline"
            onPress={() => props.setCode(false)}
          />
        </>
      ) : (
        <>
          <Text variant="authHeader">Reset Password</Text>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            returnKey="done"
            errorText="Please enter a valid email address"
            onInputChange={props.inputChangeHandler}
            initialValue=""
            placeholder="Please enter e-mail address"
            submit={props.resetPasswordHandler}
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
    </View>
  );
};
