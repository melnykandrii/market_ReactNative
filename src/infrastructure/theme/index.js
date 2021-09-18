//import React from "react";
//import { Appearance } from "react-native";
import { colors, darkColors } from "./colors";
import { space, spacessh, lineHeights } from "./spacing";
import { sizes, sizepx, sizessh } from "./sizes";
import { fonts, fontWeights, fontSizes, fontSize } from "./fonts";
/*
export let theme;
console.log(theme);
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  theme === darkTheme;
} else {
  theme === lightTheme;
}
*/
export const theme = {
  colors,
  space,
  lineHeights,
  sizessh,
  sizes,
  sizepx,
  fonts,
  fontSizes,
  fontSize,
  fontWeights,
  spacessh,
};

const darkTheme = {
  darkColors,
  space,
  lineHeights,
  sizessh,
  sizes,
  sizepx,
  fonts,
  fontSizes,
  fontSize,
  fontWeights,
  spacessh,
};
