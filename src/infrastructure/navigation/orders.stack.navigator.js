import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../../components/UI/HeaderButton";
import OrdersScreen from "../../../screens/shop/OrdersScreen";
import { theme } from "../theme";

const OrdersNavi = createStackNavigator();

function OrdersNavigation() {
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
          fontSize: 22,
        },
      }}
    >
      <OrdersNavi.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="menu-outline"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersNavi.Navigator>
  );
}

export default OrdersNavigation;
