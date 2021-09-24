import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { EditProductScreen } from "../../features/market/screens/edit-product.screen";
import { UserProductsScreen } from "../../features/market/screens/my-products.screen";
import { ImageScreen } from "../../features/market/screens/image.screen";

import { MenuHeaderButton } from "../../components/buttons/menu-header-button.component";
import { AddHeaderButton } from "../../components/buttons/add-header-button.component";

import { theme } from "../theme";

const ProdNavi = createStackNavigator();

export const MyProdNavigation = () => {
  return (
    <ProdNavi.Navigator
      initialRouteName="Sale"
      headerMode="screen"
      screenOptions={{
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
      <ProdNavi.Screen
        name="Sale"
        component={UserProductsScreen}
        options={({ route, navigation }) => ({
          headerLeft: (props) => (
            <MenuHeaderButton {...props} navigation={navigation} />
          ),
          headerRight: (props) => (
            <AddHeaderButton
              onPress={() => {
                navigation.navigate("Edit Product");
              }}
            />
          ),
        })}
      />
      <ProdNavi.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productId ? "Edit Product" : "Add New Product",
          gestureEnabled: true,
        })}
      />
      <ProdNavi.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={() => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.FadeFromBottomAndroid,
        })}
      />
    </ProdNavi.Navigator>
  );
};
