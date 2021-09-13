import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { Card } from "../../../components/cards/card.component";
import { LinearGradient } from "expo-linear-gradient";
import { BodyButton } from "../../../components/buttons/body.button.component";

export const LogoImage = styled.Image.attrs({
  source: require("../../../../assets/adaptive_icon.png"),
  resizeMode: "cover",
})`
  border-radius: ${(props) => props.theme.sizepx[6]};
  width: ${(props) => props.theme.sizepx[8]};
  height: ${(props) => props.theme.sizepx[8]};
`;

export const Keyboard = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View`
  margin-bottom: -${(props) => props.theme.sizepx[4]};
  z-index: ${(props) => props.theme.sizes[4]};
  elevation: ${(props) => props.theme.sizes[4]};
`;

export const AuthCard = (props) => {
  return <Card style={styles.authCard}>{props.children}</Card>;
};

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg_places.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const AuthGradient = styled(LinearGradient)`
  padding-vertical: ${(props) => props.theme.sizepx[5]};
  align-items: center;
  border-radius: ${(props) => props.theme.sizepx[2]}; ;
`;

export const AuthButton = (props) => {
  return <BodyButton {...props} style={styles.button} />;
};

const styles = StyleSheet.create({
  authCard: {
    width: "80%",
    maxWidth: theme.sizessh[18],
    maxHeight: theme.sizessh[18],
    backgroundColor: theme.colors.ui.primary,
  },
  button: {
    marginHorizontal: "20%",
  },
});
