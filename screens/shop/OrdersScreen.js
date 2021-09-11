import { FlatList, Text } from "react-native";

import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import OrderItem from "../../components/shop/OrderItem";
import React from "react";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <DefaultEmptyScreen
        title="You don't have orders yet."
        subTitle="Your orders will appear here. Tap on the button to start shopping."
        buttonTitle="Shop"
        onNavi={() => {
          console.log("Order screen navigation");
          props.navigation.navigate("All Products");
        }}
      />
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
