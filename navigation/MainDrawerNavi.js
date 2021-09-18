import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MyProdNavigation from "./MyProductsStack";
import OrdersNavigation from "../navigation/MyOrdersStack";
import { Platform, StyleSheet } from "react-native";
import React from "react";
import ShopNavigation from "../navigation/ShopNavigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerComponent } from "../src/components/drawer/drawer.component";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";
import { theme } from "../src/infrastructure/theme";

const MainDrawer = createDrawerNavigator();

export const MainDrawerNavi = () => {
  const dispatch = useDispatch();
  return (
    <MainDrawer.Navigator
      initialRouteName="Market"
      backBehavior="history"
      drawerContent={(props) => (
        <DrawerComponent
          {...props}
          onLogOut={() => {
            dispatch(authActions.logOut());
          }}
        />
      )}
      drawerStyle={styles.drawer}
      drawerContentOptions={{
        activeTintColor:
          Platform.OS === "android"
            ? theme.colors.bg.primary
            : theme.colors.bg.primary,
        inactiveTintColor:
          Platform.OS === "android"
            ? theme.colors.ui.disabled
            : theme.colors.ui.disabled,
        itemStyle: {
          padding: 30,
        },
        labelStyle: {
          fontFamily: "righteous",
          fontSize: 22,
        },
      }}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          if (route.name === "Market") {
            return (
              <Ionicons
                name={
                  focused ? "chevron-down-circle-outline" : "ellipse-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "For Sale") {
            return (
              <Ionicons
                name={
                  focused ? "chevron-down-circle-outline" : "ellipse-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Orders") {
            return (
              <Ionicons
                name={
                  focused ? "chevron-down-circle-outline" : "ellipse-outline"
                }
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >
      <MainDrawer.Screen name="Market" component={ShopNavigation} />
      <MainDrawer.Screen name="Orders" component={OrdersNavigation} />
      <MainDrawer.Screen name="For Sale" component={MyProdNavigation} />
    </MainDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor:
      Platform.OS === "android"
        ? theme.colors.ui.primary
        : theme.colors.ui.primary,
    width: "85%",
  },
});
