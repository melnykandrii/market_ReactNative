import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MyProductsScreen from '../screens/user/MyProductsScreen';
import { NavigationContainer } from '@react-navigation/native';
import OrdersScreen from '../screens/shop/OrdersScreen';
import React from 'react';
import ShopNavigation from '../navigation/ShopNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MainDrawer = createDrawerNavigator();

function MainDrawerNavi() {
  return (
    <NavigationContainer>
      <MainDrawer.Navigator initialRouteName="Shop">
        <MainDrawer.Screen 
            name="Home" 
            component={ShopNavigation}
        />
        <MainDrawer.Screen 
            name="My Products" 
            component={MyProductsScreen} 
        />
        <MainDrawer.Screen 
            name="My Orders" 
            component={OrdersScreen} 
        />
      </MainDrawer.Navigator>
    </NavigationContainer>
  );
}

export default MainDrawerNavi;