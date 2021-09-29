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

export const PolicyScreen = () => {
  return (
    <AboutView>
      <ScrollView>
        <TextHeader variant="header">
          Information about our application.
        </TextHeader>
        <Spacer size="large">
          <Text variant="body">
            "Farms Near By" it's a non-profit application developed for showing
            different types of farms in the area selected by user.
            {"\n"}
            Currently the following features are available:{"\n"} - Searching
            for for farms near farms near selected city;{"\n"} - Verifing
            information on selected farm (address, rate, availability);{"\n"} -
            Adding the selected farm to the favorite list;{"\n"} - Verifing
            farm's avalable products and prices (beta);{"\n"} - Order selected
            products though the app (beta) (payments handels through api
            provider);{"\n"} Upcoming features:{"\n"} - Adding farms wish list;
            {"\n"} - Adding farms filters;{"\n"} - Adding list of orders;
            {"\n"} If you have any questions or feedback please email to:
            andriimelnyk.native@gmail.com
          </Text>
        </Spacer>
      </ScrollView>
    </AboutView>
  );
};
