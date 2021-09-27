import styled from "styled-components";

export const FullScreen = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const Label = styled.Text`
  margin-top: ${(props) => props.theme.sizepx[8]};
  font-size: ${(props) => props.theme.sizepx[7]};
  color: ${(props) => props.theme.colors.ui.success};
  font-family: ${(props) => props.theme.fonts.heading};
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
