import React, { useState, useEffect } from "react";
import { ScrollView, Platform } from "react-native";
import { CenteredButton } from "../../../components/buttons/body-button-centered.component";
import { Spacer } from "../../../components/typography/spacer/spacer.component";

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
            <TextHeader variant="aboutHeader">Privacy Policy</TextHeader>
          </>
        ) : null}
        <DateHeader variant="date">
          Last updated: September 30, 2021.
        </DateHeader>
        <TextContext variant="bodyTitle">
          {"\n"} This{" "}
          <TitleHeader variant="inputLabel">Privacy Policy </TitleHeader>{" "}
          describes Our policies and procedures on the collection, use and
          disclosure of Your information when You use the Application and tells
          You about Your privacy rights and how the law protects You. {"\n"}
        </TextContext>

        <TextContext variant="bodyTitle">
          {"\n"}{" "}
          <TitleHeader variant="inputLabel">"Simple-Market" </TitleHeader> is a
          non-profit demo application with the main purpose to demonstrate its
          functions, it is free and available to everyone older than 13 years
          old and assumes the use of third-party tools and technologies in
          processing, such as authentication and storage information. All
          provided Personal data could be used for analyzing and improving the
          work of the Service. {"\n"} By using the "Simple-Market" application,
          You agree to the collection and use of information in accordance with
          this Privacy Policy.{"\n"}
          <TitleHeader variant="inputLabel">Interpretation </TitleHeader> {"\n"}
          The words in which the initial letter is capitalized have meanings
          defined under the following conditions. {"\n"} The following
          definitions shall have the same meaning regardless of whether they
          appear in singular or in the plural. {"\n"}
          <TitleHeader variant="inputLabel">Definitions</TitleHeader> {"\n"}
          For the purposes of this Privacy Policy: {"\n"} {"  "}
          <TitleHeader variant="inputLabel">Account </TitleHeader>- means a
          unique account created for You to access our Service or parts of our
          Service. {"\n"}{" "}
          <TitleHeader variant="inputLabel">Application </TitleHeader> - means
          the software program provided by Owner downloaded by You on any
          electronic device,{"\n"}{" "}
          <TitleHeader variant="inputLabel">Owner </TitleHeader> - (referred to
          as either, the Owner, "We", "Us" or "Our" in this Agreement) refers to
          Andrii Melnyk. {"\n"}{" "}
          <TitleHeader variant="inputLabel">Country </TitleHeader> - refers to
          Canada. {"\n"} <TitleHeader variant="inputLabel">Device</TitleHeader>{" "}
          - means any device that can access the Service such as a computer, a
          cellphone or a digital tablet. {"\n"}{" "}
          <TitleHeader variant="inputLabel">Personal Data </TitleHeader>- is any
          information that relates to an identified or identifiable individual.{" "}
          {"\n"} <TitleHeader variant="inputLabel"> Service </TitleHeader> -
          refers to the Application. {"\n"}
          <TitleHeader variant="inputLabel"> Service Provider</TitleHeader> -
          means any natural or legal person who processes the data on behalf of
          the Company. It refers to third-party companies or individuals
          employed by the Company to facilitate the Service, to provide the
          Service on behalf of the Company, to perform services related to the
          Service or to assist the Company in analyzing how the Service is used.{" "}
          {"\n"} <TitleHeader variant="inputLabel">Usage Data</TitleHeader> -
          refers to data collected automatically, either generated by the use of
          the Service or from the Service infrastructure itself (for example,
          the duration of a page visit).
          {"\n"}
          <TitleHeader variant="inputLabel"> You</TitleHeader> - means the
          individual accessing or using the Service, or the company, or other
          legal entity on behalf of which such individual is accessing or using
          the Service, as applicable.{"\n"}
          <TitleHeader variant="inputLabel">
            {"\n"}Collecting and Using Your Personal Data{"\n"}
          </TitleHeader>
          <TitleHeader variant="inputLabel">
            {"\n"}Types of Data Collected {"\n"}
          </TitleHeader>
          <TitleHeader variant="inputLabel">
            {"\n"}Personal Data {"\n"}
          </TitleHeader>
          {"\n"} While using Our Service, We may ask You to provide Us with
          certain personally identifiable information that can be used to
          contact or identify You. {"\n"} Personally identifiable information
          may include, but is not limited to: {"\n"} * Email address {"\n"}{" "}
          *Usage Data {"\n"}
          <TitleHeader variant="inputLabel">
            {"\n"}Usage Data {"\n"}
          </TitleHeader>{" "}
          {"\n"} Usage Data is collected automatically when using the Service
          and may include information such as Your Device's Internet Protocol
          address (e.g. IP address), the pages of our Service that You visit,
          the time and date of Your visit, the time spent on those pages, unique
          device identifiers and other diagnostic data. {"\n"} When You access
          the Service by or through a mobile device, We may collect certain
          information automatically, including, but not limited to, the type of
          mobile device You use, Your mobile device unique ID, the IP address of
          Your mobile device, Your mobile operating system, the type of mobile
          Internet browser You use, unique device identifiers and other
          diagnostic data.{"\n"} We may also collect information that Your
          mobile device sends whenever You visit our Service or when You access
          the Service. {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel">
          Information Collected while Using the Application {"\n"}
        </TitleHeader>
        <TextContext variant="bodyTitle">
          While using Our Application, in order to provide features of Our
          Application, We may collect, with Your prior permission:{"\n"}
          {"\n"} Pictures and other information from your Device's camera and
          photo library.
        </TextContext>
        <TitleHeader variant="inputLabel">
          Use of Your Personal Data
        </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} Simple Market" doesn't use your personal information as it's a
          demo version, however, there is a possibility that Your data could be
          used for Analytics purposes or by third parties according to their
          purpose. Therefore we do not recommend storing any sensatife
          information. {"\n"} The information is stored on the Service
          Provider's server and on Your device.{"\n"} You can enable or disable
          access to this information at any time, through Your Device settings.{" "}
          {"\n"}The Company may use Personal Data for the following purposes:{" "}
          {"\n"} To provide and maintain our Service, including to monitor the
          usage of our Service. {"\n"} To manage Your Account: to manage Your
          registration as a user of the Service. The Personal Data You provide
          can give You access to different functionalities of the Service that
          are available to You as a registered user. {"\n"} For analytical and
          development purposes. {"\n"} To contact: To contact You by email or
          other equivalent forms of electronic communication, such as a mobile
          application's push notifications regarding updates or informative
          communications related to the functionalities including the security
          updates, when necessary or reasonable for their implementation.
          {"\n"} For other purposes: We may use Your information for other
          purposes, such as data analysis, identifying usage trendsmand to
          evaluate and improve our Service, products, services, marketing and
          your experience. {"\n"} We may share Your personal information in the
          following situations: {"\n"}
          With Service Providers: {"\n"} We may share Your personal information
          with Service Providers to monitor and analyze the use of our Service,
          to contact You. {"\n"} With other users: {"\n"} When You share
          personal information or otherwise interact in the public areas with
          other users, such information may be viewed by all users and may be
          publicly distributed outside.
          {"\n"} With Your consent: {"\n"} We may disclose Your personal
          information for any other purpose with Your consent. Retention of Your
          Personal Data The Company will retain Your Personal Data only for as
          long as is necessary for the purposes set out in this Privacy Policy.
          We will retain and use Your Personal Data to the extent necessary to
          comply with our legal obligations (for example, if we are required to
          retain your data to comply with applicable laws), resolve disputes,
          and enforce our legal agreements and policies. The Company will also
          retain Usage Data for internal analysis purposes. Usage Data is
          generally retained for a shorter period of time, except when this data
          is used to strengthen the security or to improve the functionality of
          Our Service, or We are legally obligated to retain this data for
          longer time periods. {"\n"} Transfer of Your Personal Data Your
          information, including Personal Data, is processed at the Company's
          operating offices and in any other places where the parties involved
          in the processing are located. It means that this information may be
          transferred to — and maintained on — computers located outside of Your
          state, province, country or other governmental jurisdiction where the
          data protection laws may differ than those from Your jurisdiction.
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer. The
          Company will take all steps reasonably necessary to ensure that Your
          data is treated securely and in accordance with this Privacy Policy
          and no transfer of Your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of Your data and other personal information.{" "}
          {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel">
          Disclosure of Your Personal Data {"\n"}
        </TitleHeader>
        <TextContext variant="bodyTitle">
          <TitleHeader variant="inputLabel">Law enforcement </TitleHeader>
          {"\n"}
          Under certain circumstances, the Company may be required to disclose
          Your Personal Data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court or a government agency).{" "}
          {"\n"}{" "}
          <TitleHeader variant="inputLabel">
            Other legal requirements:
          </TitleHeader>
          {"\n"} The Company may disclose Your Personal Data in the good faith
          belief that such action is necessary to: {"\n"}* Comply with a legal
          obligation{"\n"} * Protect and defend the rights or property of the
          Owner{"\n"} *Prevent or investigate possible wrongdoing in connection
          with the Service{"\n"} * Protect the personal safety of Users of the
          Service or the public {"\n"} * Protect against legal liability
        </TextContext>
        <TitleHeader variant="inputLabel">
          Security of Your Personal
        </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} Data The security of Your Personal Data is important to Us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage is 100% secure. While We strive to use
          commercially acceptable means to protect Your Personal Data, We cannot
          guarantee its absolute security. {"\n"}
        </TextContext>
        <TitleHeader variant="inputLabel">Children's Privacy</TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} Our Service does not address anyone under the age of 13. We do
          not knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers. {"\n"}
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent's consent before We collect and use that
          information.
        </TextContext>
        <TitleHeader variant="inputLabel">
          {"\n"} Changes to this Privacy Policy{"\n"}
        </TitleHeader>
        <TextContext variant="bodyTitle">
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page. We will
          let You know via email and/or a prominent notice on Our Service, prior
          to the change becoming effective and update the "Last updated" date at
          the top of this Privacy Policy. You are advised to review this Privacy
          Policy periodically for any changes. Changes to this Privacy Policy
          are effective when they are posted on this page.
        </TextContext>
        <TitleHeader variant="inputLabel">
          Termination of the Service
        </TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} If you would like to delete all your personal information
          including email (terminate your account) You need contact us.
        </TextContext>
        <TitleHeader variant="inputLabel">Contact Us</TitleHeader>
        <TextContext variant="bodyTitle">
          {"\n"} For any questions or feedback about this Privacy Policy or the
          Application, You can contact us {"\n"} By email:
          andriimelnyk.native@gmail.com
        </TextContext>
        <Spacer size="xxl" />
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

export const PolicyScreen = (props) => {
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
