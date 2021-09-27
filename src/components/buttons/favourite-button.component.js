import React from "react";
import { IconButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const FavButton = styled(IconButton)`
  position: absolute;
  z-index: 9;
  top: 10px;
  right: 10px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const FavouriteButton = (props) => {
  return (
    <FavButton
      {...props}
      icon={props.name}
      color={props.buttonColor || theme.colors.bg.primary}
      onPress={props.onFavourite}
    />
  );
};
