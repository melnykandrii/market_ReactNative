import { Platform, StyleSheet, Switch, Text, View } from "react-native";

import React from "react";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{
          false: "green",
          true: "red",
        }}
        thumbColor="yellow"
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "80%",
    marginVertical: 12,
    marginTop: 30,
  },
});
export default FilterSwitch;
