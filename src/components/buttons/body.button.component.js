import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const StyledBButton = styled(Button)`
  margin-horizontal: 30%;
`;

export const BodyButton = (props) => {
  return (
    <StyledBButton
      {...props}
      onPress={props.onNavi}
      color={props.buttonColor || theme.colors.brand.spring}
      mode={props.mode}
      loading={props.loading}
      icon={props.buttonIcon}
    >
      {props.title}
    </StyledBButton>
  );
};
