import React, { useState } from "react";
import { CartItem } from "./cart-item.component";
import { BodyButton } from "../../../components/buttons/body.button.component";
import {
  OrderContainer,
  OrderLabel,
  DateLabel,
  TotalContainer,
  TotalLabel,
  DetailsContainer,
  OrderCard,
} from "../styles/order-item-component.styles";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <OrderCard>
      <OrderContainer>
        <OrderLabel>Order #{props.orderId}</OrderLabel>
        <DateLabel>{props.date}</DateLabel>
      </OrderContainer>
      <TotalContainer>
        <TotalLabel>${props.amount.toFixed(2)}</TotalLabel>
      </TotalContainer>
      <BodyButton
        title={showDetails ? "Hide Details" : "Show Details"}
        mode="text"
        onNavi={() => {
          setShowDetails((prevState) => !prevState);
        }}
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
            />
          ))}
        </DetailsContainer>
      )}
    </OrderCard>
  );
};

export default OrderItem;
