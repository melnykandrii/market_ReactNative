import { Button, Platform, StyleSheet, View } from "react-native";
import React from "react";

const DefaultButton = (props) => {
  return (
    <View style={styles.buttonCont}>
      <Button {...props} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCont: {
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: Platform.OS === "android" ? "stretch" : "center",
  },
});

export default DefaultButton;
