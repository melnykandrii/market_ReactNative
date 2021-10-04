import styled from "styled-components";
import { Text } from "../../../components/typography/text/text.component";
import { CloseButton } from "../../../components/buttons/close.button.component";
import { StatusBar } from "react-native";

export const AboutView = styled.View`
  flex: 1;
  align-self: center;
`;

export const TextHeader = styled(Text)`
  text-align: center;
`;
export const DateHeader = styled(Text)`
  text-align: center;
  margin-top: 15px;
`;

export const TitleHeader = styled(Text)`
  padding-horizontal: 10px;
`;

export const TextContext = styled(Text)`
  padding-horizontal: 10px;
  text-align: justify;
  padding-vertical: 0px;
`;

export const CloseBtn = styled(CloseButton)`
  align-self: flex-end;
`;

export const SafeCont = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;
