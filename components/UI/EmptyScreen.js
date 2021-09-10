import { Button, Platform, StyleSheet, Text, View } from "react-native";

import DefaultButton from "./DefaultButton";
import React from "react";
import { theme } from "../../src/infrastructure/theme";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { InfoIcon } from "../../src/components/icons/info-icon.component";

const DefaultEmptyScreen = (props) => {
  return (
    <View style={styles.emptyScreen}>
      <InfoIcon {...props} icon={props.infoIcon} />
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
    //alignItems: 'center',
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    //padding: 10,
    textAlign: "center",
    marginVertical: 20,
    //margin: 30,
    //marginVertical: 5
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 30,
    //marginVertical: 20,
    marginBottom: 60,
  },
});

export default DefaultEmptyScreen;
