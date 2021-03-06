import "react-native-gesture-handler";

import * as Font from "expo-font";

import { ThemeProvider } from "styled-components/native";
import React, { useState } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { theme } from "./src/infrastructure/theme";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import authReducer from "./src/services/store/reducers/auth";
import cartReducer from "./src/services/store/reducers/cart";
import ordersReducer from "./src/services/store/reducers/order";
import productsReducer from "./src/services/store/reducers/products";
import { AppNavigator } from "./src/infrastructure/navigation";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    righteous: require("./assets/fonts/Righteous-Regular.ttf"),
    abril: require("./assets/fonts/Righteous-Regular.ttf"),
    stint: require("./assets/fonts/StintUltraCondensed-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
