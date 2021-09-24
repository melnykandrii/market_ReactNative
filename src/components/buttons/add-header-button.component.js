import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const AddHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        title="Add"
        iconName="add"
        badgeVisible={false}
        onPress={props.onPress}
      />
    </HeaderButtons>
  );
};
