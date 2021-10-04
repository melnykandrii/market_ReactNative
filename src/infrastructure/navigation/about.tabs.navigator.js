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
          if (route.name === "Terms of Use") {
            iconName = focused ? "mortar-board" : "mortar-board";
          } else if (route.name === "Privacy Policy") {
            iconName = focused ? "law" : "law";
          }
          return (
            <Icon name={iconName} type="octicon" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.bg.black,
        inactiveTintColor: theme.colors.bg.grey,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Terms of Use" component={TermsScreen} />
      <Tab.Screen name="Privacy Policy" component={PolicyScreen} />
    </Tab.Navigator>
  );
};
