import { FlatList } from "react-native";

import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import OrderItem from "../../components/shop/OrderItem";
import React from "react";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders.items);

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
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
