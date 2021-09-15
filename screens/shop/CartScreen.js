import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/order";

import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/UI/Card";
import { CartItem } from "../../src/features/orders/components/cart-item.component";
import Colors from "../../constants/Colors";
import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import React from "react";
import { Spacer } from "../../src/components/typography/spacer/spacer.component";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";

const CartScreen = (props) => {
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

  if (cartItems.length === 0) {
    return (
      <DefaultEmptyScreen
        title="The cart is empty."
        subTitle="After adding a product it will appear here. Tap on the button to start shopping."
        buttonTitle="Shop"
        onNavi={() => {
          props.navigation.navigate("Sale Market");
        }}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Added Products</Text>
      <Spacer position="bottom" size="xl" />
      <View style={styles.tablehead}>
        <Text style={styles.headerQty}>QTY</Text>
        <Text style={styles.headerName}>Products</Text>
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
              });
            }}
          />
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: </Text>
        <Text style={styles.amount}>
          ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
        </Text>
      </View>
      <View style={styles.buttonCont}>
        <BodyButton
          title="Order Now"
          buttonColor={theme.colors.text.primary}
          mode="outlined"
          disabled={cartItems.length === 0}
          onNavi={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
            props.navigation.navigate("Sale Market");
            props.navigation.navigate("My Orders");
          }}
          buttonIcon="contactless-payment"
          style={styles.button}
          compact="true"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  headerTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  tablehead: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  headerQty: {
    fontFamily: "open-sans",
    fontSize: 13,
    marginLeft: -10,
  },
  headerName: {
    fontFamily: "open-sans",
    fontSize: 13,
  },
  headerPrice: {
    marginRight: "15%",
    fontFamily: "open-sans",
    fontSize: 13,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Platform.OS === "android" ? Colors.headdroid : Colors.labelios,
  },
  buttonCont: {
    marginVertical: 10,
    alignItems: Platform.OS === "android" ? "stretch" : "center",
  },
});
export default CartScreen;
