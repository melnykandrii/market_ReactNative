import React from "react";
import { Dimensions } from "react-native";
import { Text } from "../typography/text/text.component";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const deviceWidth = Dimensions.get("window").width / 2 - 20;
const deviceHeight = Dimensions.get("window").height / 3;

const IndicatorContainer = styled.View`
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
`;
const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: "large",
  color: theme.colors.ui.primary,
})``;

export const LoadingState = (props) => {
  return (
    <IndicatorContainer>
      <LoadingIndicator />
      <Text variant="load">{props.label}</Text>
    </IndicatorContainer>
  );
};
