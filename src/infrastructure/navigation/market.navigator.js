import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HeaderButtons } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import { CartScreen } from "../../features/market/screens/cart.screen";
import { FiltersScreen } from "../../features/market/screens/filters.screen";
import { ProductDetailsScreen } from "../../features/market/screens/product-details.screen";
import { ImageScreen } from "../../features/market/screens/image.screen";
import { ActionScreen } from "../../features/market/screens/action.screen";
import { ShopScreen } from "../../features/market/screens/market.screen";
import { FavouritesScreen } from "../../features/market/screens/favourites.screen";

import { theme } from "../theme";

import { CartHeaderButton } from "../../components/buttons/cart-header-button.component";
import { MenuHeaderButton } from "../../components/buttons/menu-header-button.component";
import { FavouriteHeaderButton } from "../../components/buttons/favourite-header-button.component";
import { CloseHeaderButton } from "../../components/buttons/close-header-button.component";
import { SaveHeaderButton } from "../../components/buttons/save-header-button.component";

const ShopNavi = createStackNavigator();

export const ShopNavigator = () => {
  const cartTotalQty = useSelector((state) => state.cart.totalQty);
  const favProducts = useSelector((state) => state.products.favouriteProducts);
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
            <MenuHeaderButton {...props} navigation={navigation} />
          ),
          headerRight: (props) => (
            <HeaderButtons>
              <FavouriteHeaderButton
                {...props}
                favProducts={favProducts}
                navigation={navigation}
              />
              <CartHeaderButton
                {...props}
                cartTotalQty={cartTotalQty}
                navigation={navigation}
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
            <CartHeaderButton
              {...props}
              cartTotalQty={cartTotalQty}
              navigation={navigation}
            />
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
        name="Favourites"
        component={FavouritesScreen}
        options={({ navigation }) => ({
          title: "Wish List",
          gestureEnabled: true,
          headerRight: (props) => (
            <CartHeaderButton
              {...props}
              cartTotalQty={cartTotalQty}
              navigation={navigation}
            />
          ),
        })}
      />
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
            <CloseHeaderButton {...props} navigation={navigation} />
          ),
          headerRight: (props) => (
            <SaveHeaderButton
              {...props}
              onPress={() => {
                route.params.save();
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </ShopNavi.Navigator>
  );
};
