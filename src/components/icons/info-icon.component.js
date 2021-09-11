import React from "react";
import { Avatar } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const Icon = styled(Avatar.Icon).attrs({
  size: 50,
})`
  background: ${(props) => props.iconBg || props.theme.colors.ui.secondary};
  align-self: center;
`;

export const InfoIcon = (props) => {
  return (
    <Icon
      {...props}
      icon={props.iconName || "information-outline"}
      color={props.iconColor || theme.colors.bg.primary}
    />
  );
};
