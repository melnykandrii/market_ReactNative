import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import {
  CardContainer,
  QuantityContainer,
  QuantityLabel,
  ItemsConstainer,
  ItemImage,
  ItemTitle,
  PriceContainer,
  Price,
  RemoveContainer,
  Remove,
} from "../../orders/styles/cart-item-component.styles";

export const CartItem = (props) => {
  return (
    <CardContainer>
      <ItemsConstainer onPress={props.onViewDetails}>
        <ItemImage source={{ uri: props.imageUrl }} />
        <Spacer position="left" size="xxl" />
        <ItemTitle ellipsizeMode="head" numberOfLines={2}>
          {props.title}
        </ItemTitle>
      </ItemsConstainer>
      <QuantityContainer>
        <QuantityLabel>{props.quantity} </QuantityLabel>
      </QuantityContainer>
      <PriceContainer>
        <Price>${props.amount.toFixed(2)}</Price>
      </PriceContainer>
      {props.deletable && (
        <RemoveContainer>
          <Remove onPress={props.onRemove}>
            <Ionicons name="trash-outline" size={20} color="silver" />
          </Remove>
        </RemoveContainer>
      )}
    </CardContainer>
  );
};
