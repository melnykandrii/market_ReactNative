import { Button, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../src/infrastructure/theme";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { InfoIcon } from "../../src/components/icons/info-icon.component";

const DefaultEmptyScreen = (props) => {
  return (
    <View style={styles.emptyScreen}>
      <InfoIcon {...props} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subTitle}>{props.subTitle}</Text>
      <View style={styles.buttonCont}>
        <BodyButton
          {...props}
          title={props.buttonTitle}
          buttonIcon={props.buttonIcon || "shopping"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 21,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 60,
  },
});

export default DefaultEmptyScreen;
