import { FlatList, RefreshControl } from "react-native";
import { InfoScreen } from "../../../components/info/info-screen.component";
import { OrderItem } from "../components/order-item.component";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "../../../services/store/actions/order";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { theme } from "../../../infrastructure/theme";

export const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  useEffect(() => {
    const focus = props.navigation.addListener("focus", loadOrders);
    return () => {
      focus();
    };
  }, [loadOrders, props.navigation]);

  if (error) {
    return (
      <InfoScreen
        title="An error occured!"
        subTitle="Please try again."
        buttonTitle="Try again"
        iconName="close"
        buttonIcon="reload"
        compact="true"
        iconBg={theme.colors.ui.error}
        onPress={loadOrders}
      />
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return (
      <InfoScreen
        title="You don't have orders yet."
        subTitle="Your orders will appear here. Tap on the button to start shopping."
        buttonTitle="Shop"
        onPress={() => {
          props.navigation.navigate("Market");
        }}
      />
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.bg.black}
          colors={[theme.colors.ui.primary]}
          refreshing={isLoading}
          onRefresh={loadOrders}
        />
      }
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          orderId={item.refId}
          items={item.items}
          navigation={props.navigation}
        />
      )}
    />
  );
};
