import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { OrdersScreen } from "../../features/orders/screens/orders.screen";
import { MenuHeaderButton } from "../../components/buttons/menu-header-button.component";
import { theme } from "../theme";

const OrdersNavi = createStackNavigator();

export const OrdersNavigation = () => {
  return (
    <OrdersNavi.Navigator
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
      <OrdersNavi.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <MenuHeaderButton {...props} navigation={navigation} />
          ),
        })}
      />
    </OrdersNavi.Navigator>
  );
};
