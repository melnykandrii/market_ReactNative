import React from "react";
import { IconButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const ClButton = styled(IconButton)`
  position: absolute;
  z-index: 9;
  top: 20px;
  right: 10px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CloseButton = (props) => {
  return (
    <ClButton
      {...props}
      icon={props.name || "close"}
      color={props.buttonColor || theme.colors.bg.primary}
      size={30}
      onPress={() => props.navigation.goBack()}
    />
  );
};
