import styled from "styled-components";

export const Image = styled.Image`
  width: 100%;
  height: ${(props) => props.theme.sizepx[16]};
`;

export const TopContainer = styled.View`
  flex-direction: row;
  margin-left: ${(props) => props.theme.sizepx[4]};
  padding-bottom: ${(props) => props.theme.sizepx[2]};
`;

export const PriceContainer = styled.View`
  flex: 2;
  justify-content: flex-start;
  align-items: baseline;
`;

export const ButtonContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;

export const HeaderLabel = styled.Text`
  font-family: abril;
  font-size: ${(props) => props.theme.sizepx[4]};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.sizepx[2]};
  margin-left: -${(props) => props.theme.sizepx[0]};
`;

export const Price = styled.Text`
  font-family: abril;
  font-size: 18px;
  color: ${(props) => props.theme.colors.ui.primary};
  margin-bottom: ${(props) => props.theme.sizepx[2]};
`;

export const DescriptionLabel = styled.Text`
  font-family: abril;
  font-size: ${(props) => props.theme.sizepx[4]};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.sizepx[2]};
  margin-left: -${(props) => props.theme.sizepx[0]};
`;

export const Description = styled.Text`
  font-family: open-sans;
  font-size: 14px;
  text-align: justify;
  margin-right: 25px;
`;

export const BottomContainer = styled.View`
  margin-left: ${(props) => props.theme.sizepx[4]};
  padding-bottom: ${(props) => props.theme.sizepx[2]};
`;
