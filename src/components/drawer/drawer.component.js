import React from "react";
import { SafeAreaView, Dimensions } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { CloseButton } from "../buttons/close.button.component";
import { LogOutButton } from "../buttons/logout.button.component";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components";
import { Text } from "../typography/text/text.component";

const deviceWidth = Dimensions.get("window").width / 2.5;
const deviceHeight = Dimensions.get("window").height / 1.13;

const Container = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.sizepx[5]};
`;
const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${(props) => props.theme.sizepx[3]};
`;
const StyledText = styled(Text)`
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
`;
export const DrawerComponent = (props) => {
  const LogOut = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    props.onLogOut();
  };
  return (
    <Container>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <TopContainer>
          <CloseButton
            {...props}
            name="close"
            onClose={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }
            buttonColor={theme.colors.bg.primary}
          />
          <LogOutButton
            buttonLabel="LogOut"
            mode="text"
            onLogOut={LogOut}
            logOutColor={theme.colors.bg.primary}
          />
        </TopContainer>

        <DrawerItemList {...props} />
        <StyledText variant="version">ver.1.0.0</StyledText>
      </SafeAreaView>
    </Container>
  );
};
