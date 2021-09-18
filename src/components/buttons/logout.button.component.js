import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";

export const LogOutButton = (props) => {
  return (
    <Button
      {...props}
      icon={props.iconName}
      mode={props.mode}
      color={props.logOutColor || theme.colors.bg.primary}
      onPress={props.onLogOut}
      labelStyle={styles.label}
      testId="logOut-button"
    >
      {props.buttonLabel}
    </Button>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "righteous",
  },
});
