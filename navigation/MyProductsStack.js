import { Button, Platform } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import EditProductScreen from "../screens/user/EditProductScreen";
import HeaderButton from "../components/UI/HeaderButton";
import React from "react";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { theme } from "../src/infrastructure/theme";
import { ImageScreen } from "../src/features/market/screens/image.screen";

const ProdNavi = createStackNavigator();

function MyProdNavigation() {
  return (
    <ProdNavi.Navigator
      initialRouteName="My Products"
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
          fontFamily: "open-sans-bold",
          fontSize: 22,
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <ProdNavi.Screen
        name="My Products"
        component={UserProductsScreen}
        options={({ route, navigation }) => ({
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
          //title: route.params?.productTitle ?? 'Add New Product',
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
        })}
      />
    </ProdNavi.Navigator>
  );
}

export default MyProdNavigation;
