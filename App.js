import 'react-native-gesture-handler';

import * as Font from 'expo-font';

import { combineReducers, createStore } from 'redux';

import MainDrawerNavi from './navigation/MainDrawerNavi';
import { Provider } from 'react-redux';
import React from 'react';
import cartReducer from './store/reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const App = () => {
  fetchFonts();

  return (
    <Provider store={store}>
      <MainDrawerNavi />
    </Provider>
  );
}

export default App;
