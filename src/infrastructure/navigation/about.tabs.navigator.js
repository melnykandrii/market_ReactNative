import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../theme";
import { Icon } from "react-native-elements";
import { TermsScreen } from "../../features/auth/screens/termsService.screen";
import { PolicyScreen } from "../../features/auth/screens/privatePolicy.screen";

const Tab = createBottomTabNavigator();

export const AboutTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Terms") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Privacy") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          }
          return (
            <Icon name={iconName} type="ionicon" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.ui.primary,
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Terms" component={TermsScreen} />
      <Tab.Screen name="Privacy" component={PolicyScreen} />
    </Tab.Navigator>
  );
};
