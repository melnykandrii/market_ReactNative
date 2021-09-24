import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const CartHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        badgeVisible={props.cartTotalQty}
        badgeValue={props.cartTotalQty}
        badgeTestId="cart-badge"
        buttonTestId="cart-button-badge"
        iconSize={24}
        title="Cart"
        iconName={props.cartTotalQty ? "cart" : "cart-outline"}
        testID="cartBadge"
        onPress={() => {
          props.navigation.navigate("Cart");
        }}
      />
    </HeaderButtons>
  );
};
