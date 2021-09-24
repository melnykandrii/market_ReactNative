import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const MenuHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        title="Menu"
        iconName="menu-outline"
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
        buttonTestId="menu"
        badgeTestId="menu-badge"
        badgeVisible={false}
      />
    </HeaderButtons>
  );
};
