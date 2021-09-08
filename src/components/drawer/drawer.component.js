import React from "react";
import { SafeAreaView, View, Platform } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { CloseButton } from "../buttons/close.button.component";
import { LogOutButton } from "../buttons/logout.button.component";
import Colors from "../../../constants/Colors";

export const DrawerComponent = (props) => {
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <CloseButton
            {...props}
            name="close"
            onClose={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }
            buttonColor={
              Platform.OS === "android" ? Colors.labeldroid : Colors.labelios
            }
          />
          <LogOutButton
            buttonLabel="LogOut"
            mode="text"
            onLogOut={props.onLogOut}
            logOutColor={
              Platform.OS === "android" ? Colors.labeldroid : Colors.labelios
            }
          />
        </View>

        <DrawerItemList {...props} />
      </SafeAreaView>
    </View>
  );
};
