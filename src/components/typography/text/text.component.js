import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.bg.black};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const header = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.medium};
`;

const bodyTitle = (theme) => `
    font-size: ${theme.fontSizes.bodyTitle};
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const authHeader = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.ui.primary};
    margin-top: 15px;
`;

const authLabel = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.bg.grey};
    margin-top: 10px;
`;

const inputLabel = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.bg.black};
    margin-top: 10px;
`;

const aboutHeader = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.h5};
    color: ${theme.colors.bg.black};
`;

const version = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.bg.primary};
`;

const date = (theme) => `
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.bg.black};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const load = (theme) => `
    color: ${theme.colors.bg.black};
    font-family: ${theme.fonts.title};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;
const agreeLabel = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.button};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.ui.primary};
`;

const button = (theme) => `
    font-family: ${theme.fonts.body};
    color: ${theme.colors.brand.spring};
    font-size: ${theme.fontSizes.title};
`;

const variants = {
  header,
  body,
  bodyTitle,
  label,
  caption,
  error,
  load,
  hint,
  button,
  authLabel,
  authHeader,
  inputLabel,
  aboutHeader,
  agreeLabel,
  version,
  date,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
