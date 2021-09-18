import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../infrastructure/theme";
import { BodyButton } from "../buttons/button.component";
import { InfoIcon } from "../icons/info-icon.component";

export const InfoScreen = (props) => {
  return (
    <View style={styles.emptyScreen}>
      <InfoIcon {...props} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subTitle}>{props.subTitle}</Text>
      <View style={styles.buttonCont}>
        <BodyButton
          {...props}
          buttonColor={theme.colors.bg.black}
          title={props.buttonTitle}
          style={styles.button}
          buttonContant={styles.btContant}
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
    fontFamily: theme.fonts.title,
    fontSize: 21,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.title,
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 60,
  },
  button: {
    alignSelf: "center",
    justifyContent:"center",
    width:120,
    height:40
  },
  btContant: {
    width: 120,
    height: 40,
    alignSelf:"center",
  },
});
