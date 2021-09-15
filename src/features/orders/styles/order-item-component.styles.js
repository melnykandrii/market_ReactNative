import styled from "styled-components";
import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "../../../components/cards/card.component";

export const OrderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.sizepx[0]};
`;

export const OrderLabel = styled.Text`
  font-size: ${(props) => props.theme.sizepx[3]};
  font-family: abril;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const DateLabel = styled.Text`
  font-family: stint;
  font-size: ${(props) => props.theme.sizepx[3]};
  color: ${(props) => props.theme.colors.text.disabled};
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 14px;
`;

export const TotalLabel = styled.Text`
  font-size: ${(props) => props.theme.sizepx[3]};
  font-family: abril;
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const DetailsContainer = styled.View`
  width: 100%;
`;

export const OrderCard = (props) => {
  return <Card style={styles.orderItem}>{props.children}</Card>;
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
});
