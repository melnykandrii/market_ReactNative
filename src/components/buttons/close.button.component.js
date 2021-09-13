import React from "react";
import { IconButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const CloseButton = (props) => {
  return (
    <IconButton
      {...props}
      icon={props.name || "close"}
      color={props.buttonColor || theme.colors.bg.primary}
      onPress={props.onClose}
    />
  );
};
