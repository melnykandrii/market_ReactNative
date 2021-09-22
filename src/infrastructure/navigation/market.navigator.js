import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import { CartScreen } from "../../features/market/screens/cart.screen";
import FiltersScreen from "../../../screens/shop/FiltersScreen";
import HeaderButton from "../../../components/UI/HeaderButton";
import { ProductDetailsScreen } from "../../features/market/screens/product-details.screen";
import React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import { theme } from "../theme";
import { ImageScreen } from "../../features/market/screens/image.screen";
import { HeaderBadgedButton } from "../../components/buttons/header-badged-button.component";

import { ActionScreen } from "../../features/market/screens/action.screen";

import { ShopScreen } from "../../features/market/screens/market.screen";

const ShopNavi = createStackNavigator();

export const ShopNavigator = () => {
  const cartTotalQty = useSelector((state) => state.cart.totalQty);
  return (
    <ShopNavi.Navigator
      initialRouteName="Simple Market"
      backBehavior="history"
      headerMode="screen"
      screenOptions={{
        headerTitleAllowFontScaling: true,
        headerBackTitleVisible: false,
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
      <ShopNavi.Screen
        name="Simple Market"
        component={ShopScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="menu-outline"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
                testID="menu"
              />
            </HeaderButtons>
          ),
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
              <Item
                badgeVisible={false}
                title="Filter"
                iconName={"filter-sharp"}
                badgeTestId="filter-badge"
                buttonTestId="filter-button-badge"
                testID="filterBadge"
                onPress={() => {
                  navigation.navigate("Filters");
                }}
              />
              <Item
                badgeVisible={cartTotalQty}
                badgeValue={cartTotalQty}
                badgeTestId="cart-badge"
                buttonTestId="cart-button-badge"
                title="Cart"
                iconName="cart"
                testID="cartBadge"
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ShopNavi.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={({ route, navigation }) => ({
          title: route.params?.productTitle ?? "Product Details",
          gestureEnabled: true,
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
              <Item
                badgeVisible={cartTotalQty}
                badgeValue={cartTotalQty}
                badgeTestId="cart-badge"
                buttonTestId="cart-button-badge"
                title="Cart"
                iconName="cart"
                testID="cartBadge"
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ShopNavi.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={() => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.FadeFromBottomAndroid,
        })}
      />
      <ShopNavi.Screen name="Cart" component={CartScreen} />
      <ShopNavi.Screen
        name="Actions"
        component={ActionScreen}
        options={() => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.FadeFromBottomAndroid,
        })}
      />
      <ShopNavi.Screen
        name="Filters"
        component={FiltersScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          title: "Filters",
          ...TransitionPresets.FadeFromBottomAndroid,
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Close"
                iconName="close-outline"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="checkmark-outline"
                onPress={() => {
                  route.params.save();
                  navigation.goBack();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </ShopNavi.Navigator>
  );
};
