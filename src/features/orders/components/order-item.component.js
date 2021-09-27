import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { CartItem } from "../../market/components/cart-item.component";
import { BodyButton } from "../../../components/buttons/button.component";
import {
  OrderContainer,
  OrderLabel,
  DateLabel,
  DateContainer,
  TotalLabel,
  DetailsContainer,
  OrderCard,
} from "../styles/order-item-component.styles";

export const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <OrderCard>
      <OrderContainer>
        <OrderLabel>Order #{props.orderId}</OrderLabel>
        <TotalLabel>${props.amount.toFixed(2)}</TotalLabel>
      </OrderContainer>
      <DateContainer>
        <DateLabel>{props.date}</DateLabel>
      </DateContainer>
      <BodyButton
        buttonTitle={showDetails ? "Hide Details" : "Show Details"}
        mode="text"
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
        labelStyle={styles.labelStyle}
        compact={true}
      />

      {showDetails && (
        <DetailsContainer>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              imageUrl={cartItem.imageUrl}
              title={cartItem.title}
              onViewDetails={() =>
                props.navigation.navigate("Product Details", {
                  productId: cartItem.id,
                  productTitle: cartItem.title,
                  item: cartItem,
                })
              }
            />
          ))}
        </DetailsContainer>
      )}
    </OrderCard>
  );
};
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 10,
  },
});
