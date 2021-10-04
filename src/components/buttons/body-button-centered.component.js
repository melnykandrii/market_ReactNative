import React from "react";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const ButtonSizeH = 40;
const ButtonSizeW = 120;
const deviceWidth = Dimensions.get("window").width / 2 - ButtonSizeW / 2;
const deviceHeight = Dimensions.get("window").height / 1.2;

const StyledButton = styled(Button).attrs((props) => ({
  labelStyle: { fontFamily: theme.fonts.title },
  color: props.buttonColor || theme.colors.ui.success,
  mode: props.mode || "outlined",
  contentStyle: { width: 120, height: 40 },
  style: props.style,
  icon: props.buttonIcon || "check",
  loading: props.buttonLoading,
}))`
  width: ${(props) => props.theme.sizepx[10]};
  font-family: abril;
  border-color: ${(props) => props.theme.colors.ui.disabled};
  align-self: center;
  height: ${ButtonSizeH}px;
  width: ${ButtonSizeW}px;
  padding-bottom: 10px;
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
  border-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.sizepx[1]};
  background-color: ${(props) => props.theme.colors.bg.white};
`;

export const CenteredButton = (props) => {
  return <StyledButton {...props}>{props.buttonTitle}</StyledButton>;
};
