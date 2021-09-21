import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/order";

import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

//import Card from "../../components/UI/Card";
import { Card } from "../../src/components/cards/card.component";

import { CartItem } from "../../src/features/orders/components/cart-item.component";
import Colors from "../../constants/Colors";
import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import { InfoScreen } from "../../src/components/info/info-screen.component";
import React, { useState } from "react";
import { Spacer } from "../../src/components/typography/spacer/spacer.component";
import { BodyButton } from "../../src/components/buttons/button.component";
import { theme } from "../../src/infrastructure/theme";
import { LoadingState } from "../../src/components/loading/loading-state.component";
import ThemedListItem from "react-native-elements/dist/list/ListItem";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        title: state.cart.items[key].productTitle,
        imageUrl: state.cart.items[key].productImageUrl,
        price: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const OrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (cartItems.length === 0) {
    return (
      <InfoScreen
        title="The cart is empty."
        subTitle="After adding a product it will appear here. Tap on the button to start shopping."
        buttonTitle="Shop"
        onPress={() => {
          props.navigation.navigate("Simple Market");
        }}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Added Products</Text>
      <Spacer position="bottom" size="xl" />
      <Card style={styles.card}>
        <View style={styles.container}>
          <View style={styles.tablehead}>
            <Text style={styles.headerName}>Products</Text>
            <Text style={styles.headerQty}>QTY</Text>
            <Text style={styles.headerPrice}>Price</Text>
          </View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem
                quantity={item.quantity}
                title={item.title}
                amount={item.sum}
                imageUrl={item.imageUrl}
                deletable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(item.id));
                }}
                onViewDetails={() => {
                  props.navigation.navigate("Product Details", {
                    productId: item.id,
                    productTitle: item.title,
                    item: item,
                  });
                }}
              />
            )}
          />
        </View>
      </Card>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: </Text>
        <Spacer position="left" size="xxl" />
        <Text style={styles.amount}>
          ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
        </Text>
      </View>
      <View style={styles.buttonCont}>
        <BodyButton
          buttonTitle="Order Now"
          buttonColor={theme.colors.bg.black}
          mode="outlined"
          disabled={cartItems.length === 0}
          onPress={OrderHandler}
          style={styles.button}
          compact="true"
          buttonContant={styles.btContant}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    margin: 0,
    padding: 10,
    maxHeight: "100%",
  },
  card: {
    maxHeight: "75%",
  },
  tablehead: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    backgroundColor: theme.colors.ui.primary,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  headerQty: {
    fontFamily: theme.fonts.title,
    fontSize: 10,
    marginLeft: "30%",
    color: theme.colors.bg.primary,
  },
  headerName: {
    fontFamily: theme.fonts.title,
    fontSize: 10,
    marginLeft: "20%",
    color: theme.colors.bg.primary,
  },
  headerPrice: {
    marginRight: "10%",
    fontFamily: theme.fonts.title,
    fontSize: 10,
    color: theme.colors.bg.primary,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: theme.fonts.title,
    fontSize: 18,
  },
  amount: {
    color: theme.colors.bg.black,
    fontFamily: theme.fonts.title,
    fontSize: 17,
  },
  buttonCont: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  button: {
    alignSelf: "center",
    width: 120,
    height: 40,
    paddingBottom: 10,
  },
  btContant: {
    width: 120,
    height: 40,
  },
});
export default CartScreen;
