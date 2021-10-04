import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { MenuHeaderButton } from "../../components/buttons/menu-header-button.component";
import { theme } from "../theme";
import { TermsScreen } from "../../features/auth/screens/termsService.screen";

const Navi = createStackNavigator();

export const TermsNavigation = () => {
  return (
    <Navi.Navigator
      initialRouteName="Orders"
      headerMode="screen"
      backBehavior="history"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.ui.primary,
        },
        headerTintColor: theme.colors.bg.primary,
        headerTitleAlign: "center",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
          fontFamily: theme.fonts.heading,
          fontSize: theme.fontSize.h5,
        },
      }}
    >
      <Navi.Screen
        name="Terms of Use"
        component={TermsScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <MenuHeaderButton {...props} navigation={navigation} />
          ),
        })}
      />
    </Navi.Navigator>
  );
};
