import MyProdNavigation from "./myproducts.stack.navigator";
import OrdersNavigation from "./orders.stack.navigator";
import { StyleSheet } from "react-native";
import React from "react";
import ShopNavigation from "./market.navigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerComponent } from "../../components/drawer/drawer.component";
import * as authActions from "../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { theme } from "../theme";
import { MenuIcon } from "../../components/icons/menu-icon.component";

const MainDrawer = createDrawerNavigator();

export const MainDrawerNavi = () => {
  const dispatch = useDispatch();

  return (
    <MainDrawer.Navigator
      initialRouteName="Market"
      backBehavior="none"
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
        inactiveTintColor: theme.colors.ui.disabled,
        itemStyle: {
          padding: theme.spacessh[17],
        },
        labelStyle: {
          fontFamily: theme.fonts.heading,
          fontSize: theme.fontSize.h5,
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
    backgroundColor: theme.colors.ui.primary,
    width: "85%",
  },
});