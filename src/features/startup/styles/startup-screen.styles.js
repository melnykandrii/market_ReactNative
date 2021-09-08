import styled from "styled-components";

export const Background = styled.ImageBackground.attrs({
  source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 70px;
`;
