import styled from "styled-components";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg_places.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;
