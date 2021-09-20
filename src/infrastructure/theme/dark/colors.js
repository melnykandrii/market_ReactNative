import { Appearance } from "react-native";

export const colors = {
  brand: {
    primary: "#2182BD",
    secondary: "#5282BD",
    muted: "#C6DAF7",
    transparent: "transparent",
    spring: "#2E8B57",
  },
  ui: {
    primary: Appearance.getColorScheme() === "dark" ? "#000000" : "#FFFFFF",
    secondary: Appearance.getColorScheme() === "dark" ? "#FFFFFF" : "#DEDEDE",
    tertiary: "#eee7fe",
    quaternary: "#FFFFFF",
    disabled: "#DEDEDE",
    error: "#D0421B",
    success: "#138000",
    flash: "gold",
    favorite: "#DC143C",
  },
  bg: {
    primary: Appearance.getColorScheme() === "dark" ? "#FFFFFF" : "#000000",
    secondary: "#F1F1F1",
    black: "#000000",
    white: "#FFFFFF",
    grey: "#9C9C9C",
    disabled: Appearance.getColorScheme() === "dark" ? "#F1F1F1" : "#9C9C9C",
  },
  text: {
    primary: Appearance.getColorScheme() === "dark" ? "#FFFFFF" : "#000000",
    secondary: "#757575",
    disabled: "#9C9C9C",
    inverse: "#FFFFFF",
    error: "#D0421B",
    success: "#138000",
  },
};
