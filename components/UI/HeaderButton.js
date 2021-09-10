import React from "react";
import Colors from "../../constants/Colors";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { theme } from "../../src/infrastructure/theme";

const DefaultHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color || theme.colors.bg.primary}
    />
  );
};
export default DefaultHeaderButton;
