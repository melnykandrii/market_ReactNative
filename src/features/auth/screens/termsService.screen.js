import React from "react";
import { ScrollView } from "react-native";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { Text } from "../../../components/typography/text/text.component";
import styled from "styled-components";

const AboutView = styled.View`
  flex: 1;
  align-self: center;
  padding: 10px;
`;

const TextHeader = styled(Text)`
  text-align: center;
`;

export const TermsScreen = () => {
  return (
    <AboutView>
      <ScrollView>
        <TextHeader variant="header">Terms of Use.</TextHeader>
        <Spacer size="large">
          <Text variant="body">
            "Simple Market" it's a non-profit application developed as a Demo
            version of shoping application.{"\n"}
            As a demo application all data is only for demonstation purpose and
            could not be treated as a real or valid. {"\n"} As a user you can:
            {"\n"} - create an account, {"\n"} - sign in with an account, {"\n"}
            - reset password, {"\n"}- have an access to all available products,
            {"\n"} - create own product, {"\n"} - delete own products, {"\n"} -
            order any product, {"\n"} - check previous orders.
            {"\n"} - log out from the application. {"\n"} Add photo or image to
            your products;
            {"\n"} If the provided data would suspended as a harmful it will be
            removed from the application and the user will be disabled. {"\n"} -
            As "Simple Market" is a Demo application the owner may remove any
            information from it or even close the service without notice. {"\n"}{" "}
            If you have any questions, feedback or consernce please email to:
            andriimelnyk.native@gmail.com
          </Text>
        </Spacer>
      </ScrollView>
    </AboutView>
  );
};
