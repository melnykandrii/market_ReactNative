import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const StyledButton = styled(Button).attrs((props) => ({}))`
  width: ${(props) => props.theme.sizepx[10]};
  font-family: abril;
`;

export const BodyButton = (props) => {
  return (
    <StyledButton
      {...props}
      color={props.buttonColor || theme.colors.text.primary}
      mode={props.mode || "outlined"}
      loading={props.buttonLoading}
      icon={props.buttonIcon}
      style={{ ...styles.button, ...props.style }}
      labelStyle={{ ...styles.buttonLabel, ...props.labelStyle }}
      contentStyle={props.buttonContant}
    >
      {props.buttonTitle}
    </StyledButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: theme.colors.ui.disabled,
  },
  buttonLabel: {
    fontFamily: theme.fonts.title,
  },
});
