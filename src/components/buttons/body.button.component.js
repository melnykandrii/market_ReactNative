import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";

export const BodyButton = (props) => {
  return (
    <Button
      {...props}
      onPress={props.onNavi}
      color={props.buttonColor || theme.colors.ui.primary}
      mode={props.mode || "outlined"}
      loading={props.loading}
      icon={props.buttonIcon || "shopping"}
      style={{ ...styles.button, ...props.style }}
    >
      {props.title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: "30%",
    marginTop: theme.sizessh[2],
    height: theme.sizessh[7],
    width: theme.sizessh[11],
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: theme.sizessh[12],
    backgroundColor: theme.colors.bg.primary,
  },
});
