import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { Card } from "../../../components/cards/card.component";
import { LinearGradient } from "expo-linear-gradient";
import { BodyButton } from "../../../components/buttons/button.component";
import { CheckBox } from "react-native-elements";

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: -10px;
`;

export const CheckTerms = styled(CheckBox).attrs((props) => ({
  fontFamily: theme.fonts.heading,
  checkedColor: theme.colors.ui.primary,
  containerStyle: {
    backgroundColor: theme.colors.bg.primary,
    borderWidth: 0,
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
}))`
  align-items: center;
`;

export const LogoImage = styled.Image.attrs({
  source: require("../../../../assets/adaptive_icon.png"),
  resizeMode: "cover",
})`
  border-radius: ${(props) => props.theme.sizepx[6]};
  width: ${(props) => props.theme.sizepx[8]};
  height: ${(props) => props.theme.sizepx[8]};
`;

export const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View`
  margin-bottom: -${(props) => props.theme.sizepx[5]};
  z-index: ${(props) => props.theme.sizes[6]};
  elevation: ${(props) => props.theme.sizes[4]};
`;

export const AuthCard = (props) => {
  return <Card style={styles.authCard}>{props.children}</Card>;
};

export const AccountBackground = styled.View.attrs({})`
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
  return (
    <BodyButton
      {...props}
      style={styles.button}
      buttonContant={styles.btContant}
    />
  );
};

const styles = StyleSheet.create({
  authCard: {
    width: "80%",
    maxWidth: theme.sizessh[18],
    maxHeight: theme.sizessh[19],
    backgroundColor: theme.colors.bg.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    width: 120,
    height: 40,
  },
  btContant: {
    width: 120,
    height: 40,
  },
});
