import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const FavouriteHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        badgeVisible={false}
        title="Favourites"
        iconSize={22}
        iconName={props.favProducts.length ? "star" : "star-outline"}
        badgeTestId="filter-badge"
        buttonTestId="filter-button-badge"
        onPress={() => {
          props.navigation.navigate("Favourites");
        }}
      />
    </HeaderButtons>
  );
};
