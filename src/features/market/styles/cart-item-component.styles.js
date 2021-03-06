import styled from "styled-components";

export const CardContainer = styled.View`
  padding: ${(props) => props.theme.sizepx[1]};
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${(props) => props.theme.space[1]}
  border-bottom-color: ${(props) => props.theme.colors.ui.disabled};
  
`;

export const QuantityContainer = styled.View`
  flex: 0.5;
  align-items: flex-end;
  margin-left: -${(props) => props.theme.sizepx[0]};
`;

export const QuantityLabel = styled.Text`
  font-family: abril;
  font-size: 12px;
  color: ${(props) => props.theme.colors.bg.black};
`;

export const ItemsConstainer = styled.TouchableOpacity`
  flex: 8;
  flex-direction: row;
  align-items: center;
`;

export const ItemImage = styled.Image.attrs({
  defaultSource: require("../../../../assets/default_product1.jpg"),
})`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.grey};
`;

export const ItemTitle = styled.Text`
  font-family: righteous;
  font-size: 14px;
  flex: 1;
  flex-wrap: wrap-reverse;
`;

export const PriceContainer = styled.View`
  flex: 2.5;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Price = styled.Text`
  font-family: abril;
  font-size: 13px;
`;

export const RemoveContainer = styled.View`
  flex: 1;
`;

export const Remove = styled.TouchableOpacity`
  margin-left: 10px;
`;
