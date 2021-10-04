import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const StyledButton = styled(Button).attrs((props) => ({
  labelStyle: {
    fontFamily: theme.fonts.title,
    fontSize: props.buttonFontSize,
    color: props.labelColor || theme.colors.ui.primary,
  },
}))`
  width: ${(props) => props.buttonWidth || props.theme.sizepx[10]};
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
});
