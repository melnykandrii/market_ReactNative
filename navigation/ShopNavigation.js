import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Button } from 'react-native-paper';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import React from 'react';
import ShopScreen from '../screens/shop/ShopScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ShopNavi = createStackNavigator();

function ShopNavigation() {
  return (
      <ShopNavi.Navigator
        initialRouteName='Shop'
        headerMode='screen'
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.headdroid : Colors.headiOS
          },
          headerTintColor: Platform.OS === 'android' ? Colors.labeldroid : Colors.labelios,
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 22
          },
          headerBackTitleStyle: {
            fontFamily: 'open-sans',
          }
        }}
      >
        <ShopNavi.Screen 
            name="Quick Shop" 
            component={ShopScreen}
        />
        <ShopNavi.Screen 
            name="Product Details" 
            component={ProductDetailsScreen}
            options={({route}) => ({ title: route.params.productTitle, gestureEnabled: true})}
        />
        <ShopNavi.Screen 
            name="Cart" 
            component={CartScreen} 
        />
      </ShopNavi.Navigator>
  );
};

export default ShopNavigation;