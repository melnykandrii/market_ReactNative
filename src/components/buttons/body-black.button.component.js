import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const StyledButton = styled(Button).attrs((props) => ({
  labelStyle: {
    fontFamily: theme.fonts.title,
    fontSize: props.buttonFontSize,
    color: props.labelColor || theme.colors.bg.black,
  },
  mode: props.mode || "outlined",
  loading: props.loading,
  color: props.buttonColor || theme.colors.bg.black,
  icon: props.buttonIcon,
}))`
  width: ${(props) => props.theme.sizepx[10]};
  font-family: abril;
`;

export const BlackBodyButton = (props) => {
  return <StyledButton {...props}>{props.buttonTitle}</StyledButton>;
};
