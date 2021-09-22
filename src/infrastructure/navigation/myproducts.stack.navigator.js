import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { EditProductScreen } from "../../features/market/screens/edit-product.screen";
import HeaderButton from "../../../components/UI/HeaderButton";
import React from "react";
import { UserProductsScreen } from "../../features/market/screens/my-products.screen";
import { theme } from "../theme";
import { ImageScreen } from "../../features/market/screens/image.screen";

import { TransitionPresets } from "@react-navigation/stack";

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
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName="add"
                onPress={() => {
                  navigation.navigate("Edit Product");
                }}
              />
            </HeaderButtons>
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
