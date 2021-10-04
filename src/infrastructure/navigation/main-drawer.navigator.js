import { MyProdNavigation } from "./myproducts.stack.navigator";
import { OrdersNavigation } from "./orders.stack.navigator";
import { StyleSheet } from "react-native";
import React from "react";
import { ShopNavigator } from "./market.navigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerComponent } from "../../components/drawer/drawer.component";
import * as authActions from "../../services/store/actions/auth";
import { useDispatch } from "react-redux";
import { theme } from "../theme";
import { MenuIcon } from "../../components/icons/menu-icon.component";
import { TermsNavigation } from "./terms.stack.navigator";
import { PolicyNavigation } from "./policy.stack.navigator";

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
        activeTintColor: theme.colors.bg.primary,
        inactiveTintColor: theme.colors.bg.grey,
        itemStyle: {
          padding: theme.spacessh[13],
        },
        labelStyle: {
          fontFamily: theme.fonts.heading,
          fontSize: theme.fontSize.body,
        },
      }}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          if (route.name === "Market") {
            return <MenuIcon color={color} focused={focused} size={size} />;
          } else if (route.name === "For Sale") {
            return <MenuIcon color={color} focused={focused} size={size} />;
          } else if (route.name === "Orders") {
            return <MenuIcon color={color} focused={focused} size={size} />;
          } else if (route.name === "Terms") {
            return <MenuIcon color={color} focused={focused} size={size} />;
          } else if (route.name === "Policy") {
            return <MenuIcon color={color} focused={focused} size={size} />;
          }
        },
      })}
    >
      <MainDrawer.Screen name="Market" component={ShopNavigator} />
      <MainDrawer.Screen name="Orders" component={OrdersNavigation} />
      <MainDrawer.Screen name="For Sale" component={MyProdNavigation} />
      <MainDrawer.Screen name="Terms" component={TermsNavigation} />
      <MainDrawer.Screen name="Policy" component={PolicyNavigation} />
    </MainDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: theme.colors.ui.primary,
    width: "85%",
  },
});
