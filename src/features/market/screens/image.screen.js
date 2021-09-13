import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { CloseButton } from "../../../components/buttons/close.button.component";

export const ImageScreen = (props) => {
  const imageUrl = props.route.params?.imageUrl ?? null;
  return (
    <View style={styles.imageContainer}>
      <CloseButton
        style={styles.closeButton}
        size={30}
        onClose={() => props.navigation.goBack()}
      />
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.ui.tertiary,
  },
  closeButton: {
    position: "absolute",
    zIndex: 9,
    top: 20,
    right: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
