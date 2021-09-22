import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { CloseButton } from "../../../components/buttons/close.button.component";
import { InfoIcon } from "../../../components/icons/info-icon.component";

export const ActionScreen = (props) => {
  return (
    <View style={styles.imageContainer}>
      <CloseButton
        style={styles.closeButton}
        size={30}
        onClose={() => props.navigation.goBack()}
      />

      <InfoIcon
        {...props}
        size={100}
        iconName="check-bold"
        iconColor="white"
        iconBg="green"
      />
      <Text
        style={{
          marginTop: 60,
          fontSize: 50,
          color: "green",
          fontFamily: theme.fonts.heading,
        }}
      >
        Success!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.ui.primary,
  },
  closeButton: {
    position: "absolute",
    zIndex: 9,
    top: 20,
    right: 10,
  },
});
