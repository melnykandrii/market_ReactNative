import React from "react";
import { Platform } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import HeaderButton from "../components/UI/HeaderButton";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { theme } from "../src/infrastructure/theme";

const OrdersNavi = createStackNavigator();

function OrdersNavigation() {
  return (
    <OrdersNavi.Navigator
      initialRouteName="My Orders"
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.ui.primary,
        },
        headerTintColor: theme.colors.bg.primary,
        headerTitleAlign: "center",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
          fontSize: 22,
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <OrdersNavi.Screen
        name="My Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={
                  Platform.OS === "android" ? "logo-android" : "logo-apple"
                }
                onPress={() => {
                  navigation.toggleDrawer();
                  //console.log('Search tapped')
                  //navigation.navigate('Categories')
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
