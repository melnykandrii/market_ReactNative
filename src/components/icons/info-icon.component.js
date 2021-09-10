import React from "react";
import { Avatar } from "react-native-paper";
import styled from "styled-components";

const Icon = styled(Avatar.Icon).attrs({
  size: 50,
})`
  background: ${(props) => props.iconBg || props.theme.colors.ui.secondary};
  align-self: center;
`;

export const InfoIcon = (props) => {
  return <Icon icon="information-outline" color="white" />;
};
