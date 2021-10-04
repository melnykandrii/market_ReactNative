import { Button } from "react-native-elements";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

export const TextButton = styled(Button).attrs((props) => ({
  onPress: props.onPress,
  title: props.buttonTitle,
  type: "clear",
  titleStyle: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    color: theme.colors.ui.primary,
    textDecorationLine: "underline",
  },
}))``;
