import React, { useState, useEffect } from "react";
import { ScrollView, Platform } from "react-native";
import { CenteredButton } from "../../../components/buttons/body-button-centered.component";
import {
  AboutView,
  TextHeader,
  TitleHeader,
  TextContext,
  CloseBtn,
  DateHeader,
  SafeCont,
  SafeIos,
} from "../styles/terms-privacy.styles";

const Content = (props) => {
  const [agree, setAgree] = useState(false);

  return (
    <AboutView>
      <ScrollView onMomentumScrollEnd={() => setAgree(true)}>
        {props.auth ? (
          <>
            <CloseBtn
              buttonColor="black"
              onClose={() =>
                props.navigation.navigate("Auth", { setAgree: false })
              }
            />
            <TextHeader variant="aboutHeader">Terms and Conditions</TextHeader>
          </>
        ) : null}
        <DateHeader variant="date">
          Last updated: September 30, 2021.
        </DateHeader>
        <TextContext variant="bodyTitle">
          {"\n"}
          Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using the Simple Market App mobile
          application named Application, developed and operated by Andrii Melnyk
          ("us", "we", or "our"). Your access to and use of the Application is
          conditioned on your acceptance of and compliance with these Terms.
          These Terms apply to all visitors, users and others who access or use
          the Application. By accessing or using the Application You agree to be
          bound by these Terms. If you disagree with any part of the terms then
          you may not access the Application. {"\n"} "Simple Market" it's a
          non-profit application developed as a Demo version of shopping
          application.{" "}
        </TextContext>
        <TitleHeader variant="inputLabel"> Content </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} As a demo application all data is only for demonstation purpose
          and could not be treated as a real or valid. {"\n"} As a user you can:
          {"\n"} - create an account, {"\n"} - sign in with an account, {"\n"} -
          reset password, {"\n"} - have an access to all available products,
          {"\n"} - create own products, {"\n"} - delete own products, {"\n"} -
          order any product, {"\n"} - check previous orders.
          {"\n"} - log out from the application. {"\n"} - Add photo or image to
          your products.{"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel"> Conditions </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} If the provided data would suspended as a harmful it will be
          removed from the application and the user will be disabled. {"\n"} -
          As "Simple Market" is a Demo application the owner may remove any
          information from it or even close the service without notice. {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel"> Purchases </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} As "Simple Market" is a demonstration Application there is no
          purchase available. {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel"> Subscription(s) </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} There are no subscription fees for usage of the Application.{" "}
          {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel"> Changes to this Terms</TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} We reserve the right, at our sole discretion, to modify or
          replace these Terms at any time. If a revision is material we will try
          to provide at least 30 (change this) days' notice prior to any new
          terms taking effect. What constitutes a material change will be
          determined at our sole discretion. {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel"> Contact Us </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} If you have any questions, feedback or consernce about these
          Terms or the Application, please contact us: {"\n"}
          andriimelnyk.native@gmail.com
        </TextContext>
      </ScrollView>
      {props.auth ? (
        <CenteredButton
          buttonTitle="I Agree"
          onPress={() =>
            props.navigation.navigate("Auth", { setAgree: "true" })
          }
          disabled={!agree}
        />
      ) : null}
    </AboutView>
  );
};

export const TermsScreen = (props) => {
  const [auth, setAuth] = useState(false);
  const authen = props.route.params ? props.route.params : false;

  let SafeCmp = SafeIos;
  if (Platform.OS === "android") {
    SafeCmp = SafeCont;
  }
  useEffect(() => {
    if (authen) {
      setAuth(authen.auth);
    }
  }, [authen, authen.auth]);
  return auth ? (
    <SafeCmp>
      <Content {...props} auth={auth} setAuth={setAuth} />
    </SafeCmp>
  ) : (
    <Content {...props} auth={auth} setAuth={setAuth} />
  );
};
