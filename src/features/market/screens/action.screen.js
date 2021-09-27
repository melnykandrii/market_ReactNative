import React from "react";
import { theme } from "../../../infrastructure/theme";
import { CloseButton } from "../../../components/buttons/close-fullscreen-button.component";
import { InfoIcon } from "../../../components/icons/info-icon.component";
import { FullScreen, Label } from "../styles/full-screen.styles";

export const ActionScreen = (props) => {
  return (
    <FullScreen>
      <CloseButton navigation={props.navigation} />
      <InfoIcon
        {...props}
        size={100}
        iconName="check-bold"
        iconColor={theme.colors.bg.white}
        iconBg={theme.colors.ui.success}
      />
      <Label>Success!</Label>
    </FullScreen>
  );
};
