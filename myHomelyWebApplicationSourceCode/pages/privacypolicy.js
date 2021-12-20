import React from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Dialog, Button, IconButton } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      marginTop: "10rem",
      marginLeft: "5rem",
      marginRight: "5rem",
      [theme.breakpoints.down("812")]: {
        margin: "1rem",
      },
    },
    header: {
      fontWeight: "bold",
      fontSize: "2rem",
      marginBottom: "0.25rem",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.2rem",
        marginTop: "1rem",
      },
    },
    textAlign: {
      textAlign: "center",
    },
    download: {
      fontSize: "1.2rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      marginLeft: "0.5rem",
      color: "grey",
      textTransform: "none",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.2rem",
        marginTop: "0.5rem",
      },
    },
    icon: {
      color: "grey",
      [theme.breakpoints.down("812")]: {
        marginTop: "0.8rem",
      },
    },
    downloadContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "2rem",
      marginBottom: "0.5rem",
    },
  })
);

export default function PrivacyPolicy() {
  const classes = useStyles();

  const url =
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/LEGAL_INTERNAL/202104+Privacy+Policy.docx.pdf";

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.downloadContainer}>
          <div className={classes.header}>Privacy Policy</div>
          <a href={url} target="_blank">
            <Button>
              <LinkIcon className={classes.icon} />
              <div className={classes.download}>View Document</div>
            </Button>
          </a>
        </div>
        <div className={classes.inner}>
          myhomely.io (<b>“myHomely”</b>), respects the privacy of our website
          and app visitors and users. Please read our privacy policy thoroughly
          to understand how we collect, use, protect or otherwise handle data or
          information.
          <p>
            This privacy policy has been compiled to better serve those who are
            concerned with how their
            <b>“Personally Identifiable Information (PII)”</b> is being used to
            offer the Services (see Terms of Use) offered by myHomely. PII, as
            described in privacy law and information security, is information
            that can be used on its own or with other information to identify,
            contact, or locate a single person, or to identify an individual in
            context.
          </p>
          <p>
            We are committed to protecting the privacy and security of personal
            information under its control about prospective buyers, buyers,
            prospective sellers, sellers, website visitors, service providers
            and others who’s personal or browsing information are collected by
            myHomely.
          </p>
          <p>
            myHomely, currently or in the future, provides a variety of products
            and services to the public, including, but not limited to, a
            real-estate open market platform to enable real-estate buy and sell,
            real-estate services, advising with respect to real-estate purchase
            and sale, property management, advertising related to your needs and
            convenience, and other real-estate advisory services.
          </p>
          <p>
            On our site or app, as appropriate, you may be asked to enter your
            legal name, preferred name, email address, mailing address, phone
            number, personal information, information about your home, your
            personal preferences, or other details to identify you and
            personalize your experience. If you update or delete your PII, we
            may maintain a copy of the original data in case it is required by
            the applicable law.
          </p>
          <p>
            We collect information from you when you create an account, request
            information, request services, sign up for announcements or news
            from us, make an offer, make a purchase, accept or decline an offer,
            respond to our communications, fill out a form, or enter your PII on
            our site or app.
          </p>
          <p>
            The following sections, read as a whole, constitute myHomely Privacy
            Policy: myHomely Privacy Policy is based on, and complies with,
            Canada’s Personal Information Protection and Electronic Documents
            Act (“PIPEDA”), which broadly covers the 10 Privacy Principles
            outlined in the Canadian Standards Association (CSA) Model Code for
            the Protection of Personal Information. For more information about
            this legislation, please visit the official Web site of the Privacy
            Commission of Canada at{" "}
            <a href="https://www.priv.gc.ca/">https://www.priv.gc.ca/.</a>
          </p>
        </div>

        <p>
          <b>The ten principles of privacy</b>
        </p>
        <p>
          The following ten principles govern our actions as they relate to the
          use of Personal Information:
        </p>
        <ol type="1">
          <li>Accountability</li>
          <li>Identifying purposes</li>
          <li>Consent</li>
          <li>Limiting collection</li>
          <li>Limiting use, disclosure, and retention</li>
          <li>Accuracy</li>
          <li>Safeguarding personal information</li>
          <li>Openness</li>
          <li>Access</li>
          <li>Addressing complaints</li>
        </ol>

        <p>
          <b>Definition of Personal Information</b>
        </p>
        <p>
          “Personal information” can be any information that helps in
          identifying an individual, other than an individual’s business contact
          information that is used to communicate with the individual in
          relation to their business, employment or profession. Thus, personal
          information includes, but is not limited to, your name, contact
          information, date of birth, financial details or other information,
          hours of availability, schedule, personal preferences, family size,
          income, employment details, opinions, purchase patterns and other
          demographics that help myHomely service your specific needs.
        </p>
        <p>
          Personal information does not include anonymous or aggregated
          information that cannot be tracked back to you personally. For
          example, we may aggregate data to improve the efficiency and quality
          of our services and products, and to further enhance our marketing
          efforts to reach a wider group of users.
        </p>
        <ol type="1">
          <li>Accountability</li>
          <dt>
            myHomely is accountable for all Personal Information in its
            possession or custody, including Personal Information disclosed to
            its affiliates and third parties for purposes of providing services
            requested by you via myHomely Services.
          </dt>
          <li> Identifying Purposes</li>
          <dt>
            myHomely collects personal information for specific purposes and
            identifies these purposes at or before the time the information is
            collected.
          </dt>

          <p>
            2.1 Personal information is collected for purposes such as the
            following:
          </p>
          <ul>
            <li>
              To understand the needs of individuals and respond to requests for
              information or services;
            </li>
            <li>To verify an individual’s identity</li>
            <li>
              To complete or facilitate a transaction such as purchase or sale
              of a property;
            </li>
            <li>
              To establish relationships, provide support, offering services,
              communicate myHomely updates, service developments and other
              myHomely news;
            </li>
            <li>To conduct customer satisfaction surveys;</li>
            <li>
              To use data for improving current and future myHomely and its
              affiliates offerings and services;
            </li>
            <li>To provide safety and security services; and</li>
            <li>
              To meet legal or regulatory requirements imposed upon myHomely
              from time to time.
            </li>
          </ul>
          <p>
            2.2 Unless otherwise permitted or required by law, myHomely shall
            make reasonable efforts to only collect and use personal information
            that is necessary for the purposes identified in section 2.1.
          </p>
          <p>
            2.3 Upon request, representatives of myHomely collecting personal
            information shall explain the purposes for which such information
            will be used, or refer the individual to another myHomely
            representative who can explain the purposes.
          </p>

          <li>Consent</li>
          <p>
            myHomely will obtain your consent before or when it collects, uses,
            or discloses your Personal Information.
          </p>

          <p>
            3.1 Unless otherwise permitted or required by law, myHomely shall
            not use or disclose personal information for any new purpose that is
            not outlined in section 2.1 without first identifying and
            documenting the updated purpose and obtaining your consent.
          </p>

          <p>
            3.2 Consent can be obtained in person, by phone, by mail, by email,
            by website or app. Consent is only implied and/or assumed if the
            collection, use or disclosure of PII data is obvious based on the
            user’s actions or inactions, and the personal information is
            non-sensitive in nature and its context.
          </p>

          <p>
            3.3 myHomely will only require individuals to consent to the
            collection, use or disclosure of personal information as a condition
            to the supply of a product or service if such collection, use or
            disclosure is required to fulfill the identified purposes.
          </p>

          <p>
            3.4 Your provision of personal information to myHomely means that
            you agree to our collection, use and disclosure of your personal
            information in accordance with myHomely Privacy Policy, Terms of Use
            and Copyright Policy. If you do not agree with these terms, please
            do not provide any personal information to myHomely.
          </p>

          <p>
            3.5 If you provide myHomely or its service providers with personal
            information about another person, it is your responsibility to
            obtain consent from such a person to enable us to collect and use
            the information for the purposes mentioned in this Policy.
          </p>
          <p>
            3.6 An individual may withdraw consent at any time, subject to legal
            or contractual restrictions and reasonable notice. For example, you
            are always given the ability to opt-out of receiving promotional
            electronic messages from myHomely by using the available
            “unsubscribe” link. myHomely will inform customers of the
            implications of withdrawing consent, as we may be limited or unable
            to provide information, products or services as a result.
          </p>

          <li>Limiting collection</li>
          <p>
            The information collected by myHomely will be limited to those
            details necessary for the purposes it has identified to you or to
            perform the services you have requested. Information will be
            collected by fair and lawful means.
          </p>
          <p>
            4.1 Every myHomely department or employees or affiliates or
            third-party suppliers are responsible for ensuring that all
            information collected is limited, both in amount and type, to what
            is needed to fulfill the identified purposes
          </p>
          <p>
            4.2 For the most part, personal information is collected directly
            from the affected individual, for example through applications and
            supporting documentation provided.
          </p>
          <p>
            4.3 Only with the authorization of the individual or where permitted
            or required by law, myHomely may also collect personal information
            from references, financial institutions, credit reporting agencies
            or other third parties.
          </p>

          <li> Limiting use, disclosure, and retention</li>
          <dt>
            Personal Information will only be used or disclosed for the purpose
            for which it was collected unless you have otherwise consented.
            Personal Information may only be retained for the amount of time
            needed to fulfill the purpose for which it was collected. In certain
            exceptional circumstances, myHomely may have a legal duty or right
            to disclose Personal Information without your knowledge or consent
            with respect to matters that concern the company’s or the public’s
            interest.
          </dt>

          <li>Accuracy</li>
          <dt>
            myHomely will keep Personal Information as accurate, complete, and
            current as necessary to fulfill the identified purposes for which it
            was collected. You may have this information amended where it is
            found to be inaccurate or incomplete.
          </dt>

          <li>Safeguarding personal information </li>
          <dt>
            Personal Information is safeguarded using measures appropriate to
            the sensitivity of the information.
          </dt>

          <li>Openness</li>
          <dt>
            myHomely will make information available to its employees,
            affiliates and third-party suppliers about the policies and
            procedures myHomely uses to manage Personal Information. You have
            access to this information through our website, or through
            alternative means if requested.
          </dt>
          <li>Access</li>
          <dt>
            Upon a written request, you will be informed of the existence, use,
            and disclosure of your Personal Information, and will be given
            access to it. myHomely will respond to such requests as efficiently
            as possible. If myHomely is prohibited from providing such access
            they will explain the reasons for the lack of access, except where
            prohibited by law.
          </dt>

          <li>Addressing complaints and suggestions</li>
          <dt>
            You may challenge myHomely compliance with this Privacy Policy.
            myHomely has policies and procedures to receive, investigate, and
            respond to complaints and questions regarding this Privacy Policy
            and our collection, use, and disclosure of Personal Information. You
            may contact the myHomely Privacy team (
            <a href="contact@myhomely.io">contact@myhomely.io</a>) to express
            any concerns or to request access to your Personal Information. The
            contact information for this individual is provided at the end of
            this document
          </dt>
        </ol>

        <p className={classes.textAlign}>
          <b>Application of the ten privacy principles at myHomely</b>
        </p>

        <p dir="ltr">What kind of information do we collect?</p>
        <p dir="ltr">
          myHomely gathers and uses Personal Information or PII in order to
          provide the Services you request. Namely, information that is required
          to effectively market and sell the property of sellers; to locate,
          assess, and qualify properties for buyers; and to provide myHomely
          affiliated or third-party services to facilitate the Services you
          requested. myHomely may also use your Personal Information to update
          you about our services and to offer additional services that you may
          be interested in to serve your needs.
        </p>
        <p dir="ltr">
          We may be required to collect your social insurance number if the
          federal government obligates us to do so pursuant to the Income Tax
          Act or if you are seeking credit assessment or Property Agreement
          (refer Terms of Use).
        </p>
        <p dir="ltr">
          If you visit the myHomely website or app, we will not collect Personal
          Information about you unless you provide your full consent. All
          information that you provide us with is securely maintained and kept
          strictly confidential. This Privacy Policy does not apply to
          aggregated data from which it is not possible to determine the
          identity of a specific individual. myHomely reserves the right to use
          aggregated data in any way that it determines appropriate.
        </p>
        <p dir="ltr">
          When you use the Services and its feature, you agree to provide
          myHomely receiving the request with your browser cookies and browsing
          history (e.g., recently performed searches on myhomely.io, recently
          viewed listings) along with any searches or listings saved to your
          account where an account has been set up by you on the myHomely
          website or app.
        </p>
        <p dir="ltr">When do we collect information?</p>
        <p dir="ltr">
          We collect information from you when you register on our website or
          app.
        </p>
        <p dir="ltr">How do we use your information?</p>

        <p>
          At myHomely we use Personal Information for four general purposes:
        </p>
        <ul>
          <li>
            To communicate with you or facilitate communication between buyers,
            sellers and service providers in order to provide you with
            affiliated services.
          </li>
          <li>
            For inclusion in documentation relating to your particular
            transaction. Transactional information is used to monitor our level
            of service and report back to you to ensure your satisfaction with
            the services.
          </li>
          <li>
            We will only use Personal Information for the purposes we outlined
            in this policy document. If we want to use your information for a
            different purpose, we will ask for your consent first.
          </li>
          <li>
            If you do not wish to participate in our advertising personalization
            using the information you’ve provided to us or for retargeting or
            tracking purposes, you can opt-out by following the directions
            provided within the personalized advertisements. This does not
            necessarily mean that advertisements will not be shown to you. It
            simply means that these advertisements will not be personalized for
            you by using cookies, web beacons or similar technologies.
          </li>
        </ul>

        <p>How do we limit the use of your PII?</p>
        <p>
          We use the information we collect from you to personalize your
          experience or communicate with you, such as in the following ways:
        </p>
        <ul>
          <li>
            <b>Registration and Use</b>: when you create an account or register
            with myHomely, we will ask you for PII, such as your address, email,
            name, and/or phone number, and other information as applicable. To
            create and manage your account, we may send you an email or SMS text
            message to verify your email address or phone number. When using our
            site, you may be prompted to input PII in order for us to complete
            your request or verify your identity. In order to operate our
            services, we may use your personal information in accordance with
            our Terms of Use.
          </li>
          <li>
            <b>Service Communications</b>: to communicate with you about our
            services, we may choose to contact you by phone, email, SMS or, if
            applicable, in person. Our services may include home tours,
            information sessions, inspections, home repairs, financing,
            mortgages, staging, photography, the buying and selling of property,
            sending gifts, any other in-person or digital meetings needed to
            facilitate these activities, or communicating with third parties
            about the administration of your activities with your consent
            beforehand. If you are transacting with or through myHomely, we may
            ask for details required to complete payments if applicable. At any
            time, you may unsubscribe from any of our service communications
            using the unsubscribe instructions contained in our communication,
            or by contacting us at{" "}
            <a href="contact@myhomely.io">contact@myhomely.io</a>.
          </li>
          <li>
            <b>Email trails, Chat logs and Call Recordings</b>: we may keep the
            audit trail for all the communication administered by or through
            myHomely Services for training and quality assurance purposes.
          </li>

          <li>
            <b>Surveys</b>: we may contact you to participate in surveys
            designed to help us improve our services
          </li>

          <li>
            <b>Service Updates</b>: we may use your PII to contact you in order
            to identify and repair errors that may have impeded intended
            functionality, or to undertake activities to measure, maintain, or
            improve our services.
          </li>

          <li>
            <b>Referrals</b>: if you’re satisfied with our services and with
            your consent you wish to participate in our referral programs, we
            collect the email address or contact number, where applicable, of
            the individual(s) who you wish to refer myHomely. We use this
            information to invite the recipient to our referral program. We do
            not use the email addresses you submit for any other purpose,
            without the consent of the email recipient to do so. Please only
            submit email addresses or contact numbers of individuals with whom
            you have a personal or close relationship and who would want to
            receive referral communications from myHomely.
          </li>

          <li>
            <b>Marketing Communications and Promotions</b>: we may send you
            email, SMS, and other communications about myHomely services, news,
            or events that may be of interest to you. You can opt-out of
            receiving marketing and promotional emails or SMS from us using the
            unsubscribe instructions contained in each communication, or by
            contacting us at{" "}
            <a href="contact@myhomely.io">contact@myhomely.io</a>. If you do not
            wish to participate in our advertising personalization using the
            information you’ve provided to us for retargeting or tracking
            purposes, you can opt-out by following the directions provided
            within the personalized advertisements. This does not necessarily
            mean that no advertisements will be shown to you. It simply means
            that these advertisements will not be personalized for you by using
            cookies, web beacons or similar technologies.
          </li>
          <li>
            <b>Employment</b>: we may send email, phone, or SMS messages in
            order to communicate with you about employment opportunities at
            myHomely that may be of interest to you.
          </li>
          <li>
            <b>Meeting our Legal Requirements and Terms of Use</b>: we may use
            your PII in order to meet legal and regulatory requirements besides
            the Terms of Use.
          </li>
          <li>
            <b>Other</b>: from time to time, we may seek your consent to use
            your PII for other purposes.
          </li>
        </ul>

        <p>
          <b>When are we permitted to disclose your information?</b>
        </p>

        <p>
          myHomely is obliged to keep your Personal Information confidential
          except under the following circumstances:
        </p>
        <ol type="i">
          <li> When authorized by you</li>

          <dt>
            Many of the services offered by myHomely require us to obtain
            Personal Information about you in order to perform the services you
            have engaged us to provide. We will always obtain consent from you
            first, and we will never use the information for purposes other than
            myHomely and its affiliates services. You may withdraw your consent
            at any time, subject to any legal implications (see Terms of Use).
            In some cases, if you do not consent to our use or disclosure of
            certain Personal Information, we may be unable to continue to
            provide all or part of the services you have requested.
          </dt>
          <li>When required by law</li>
          <dt>
            The type of information we are legally required to disclose usually
            relates to government tax reporting requirements. In some cases,
            however, such as under a court order, we may be required to disclose
            certain information to persons specified in the court order. We will
            only provide the specific information requested and only upon being
            satisfied that the authorities have legitimate grounds to request
            the information.
          </dt>

          <li>When permitted by law</li>
          <dt>
            The legislation has provided certain situations where myHomely is
            legally permitted to disclose Personal Information without your
            consent. Examples include situations involving the collection of
            debt in arrears, medical emergencies, or suspicion of illegal
            activities.
          </dt>
        </ol>

        <p>
          <b>COPPA (Children Online Privacy Protection Act</b>
        </p>
        <p>
          We do not specifically market to children under the age of 13 years
          old.
        </p>

        <p>
          <b>Fair Information Practices</b>
        </p>
        <p>
          The Fair Information Practices Principles form the backbone of privacy
          law and the concepts they include have played a significant role in
          the development of data protection laws around the globe.
          Understanding the Fair Information Practice Principles and how they
          should be implemented is critical to comply with the various relevant
          privacy laws that protect personal information in Canada. In order to
          be in line with Fair Information Practices we will take the following
          responsive action, should a data breach occur:
        </p>
        <ul>
          <li>We will notify you via email within 30 business days.</li>
          <li>
            We also agree to the Individual Redress Principle which requires
            that individuals have the right to legally pursue enforceable rights
            against data collectors and processors who fail to adhere to the
            law. This principle requires not only that individuals have
            enforceable rights against data users, but also that individuals
            have recourse to courts or government agencies to investigate and/or
            prosecute non-compliance by data processors
          </li>
        </ul>

        <p>
          <b>CAN-SPAM Act</b>
        </p>
        <p>
          The CAN-SPAM Act is a law that sets the rules for commercial email,
          establishes requirements for commercial messages, gives recipients the
          right to have emails stopped from being sent to them, and spells out
          tough penalties for violations.{" "}
        </p>

        <p>We collect your email and contact number in order to:</p>
        <ul>
          <li>
            Send information, respond to inquiries, and/or other requests or
            questions.
          </li>
          <li>
            Process orders and to send information and updates pertaining to
            orders.
          </li>
          <li>Send you additional information related to our services.</li>
          <li>
            {" "}
            Market to our mailing list or our users after the original
            transaction has occurred.
          </li>
        </ul>
        <p>To be in accordance with CAN-SPAM, we agree to the following:</p>
        <ul>
          <li>
            Not use false or misleading subjects or email addresses or spam
            calls.
          </li>
          <li>
            {" "}
            Identify the message as an advertisement in a reasonable way.
          </li>
          <li>
            Monitor third-party email marketing services for compliance, if one
            is used.
          </li>
          <li>Honor opt-out/unsubscribe requests quickly.</li>
          <li>
            Allow users to unsubscribe by using the link at the bottom of each
            email.
          </li>
          <li>
            If at any time you would like to unsubscribe from receiving future
            emails, you can email us at{" "}
            <a href="contact@myhomely.io">contact@myhomely.io</a>.
          </li>
        </ul>

        <p>
          <b>With whom we may share your information?</b>
        </p>
        <ol type="i">
          <li>myHomely employees</li>
          <dt>
            In the course of daily operations, access to sensitive Personal
            Information is limited to those employees with a legitimate reason
            for accessing it. As a condition of their employment, myHomely
            employees are required to follow all applicable laws and
            regulations, including this Privacy Policy and Terms of Use.
            Unauthorized use or disclosure of confidential client information by
            any myHomely employee is prohibited and may result in disciplinary
            measures.
          </dt>
          <li>myHomely affiliates</li>
          <dt>
            In order to better meet your needs, we may share some of your
            Personal Information with our affiliates. We will only do this with
            your express consent and you may withdraw this consent at any time.
            The procedure for withdrawing consent is outlined below under the
            section “Opting Out” or contacting a privacy officer (
            <a href="contact@myhomely.io">contact@myhomely.io</a>).
          </dt>

          <li>myHomely third-party suppliers</li>
          <dt>
            As you may know, we may engage and coordinate third-party suppliers
            to provide you with certain services offered through myHomely. Such
            suppliers are only given the information that is needed to provide
            the specific service for which we contract them to provide.
            Suppliers are obliged to protect the confidentiality of your
            Personal Information and are prohibited from doing anything with
            this information that we have not authorized them to do. They are
            required to treat your Personal Information in a manner consistent
            with the myHomely Privacy Policy. If you access the myHomely website
            or app from third-party websites, including any partner or referral
            sites, you authorize myHomely to collect and use any Personal
            Information about you that you provide to us while visiting myHomely
            website and to share with the third-party any Personal Information
            collected. You also authorize any such third-party to use any
            Personal Information or any content you may provide while using
            myHomely website for preparing, using and distributing statistical,
            profiling, performance or operation reports.
          </dt>

          <li>Sale of business</li>
          <dt>
            We may transfer your personally identifiable information to a third
            party in connection with a sale, merger, or other disposition
            (whether of assets, stock, or otherwise) of our business.{" "}
          </dt>
        </ol>

        <p>
          <b>How do we safeguard your information?</b>
        </p>
        <p>
          myHomely has extensive controls in place to maintain the security of
          its information and information systems. Any data collected is stored
          according to the sensitivity of the information contained therein.
          Appropriate controls (such as restricted access, data classification,
          terms of use) are placed on our computer systems and data processing
          procedures. Physical access to areas wherein Personal Information is
          gathered, processed, or stored is limited to authorized employees.
          When you email or call myHomely helpdesk to refer to your file and
          address the matter, you may be asked for some personally identifying
          information. This type of safeguard is designed to ensure that only
          you, or someone authorized by you, has access to your file.
        </p>
        <p>
          As any service provided over the internet is not 100% guaranteed
          safeguard, we cannot guarantee that your personal or other information
          will be completely safeguarded with us from unauthorized access.
          However, as mentioned above, your personal information is contained
          behind secured networks and is only accessible by a limited number of
          persons who have special access rights to such systems, and are
          required to keep the information confidential. In addition, all
          sensitive information you supply is encrypted via Secure Socket Layer
          (SSL) technology. We use regular Malware canning and checks to ensure
          the safety of your information. All transactions are processed through
          a secured gateway and are not stored or processed in secured encrypted
          servers.
        </p>

        <p>
          <b>Website and App security</b>
        </p>
        <p>
          In order to serve you better, myHomely offers users access to certain
          information through its website and app to facilitate the services it
          offers.
        </p>
        <p>Accessing and amending your information</p>
        <p>
          As a myHomely user, you have the right to access the Personal
          Information we keep in your file and you have the right to verify or
          amend the information if it is shown to be inaccurate. If you would
          like to view the Personal Information held in your file, please make a
          written request to the Privacy Officer (
          <a href="contact@myhomely.io">contact@myhomely.io</a>). We will
          respond to your request as efficiently as possible. To make a change,
          please make a similar request in writing to the Privacy Officer.
        </p>
        <p>Opting out</p>
        <p>
          In order to provide you with our services, myHomely will, with your
          consent, share your personal information with other myHomely
          affiliates. Should you not want to receive promotional materials from
          or have your Personal Information shared with these companies please
          contact the Privacy Officer at the address, phone number, or e-mail
          address provided at the end of this document.
        </p>
        <p>Anonymous information</p>
        <p>
          myHomely may collect anonymous information about you. This means that
          the information collected cannot be traced back to a specific person.
          For example, our webservers may record certain information
          automatically when you visit the myHomely website or app. This
          information is collected using “cookies”, and might include the pages
          you’ve visited, your IP (Internet protocol) address and other site
          usage statistics. This anonymous information is used for research and
          analytical purposes only (like evaluating how many visitors to our
          Services or which pages or sections they visit most often or liked).
          It does not reveal any Personal Information about you, the user. This
          aggregate data may be disclosed to third parties, but never with
          personally identifying information unless stated and consented by you
        </p>

        <p>Cookies</p>
        <p>
          “Cookies” are small text files that contain a unique identification
          number that allows our computers to identify your web browser (but not
          you) each time you visit one of our websites that uses cookies. The
          information helps myHomely improve the functionality of its services
          and enhance the navigation and security of your session. Most major
          websites use this technology and most browsers are set up to accept
          them. We use cookies to specifically:
        </p>
        <ul>
          <li>Understand and save user's preferences for future visits.</li>
          <li>Keep track of advertisements and marketing effectiveness.</li>
          <li>
            Compile aggregate data about site traffic and site interactions in
            order to offer better site experiences and tools in the future. We
            may also use trusted third-party services that track this
            information on our behalf.
          </li>
        </ul>

        <p>
          You may configure your browser to notify you when you receive a
          cookie, and you may refuse to accept them entirely. However, if you
          refuse to accept cookies, you may limit the functionality that we can
          provide to you when you visit our site.
        </p>

        <p>
          <b>We don’t sell your PII</b>
        </p>
        <p>
          We do not sell, trade, or otherwise transfer your PII to outside
          parties unless in connection with the administration of our services,
          and with your consent. This does not include website hosting partners
          and other parties who assist us in operating our website, conducting
          our business, or serving our users, as long as those parties agree to
          keep this information confidential. We may also release information
          when it's release is appropriate to comply with the law, enforce our
          site policies, or protect ours or others' rights, property or safety.
        </p>
        <p>
          However, non-personally identifiable visitor information may be
          provided to myHomely affiliates and other parties for marketing,
          advertising, or other uses.
        </p>
        <p>
          We value your privacy and protecting your information is among highest
          priorities for us. We take the necessary precautions to be in
          compliance with the Personal Information Protection and Electronic
          Documents Act (PIPEDA). We therefore will not distribute your personal
          information to outside parties without your consent.
        </p>

        <p>
          <b>We may serve up third party links</b>
        </p>
        <p>
          Occasionally, at our discretion, we may include or offer third-party
          services on our website or app. These third-party sites have separate
          and independent privacy policies. We therefore have no responsibility
          or liability for the content and activities of these linked sites.
          Nonetheless, we seek to protect the integrity of our site and welcome
          any feedback about these sites.
        </p>

        <p>
          <b>We make use of Google services</b>
        </p>
        <p>
          Google's advertising requirements can be summed up by Google's
          Advertising Principles. They are put in place to provide a positive
          experience for users.{" "}
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/adwordspolicy/answer/1316548?hl=en ">
              https://support.google.com/adwordspolicy/answer/1316548?hl=en{" "}
            </a>
          </li>
        </ul>

        <p>We use Google AdSense Advertising on our website.</p>
        <p>
          Google, as a third-party vendor, uses cookies to serve ads on our
          site. Google's use of the DART cookie enables it to serve ads to our
          users based on previous visits to our site and other sites on the
          Internet. Users may opt-out of the use of the DART cookie by visiting
          the Google Ad and Content Network privacy policy.
        </p>
        <p>We have implemented the following:</p>
        <ul>
          <li>Remarketing with Google AdSense</li>
        </ul>

        <p>
          We, along with third-party vendors such as Google use first-party
          cookies (such as the Google Analytics cookies) and third-party cookies
          (such as the DoubleClick cookie) or other third-party identifiers
          together to compile data regarding user interactions with ad
          impressions and other ad service functions as they relate to our
          website
        </p>

        <p>Opting out:</p>
        <p>
          Users can set preferences for how Google advertises to you using the
          Google Ad Settings page. Alternatively, you can opt out by visiting
          the Network Advertising Initiative Opt Out page or by using the Google
          Analytics Opt Out Browser add on.
        </p>

        <p>We agree to the following:</p>
        <ul>
          <li>Users can visit our site anonymously.</li>
          <li>
            Once this privacy policy is created, we will add a link to it on our
            home page or as a minimum, on the first significant page after
            entering our website.
          </li>
          <li>
            Our Privacy Policy link includes the word 'Privacy' and can easily
            be found on the page specified above.
          </li>
          <li>
            You will be notified of any Privacy Policy changes on myHomely
            Privacy Policy page.
          </li>
        </ul>

        <p>
          You can change your personal information by emailing us on{" "}
          <a href="contact@myhomely.io">contact@myhomely.io</a>.{" "}
        </p>
        <p>
          <b>Questions, concerns, and complaints</b>
        </p>
        <p>
          If you have any questions, concerns, or complaints about your Personal
          Information, or about the myHomely Privacy Policy, contact us on{" "}
          <a href="contact@myhomely.io">contact@myhomely.io</a>.
        </p>
      </div>
    </Layout>
  );
}
