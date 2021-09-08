import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import FiltersScreen from "../screens/shop/FiltersScreen";
import HeaderButton from "../components/UI/HeaderButton";
import { Platform } from "react-native";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import React from "react";
import { TransitionPresets } from "@react-navigation/stack";

import ShopScreen from "../screens/shop/ShopScreen";

const ShopNavi = createStackNavigator();

function ShopNavigation() {
  return (
    <ShopNavi.Navigator
      initialRouteName="Sale Market"
      headerMode="screen"
      screenOptions={{
        headerTitleAllowFontScaling: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.headdroid : Colors.headiOS,
        },
        headerTintColor:
          Platform.OS === "android" ? Colors.labeldroid : Colors.labelios,
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
      <ShopNavi.Screen
        name="Sale Market"
        component={ShopScreen}
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
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Filter"
                iconName={
                  Platform.OS === "android" ? "filter-sharp" : "filter-outline"
                }
                onPress={() => {
                  //navigation.toggleDrawer();
                  //console.log('Search tapped')
                  navigation.navigate("Filters");
                }}
              />
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  //navigation.toggleDrawer();
                  //console.log('Search tapped')
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
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName="md-cart"
                onPress={() => {
                  //navigation.toggleDrawer();
                  //console.log('Search tapped')
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ShopNavi.Screen name="Cart" component={CartScreen} />
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
                  //console.log('Search tapped')
                  //navigation.navigate('Categories')
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
                  //navigation.toggleDrawer();
                  //console.log('Search tapped')
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
}

export default ShopNavigation;
