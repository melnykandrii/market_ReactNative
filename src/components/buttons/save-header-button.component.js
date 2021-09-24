import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const SaveHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        title="Save"
        iconName="checkmark-outline"
        badgeVisible={false}
        onPress={props.onPress}
      />
    </HeaderButtons>
  );
};
