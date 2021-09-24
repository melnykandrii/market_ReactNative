import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBadgedButton } from "./header-badged-button.component";

export const CloseHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderBadgedButton}>
      <Item
        {...props}
        title="Close"
        iconName="close-outline"
        badgeVisible={false}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </HeaderButtons>
  );
};
