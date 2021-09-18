import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import EditProductScreen from "../screens/user/EditProductScreen";
import HeaderButton from "../components/UI/HeaderButton";
import React from "react";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { theme } from "../src/infrastructure/theme";
import { ImageScreen } from "../src/features/market/screens/image.screen";

import { TransitionPresets } from "@react-navigation/stack";

const ProdNavi = createStackNavigator();

function MyProdNavigation() {
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
          fontFamily: "righteous",
          fontSize: 22,
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
        options={({ route, navigation }) => ({
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
}

export default MyProdNavigation;
