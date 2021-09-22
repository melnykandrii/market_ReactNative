import React from "react";
import { Avatar } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const Icon = styled(Avatar.Icon).attrs((props) => ({
  size: props.size || 50,
  style: props.iconStyle,
  icon: props.iconName || "information-outline",
  color: props.iconColor || theme.colors.bg.black,
}))`
  background: ${(props) => props.iconBg || props.theme.colors.ui.disabled};
  align-self: center;
`;

export const InfoIcon = (props) => {
  return <Icon {...props} />;
};
