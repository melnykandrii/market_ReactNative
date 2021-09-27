import React from "react";
import { CloseButton } from "../../../components/buttons/close-fullscreen-button.component";
import { FullScreen, Image } from "../styles/full-screen.styles";

export const ImageScreen = (props) => {
  const imageUrl = props.route.params?.imageUrl ?? null;
  return (
    <FullScreen>
      <CloseButton navigation={props.navigation} />
      <Image source={{ uri: imageUrl }} />
    </FullScreen>
  );
};
