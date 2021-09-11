import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../src/infrastructure/theme";

const DefaultHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={28}
      color={props.color || theme.colors.bg.primary}
    />
  );
};
export default DefaultHeaderButton;
