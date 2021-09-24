import React from "react";
import { View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";

const ButtonContainer = styled.View`
  margin-right: -${(props) => props.theme.sizepx[0]};
`;

const BadgeContainer = styled.View`
  margin-bottom: -${(props) => props.theme.sizepx[2]};
  margin-right: ${(props) => props.theme.sizepx[1]};
  z-index: 9;
`;

const StyledBadge = styled(Badge).attrs((props) => ({
  size: props.badgeSize || theme.spacessh[8],
  visible: props.badgeVisible,
  style: props.badgeStyle,
  testID: props.badgeTestID,
}))`
  color: ${(props) => props.badgeC || props.theme.colors.ui.primary};
  background-color: ${(props) =>
    props.badgeBG || props.theme.colors.bg.primary};
  border-width: ${(props) => props.badgeBW || props.theme.space[1]};
  border-color: ${(props) => props.badgeBC || props.theme.colors.ui.secondary};
`;
export const HeaderBadgedButton = (props) => {
  return (
    <ButtonContainer>
      <BadgeContainer>
        <StyledBadge {...props}>{props.badgeValue}</StyledBadge>
      </BadgeContainer>
      <View>
        <HeaderButton
          {...props}
          IconComponent={Ionicons}
          iconSize={props.iconSize || theme.spacessh[16]}
          color={props.color || theme.colors.bg.primary}
          testID={props.buttonTestId}
          disabled={props.buttonDisabled}
        />
      </View>
    </ButtonContainer>
  );
};
