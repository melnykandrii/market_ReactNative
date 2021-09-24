import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";

export const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: theme.colors.bg.black,
    shadowOpacity: theme.spacessh[1],
    shadowOffset: { width: theme.spacessh[0], height: theme.spacessh[3] },
    shadowRadius: theme.sizessh[1],
    elevation: theme.sizessh[0],
    borderRadius: theme.sizessh[2],
    backgroundColor: theme.colors.ui.primary,
  },
});
