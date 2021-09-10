import { StyleSheet, View } from "react-native";
import { theme } from "../../src/infrastructure/theme";

import React from "react";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.ui.secondary,
  },
});

export default Card;
