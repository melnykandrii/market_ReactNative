import { FlatList } from "react-native";

import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import OrderItem from "../../src/features/orders/components/order-item.component";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "../../store/actions/order";
import { LoadingState } from "../../src/components/loading/loading-state.component";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <LoadingState />;
  }

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
          orderId={item.refId}
          items={item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
