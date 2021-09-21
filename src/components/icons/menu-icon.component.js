import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const MenuIcon = (props) => {
  return (
    <Ionicons
      name={props.focused ? "chevron-down-circle-outline" : "ellipse-outline"}
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );
};
