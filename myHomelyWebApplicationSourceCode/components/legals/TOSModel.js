import React, { useState, useEffect, useRef } from "react";
import { Dialog, Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      borderRadius: "0.5rem",
      height: "38.5rem",
      position: "relative",
    },
    root: {
      fontFamily: "Gilroy, sans-serif",
      padding: "3rem",
      overflowY: "scroll",
      maxHeight: "50rem",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    absoluteContainer: {
      position: "sticky",
      width: "100%",
      background: "#F3F3F3",
      padding: "1.25rem",
      bottom: 0,
      display: "flex",
      justifyContent: "flex-end",
    },
    acceptButton: {
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      color: "#249FFB",
      border: "0.125rem solid #249FFB",
    },
  })
);

export default function TOS({ open, setOpen, callback }) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(true);

  const [referenceNode, setReferenceNode] = useState();

  useEffect(() => {
    if (referenceNode) {
      return () => referenceNode.removeEventListener("scroll", handleScroll);
    }
  }, [referenceNode]);

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      setDisabled(false);
    }
  }

  const paneDidMount = (node) => {
    if (node) {
      node.addEventListener("scroll", handleScroll);
      setReferenceNode(node);
    }
  };

  const url =
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/LEGAL_INTERNAL/202104+Terms+of+Use.docx.pdf";

  return (
    <Dialog
      onClose={() => setOpen(false)}
      classes={{ paper: classes.dialog }}
      open={open}
    >
      <div>
        <a href={url} target="_blank">
          <IconButton>
            <GetAppIcon />
          </IconButton>
        </a>
      </div>
      <div className={classes.root} ref={paneDidMount}>
        <div className={classes.header}>Terms of Service</div>
        <div className={classes.inner}>
          Please read these Terms of Service (the <b>“Terms”</b>) and our
          Privacy Policy (
          <a href="https://www.myhomely.io/privacypolicy">
            https://www.myhomely.io/privacypolicy
          </a>
          ) (<b>“Privacy Policy”</b>) carefully because they govern your use of
          the website located at www.MyHomely.io (the <b>“Site”</b>) and real
          estate marketplace services accessible via the Site and mobile device
          application (<b>“App”</b>) offered by MyHomely.io (<b>“MyHomely”</b>).
          To make these Terms easier to read, the Site, our services and App are
          collectively called the <b>“Services.”</b>
        </div>
        <ol>
          <li>Agreement to Terms</li>
          <dt>
            By using our Services, you agree to be bound by these Terms. If you
            don’t agree to be bound by these Terms, do not use the Services. If
            you are accessing and using the Services on behalf of a company
            (such as your employer) or other legal entity, you represent and
            warrant that you have the authority to bind that company or other
            legal entity to these Terms. In that case, <b>“you”</b> and{" "}
            <b>“your”</b>
            will refer to that company or other legal entity.
          </dt>
          <li>Privacy Policy</li>
          <dt>
            Please refer to our Privacy Policy for information on how we
            collect, use and disclose information from our users. You
            acknowledge and agree that your use of the Services is subject to
            our Privacy Policy.
            <br />
            <br />
            IMPORTANT NOTICE REGARDING ARBITRATION: WHEN YOU AGREE TO THESE
            TERMS YOU ARE AGREEING (WITH LIMITED EXCEPTION) TO RESOLVE ANY
            DISPUTE BETWEEN YOU AND MYHOMELY THROUGH BINDING, INDIVIDUAL
            ARBITRATION RATHER THAN IN COURT. PLEASE REVIEW CAREFULLY SECTION 17
            “DISPUTE RESOLUTION” BELOW FOR DETAILS REGARDING ARBITRATION.
          </dt>
          <li>Changes to Terms or Services</li>
          <dt>
            We may update the Terms at any time, in our sole discretion. If we
            do so, we’ll let you know either by posting the updated Terms on the
            Site or through other communications. It’s important that you review
            the Terms whenever we update them or you use the Services. If you
            continue to use the Services after we have posted updated Terms, you
            are agreeing to be bound by the updated Terms. If you don’t agree to
            be bound by the updated Terms, then, except as otherwise provided in
            Section 17(e) <b>“Effect of Changes on Arbitration,”</b> you may not
            use the Services anymore. Because our Services are evolving over
            time we may change or discontinue all or any part of the Services,
            at any time and without notice, at our sole discretion.
          </dt>
          <li>About the Services</li>
          <dt>
            The Services comprise a digital real estate marketplace that is
            offered to both users who wish to list their homes for sale through
            the Services (<b>“Sellers”</b>), users who wish to search for and
            make offers to purchase homes through the Services (<b>“Buyers”</b>)
            and affiliated or third-party services that may used to facilitate
            the transaction between Buyer(s) and Seller(s). These Terms govern
            your use of the Services whether you are acting as a Seller, Buyer,
            or both.
            <br />
            <br />
            YOU UNDERSTAND AND ACKNOWLEDGE THAT MYHOMELY OFFERS A PLATFORM FOR
            BUYERS AND SELLERS TO CONNECT WITH ONE ANOTHER VIA THE SERVICES AND
            THAT ANY AGREEMENTS ENTERED INTO BETWEEN BUYERS AND SELLERS IN
            CONNECTION WITH THE PURCHASE OF A PROPERTY ARE BETWEEN THE BUYERS
            AND SELLERS AND THAT MYHOMELY IS NOT A PARTY TO ANY SUCH AGREEMENTS.
          </dt>
          <ol type="a">
            <li>Terms Applicable to Sellers</li>
            <dt>
              If you are a Seller, you may feature one or more residential
              properties you wish to sell (the <b>“Property”</b>) on the
              Services. You are solely responsible for providing all pertinent
              details about your Property, such as location and asking price,
              and for ensuring that your Property placement on the Services is
              complete, accurate, and up-to-date. If you provide photographs,
              videos, or animations of the Property to the Services, you must
              ensure, and you agree, that your Property is and will be
              accurately represented. MyHomely requires at least one photo of
              the front exterior of a property. All photos must be of the
              property itself. We reserve the right to deny any listing at their
              sole discretion. You acknowledge and agree that MyHomely is not a
              real estate broker as described in further detail in Section 4(d)
              below. You agree that you as a seller of real estate are
              responsible for identifying, understanding, and complying with all
              laws, rules and regulations that apply to your sale of a Property.
              Offers that Buyers make for your Property will be communicated to
              you via the Services. As a Seller, via the functionality of the
              Services, you permit MyHomely to syndicate the listing of your
              Property on the Services to other online real estate or general
              marketplaces, including but not limited to MLS and Facebook (the
              <b>“Other Marketplaces”</b>), as permitted by the functionality of
              those Other Marketplaces. If MyHomely syndicates your listing to
              Other Marketplaces, you acknowledge and agree that (i) such Other
              Marketplaces may request additional information or actions from
              you, such as requiring you to verify your identity as the owner of
              the listing via phone verification and (ii) the listing of your
              Property on Other Marketplaces will be subject to the Other
              Marketplaces’ then-current terms of service. You acknowledge sole
              responsibility for and assume all risk arising from the listing of
              your Property on Other Marketplaces, and MyHomely has no liability
              in this regard.
            </dt>
            <li>Terms Applicable to Buyers</li>
            <dt>
              If you are a Buyer, you may search for Properties that are placed
              by Sellers on the Services, and you may also communicate with, and
              make offers to, Sellers to purchase Properties, via the Services.
              If you are selected as a <b>“MyHomely Verified Buyer”</b> by
              MyHomely, you will be able to avail of specific features of the
              Services. You can learn about how to become a{" "}
              <b>Myhomely Verified Buyer</b> on the Site. You acknowledge and
              agree that MyHomely is not a real estate broker and as a Buyer,
              you should always exercise due diligence and care when deciding to
              make an offer to purchase a Property. You acknowledge sole
              responsibility for and assume all risk arising from purchasing the
              Property on MyHomely or Other Marketplaces, and MyHomely has no
              liability in this regard.
            </dt>
            <li>Terms Applicable to All Users</li>
            <dt>
              You represent that your use of the Services will comply with all
              laws, regulations, these Terms, and any other applicable MyHomely
              policies. When a Seller elects to accept a proposed offer made by
              a Buyer through the Services, Buyer and Seller will enter into a
              purchase agreement to purchase the Property (and will have the
              option to electronically sign that purchase agreement) (
              <b>“Purchase Agreement"</b>). A form of Purchase Agreement may be
              presented to Buyers and Sellers through the Services. You
              understand and acknowledge that (i) any form of Purchase Agreement
              made available by MyHomely through the Services is provided as a
              convenience for the purchase of Property located in California
              only and MyHomely makes no warranties that such form of Purchase
              Agreement is comprehensive or addresses all applicable laws in
              connection with the purchase, sale and transfer of the Property;
              (ii) the Purchase Agreement, or any other agreement signed by both
              Buyer and Seller in connection with the purchase of a Property, is
              a legally binding agreement between Buyer and Seller; (iii)
              MyHomely is not a party to any Purchase Agreement or any other
              agreement entered into between Buyer and Seller in connection with
              the purchase of a Property, and (iv) in no circumstances will
              MyHomely become a party to any contractual relationship between
              Buyer and Seller.
            </dt>
            <li>Scope of the Services</li>
            <dt>
              MyHomely is not a real estate broker or lender. MyHomely does not,
              and the Services are not intended to, provide financial or real
              estate advice to you, nor does MyHomely represent you or any
              another user in connection with the purchase or sale of
              properties, including any negotiations undertaken through the
              Services. MyHomely does not own, buy, or sell any of the
              Properties on the Services. You understand that MyHomely has no
              control over and does not guarantee (i) the suitability, safety or
              legality of any of the Properties on the Services; (ii) the
              accuracy of any information about the Properties; or (iii) the
              identity of Buyers and Sellers on the Services. You accept sole
              responsibility for any decisions you make from relying on the
              Services or any action or inaction you take on the Services.
            </dt>
            <li>
              You may also find third-party services providers on the Services
              which you may need that are related to the purchasing of a
              Property, such as a title company, lawyer, staging, contractor,
              home inspection, appraisal or loan services (“Third Party
              Services”).
            </li>
          </ol>
          <li>Who May Use the Services?</li>
          <ol type="a">
            <li>Eligibility</li>
            <dt>
              You may use the Services only if you are 18 years or older,
              capable of forming a binding contract (i.e. these Terms) with
              MyHomely and are not barred from using the Services under
              applicable law.
            </dt>
            <li>Registration and Your Information</li>
            <dt>
              If you would like to act as either a Buyer or a Seller, you’ll
              have to create an account (<b>“Account”</b>). You can do this via
              the Site or through your account with certain third-party social
              networking services such as Facebook or Gmail (each, an{" "}
              <b>"SNS Account"</b>
              ). If you choose the SNS Account option we’ll create your Account
              by extracting from your SNS Account certain personal information
              such as your name and email address and other personal information
              that your privacy settings on the SNS Account permit us to access.
            </dt>
            <li>Accuracy of Account Information</li>
            <dt>
              It’s important that you provide us with accurate, complete and
              up-to-date information for your Account and you agree to update
              such information to keep it accurate, complete and up-to-date. If
              you don’t, we might have to suspend or terminate your Account. You
              agree that you won’t disclose your Account password to anyone and
              you’ll notify us immediately of any unauthorized use of your
              Account. You’re responsible for all activities that occur under
              your Account, whether or not you know about them.
            </dt>
          </ol>
          <li>Feedback</li>
          <dt>
            We welcome feedback, comments and suggestions for improvements to
            the Services (<b>“Feedback”</b>). You can submit Feedback by
            emailing us at <b>info@myhomely.io</b>. You grant to us a
            non-exclusive, transferable, worldwide, perpetual, irrevocable,
            fully-paid, royalty-free license, with the right to sublicense,
            under any and all intellectual property rights that you own or
            control to use, copy, modify, create derivative works based upon and
            otherwise exploit the Feedback for any purpose.
          </dt>
          <li>Payments</li>
          <dt>
            MyHomely does not currently require payment of a fee for use of the
            Services unless mentioned on the Services. However, we reserve the
            right to charge fees in the future to access the Services or certain
            features of the Services. If we do require payments for your use of
            the Services in the future, MyHomely will provide you advance notice
            of the applicable fees.
          </dt>
          <li>Content Ownership, Responsibility and Removal</li>
          <ol type="a">
            <li>Definitions</li>
            <dt>
              For purposes of these Terms: (i) “Content” means text, graphics,
              images, music, software, audio, video, works of authorship of any
              kind, and information or other materials that are posted,
              generated, provided or otherwise made available through the
              Services, including all information about Properties for sale; and
              (ii) “User Content” means any Content that Account holders
              (including you) provide to be made available through the Services.
            </dt>
            <li>Our Content Ownership</li>
            <dt>
              MyHomely does not claim any ownership rights in any User Content
              and nothing in these Terms will be deemed to restrict any rights
              that you may have to use and exploit your User Content. Subject to
              the foregoing, MyHomely and its licensors exclusively own all
              right, title and interest in and to the Services and Content,
              including all associated intellectual property rights. You
              acknowledge that the Services and Content are protected by
              copyright, trademark, and other laws of the Canada and foreign
              countries. You agree not to remove, alter or obscure any
              copyright, trademark, service mark or other proprietary rights
              notices incorporated in or accompanying the Services or Content.
            </dt>
            <li>Rights in User Content Granted by You</li>
            <dt>
              By making any User Content available through the Services, you
              hereby grant to MyHomely a non-exclusive, transferable, worldwide,
              royalty-free license, with the right to sublicense, to use, copy,
              modify (for formatting purposes), store, distribute, publicly
              display, and publicly perform your User Content in connection with
              operating and providing the Services and Content to you and to
              other Account holders, including for purposes of advertising and
              marketing the Services, via social media and other means.
            </dt>
            <li>Your Responsibility for User Content</li>
            <dt>
              You are solely responsible for all your User Content. You
              represent and warrant that you own all your User Content or you
              have all rights that are necessary to grant us the license rights
              in your User Content under these Terms. You also represent and
              warrant that neither your User Content, nor your use and provision
              of your User Content to be made available through the Services,
              nor any use of your User Content by MyHomely on or through the
              Services will infringe, misappropriate or violate a third party’s
              intellectual property rights, or rights of publicity or privacy,
              or result in the violation of any applicable law or regulation. In
              some circumstances (for example, when a Seller places Property on
              the Services for the first time), MyHomely may review and, in its
              sole discretion, accept Seller’s User Content before making such
              User Content available on the Services. MyHomely is not required
              to make available User Content via the Services, and has no
              liability under these Terms or otherwise for any failure to do so
            </dt>

            <li>Removal of User Content</li>
            <dt>
              You can remove your User Content by contacting us at{" "}
              <b>info@myhomely.io</b> or by specifically deleting it as the
              functionality of the Services permits. However, in certain
              instances, some of your User Content (such as posts, comments, or,
              if applicable, offers and counteroffers you make) may not be
              completely removed and copies of your User Content may continue to
              exist on the Services. We are not responsible or liable for the
              removal or deletion of (or the failure to remove or delete) any of
              your User Content.
            </dt>

            <li>Rights in Content Granted by MyHomely</li>
            <dt>
              Subject to your compliance with these Terms, MyHomely grants to
              you a limited, non-exclusive, non-transferable license, with no
              right to sublicense, to view and display the Content solely in
              connection with your permitted use of the Services.
            </dt>
          </ol>
          <li>Rights and Terms for Apps</li>
          <ol type="a">
            <li> Rights in App Granted by MyHomely </li>

            <dt>
              Subject to your compliance with these Terms, MyHomely grants to
              you a limited non-exclusive, non-transferable license, with no
              right to sublicense, to download and install a copy of the App on
              a mobile device or computer that you own or control and to run
              such copy of the App solely for your own personal non-commercial
              purposes. You may not copy the App, except for making a reasonable
              number of copies for backup or archival purposes. Except as
              expressly permitted in these Terms, you may not: (i) copy, modify
              or create derivative works based on the App; (ii) distribute,
              transfer, sublicense, lease, lend or rent the App to any third
              party; (iii) reverse engineer, decompile or disassemble the App;
              or (iv) make the functionality of the App available to multiple
              users through any means. MyHomely reserves all rights in and to
              the App not expressly granted to you under these Terms
            </dt>

            <li>Accessing App from App Store </li>
            <dt>
              The following terms apply to any App accessed through or
              downloaded from any app store or distribution platform (like the
              Apple App Store or Google Play) where the App may now or in the
              future be made available (each an <b>“App Provider”</b>). You
              acknowledge and agree that
            </dt>
            <ul>
              <li>
                These Terms are concluded between you and MyHomely, and not with
                the App Provider, and MyHomely (not the App Provider), is solely
                responsible for the App.
              </li>

              <li>
                The App Provider has no obligation to furnish any maintenance
                and support services with respect to the App.
              </li>

              <li>
                In the event of any failure of the App to conform to any
                applicable warranty, you may notify the App Provider, and the
                App Provider will refund the purchase price for the App to you
                (if applicable) and, to the maximum extent permitted by
                applicable law, the App Provider will have no other warranty
                obligation whatsoever with respect to the App. Any other claims,
                losses, liabilities, damages, costs or expenses attributable to
                any failure to conform to any warranty will be the sole
                responsibility of MyHomely.
              </li>
              <li>
                The App Provider is not responsible for addressing any claims
                you have or any claims of any third party relating to the App or
                your possession and use of the App, including, but not limited
                to: (i) product liability claims; (ii) any claim that the App
                fails to conform to any applicable legal or regulatory
                requirement; and (iii) claims arising under consumer protection
                or similar legislation.
              </li>

              <li>
                In the event of any third-party claim that the App or your
                possession and use of that App infringes that third party’s
                intellectual property rights, MyHomely will be solely
                responsible for the investigation, defense, settlement and
                discharge of any such intellectual property infringement claim
                to the extent required by these Terms.
              </li>

              <li>
                The App Provider, and its subsidiaries, are third-party
                beneficiaries of these Terms as related to your license to the
                App, and that, upon your acceptance of the Terms, the App
                Provider will have the right (and will be deemed to have
                accepted the right) to enforce these Terms as related to your
                license of the App against you as a third-party beneficiary
                thereof
              </li>

              <li>
                You represent and warrant that (i) you are not located in a
                country that is subject to a Canadian Government embargo, or
                that has been designated by the Canadian Government as a
                terrorist-supporting country; and (ii) you are not listed on any
                Canadian Government list of prohibited or restricted parties.
              </li>

              <li>
                You must also comply with all applicable third-party terms of
                service when using the App
              </li>
            </ul>
          </ol>

          <li> General Prohibitions and MyHomely’s Enforcement Rights </li>
          <dt>You agree not to do any of the following:</dt>
          <ol type="a">
            <li>
              <dt>
                Post, upload, publish, submit or transmit any User Content that:
              </dt>
              <ol type="i">
                <li>
                  <dt>
                    infringes, misappropriates or violates a third party’s
                    patent, copyright, trademark, trade secret, moral rights or
                    other intellectual property rights, or rights of publicity
                    or privacy;
                  </dt>
                </li>
                <li>
                  <dt>
                    violates, or encourages any conduct that would violate, any
                    applicable law or regulation or would give rise to civil
                    liability;
                  </dt>
                </li>

                <li>
                  <dt>is fraudulent, false, misleading or deceptive;</dt>
                </li>

                <li>
                  <dt>
                    is defamatory, obscene, pornographic, vulgar or offensive;
                  </dt>
                </li>

                <li>
                  <dt>
                    promotes discrimination, bigotry, racism, hatred, harassment
                    or harm against any individual or group;
                  </dt>
                </li>

                <li>
                  <dt>
                    is violent or threatening or promotes violence or actions
                    that are threatening to any person or entity; or{" "}
                  </dt>
                </li>

                <li>
                  <dt>promotes illegal or harmful activities or substances;</dt>
                </li>
              </ol>
            </li>

            <li>
              <dt>
                Use, display, mirror or frame the Services or any individual
                element within the Services, MyHomely’s name, any MyHomely
                trademark, logo or other proprietary information, or the layout
                and design of any page or form contained on a page, without
                MyHomely’s express written consent;
              </dt>
            </li>

            <li>
              <dt>
                Access, tamper with, or use non-public areas of the Services,
                MyHomely’s computer systems, or the technical delivery systems
                of MyHomely’s providers;
              </dt>
            </li>

            <li>
              <dt>
                Attempt to probe, scan or test the vulnerability of any MyHomely
                system or network or breach any security or authentication
                measures;
              </dt>
            </li>

            <li>
              <dt>
                Avoid, bypass, remove, deactivate, impair, descramble or
                otherwise circumvent any technological measure implemented by
                MyHomely or any of MyHomely’s providers or any other third party
                (including another user) to protect the Services or Content;
              </dt>
            </li>

            <li>
              <dt>
                Attempt to access or search the Services or Content or download
                Content from the Services through the use of any engine,
                software, tool, agent, device or mechanism (including spiders,
                robots, crawlers, data mining tools or the like) other than the
                software and/or search agents provided by MyHomely or other
                generally available third-party web browsers;
              </dt>
            </li>

            <li>
              <dt>
                Send any unsolicited or unauthorized advertising, promotional
                materials, email, junk mail, spam, chain letters or other form
                of solicitation;
              </dt>
            </li>

            <li>
              <dt>
                Use any meta tags or other hidden text or metadata utilizing a
                MyHomely trademark, logo URL or product name without MyHomely’s
                express written consent;
              </dt>
            </li>
            <li>
              <dt>
                Use the Services or Content, or any portion thereof, for any
                commercial purpose or for the benefit of any third party or in
                any manner not permitted by these Terms;
              </dt>
            </li>

            <li>
              <dt>
                Forge any TCP/IP packet header or any part of the header
                information in any email or newsgroup posting, or in any way use
                the Services or Content to send altered, deceptive or false
                source-identifying information;
              </dt>
            </li>

            <li>
              <dt>
                Attempt to decipher, decompile, disassemble or reverse engineer
                any of the software used to provide the Services or Content;
              </dt>
            </li>

            <li>
              <dt>
                Interfere with, or attempt to interfere with, the access of any
                user, host or network, including, without limitation, sending a
                virus, overloading, flooding, spamming, or mail-bombing the
                Services;
              </dt>
            </li>

            <li>
              <dt>
                Collect or store any personally identifiable information from
                the Services from other users of the Services without their
                express permission;
              </dt>
            </li>

            <li>
              <dt>
                Impersonate or misrepresent your affiliation with any person or
                entity;
              </dt>
            </li>

            <li>
              <dt>Violate any applicable law or regulation; or</dt>
            </li>

            <li>
              <dt>
                Encourage or enable any other individual to do any of the
                foregoing.
              </dt>
            </li>
          </ol>

          <dt>
            Although we’re not obligated to monitor access to or use of the
            Services or Content or to review or edit any Content, we have the
            right to do so for the purpose of operating the Services, to ensure
            compliance with these Terms and to comply with applicable law or
            other legal requirements. We reserve the right, but are not
            obligated, to remove or disable access to any Content, including
            User Content, at any time and without notice, including, but not
            limited to, if we, at our sole discretion, consider any Content to
            be objectionable or in violation of these Terms. We have the right
            to investigate violations of these Terms or conduct that affects the
            Services. We may also consult and cooperate with law enforcement
            authorities to prosecute users who violate the law.
          </dt>

          <li>Third Party Websites, Resources, and Services</li>
          <ol type="a">
            <li>Third Party Websites and Resources</li>
            <dt>
              The Services (including the App) may contain links to third-party
              websites or resources. We provide these links only as a
              convenience and are not responsible for the content, products or
              services on or available from those websites or resources or links
              displayed on such websites. You acknowledge sole responsibility
              for and assume all risk arising from, your use of any third-party
              websites or resources
            </dt>

            <li>Third Party Services</li>
            <dt>
              As set forth in Section 4(e), the Services (including the App) may
              offer referrals or recommendations for Third Party Services. Such
              Third Party Services are solely responsible for the services they
              offer you and MyHomely has is not party to any agreement you with
              a Third Party Services provider. You acknowledge sole
              responsibility for and assume all risk arising from your use of
              any Third Party Services and MyHomely has no liability in this
              regard. You acknowledge t hat in some instances MyHomely at its
              discretion may be paid by certain Third Party Services providers
              consideration in exchange for providing referrals or
              recommendations to Third Party Services via the Services.
            </dt>

            <li>No Solicitation</li>
            <dt>
              You agree that, whether you are a real estate agent or not, you
              may not use the Services to directly or indirectly solicit for
              real estate brokerage or other related services.
            </dt>
          </ol>

          <li>Termination </li>
          <dt>
            We may terminate your access to and use of the Services, at our sole
            discretion, at any time and without notice to you. You may cancel
            your Account at any time by sending an email to us at
            info@myhomely.io Upon any termination, discontinuation or
            cancellation of the Services or your Account, the following Sections
            will survive: 8(a), 8(b), 8(c), 12, 13, 15, 16, 17, and 18.
            Notwithstanding the foregoing, if MyHomely terminates the Services
            and/or cancels your Account in accordance with this Section 12, you
            agree not to assert any claim of interference or delay against us in
            connection with the purchase or sale of your Property.
          </dt>

          <li>Warranty Disclaimers</li>
          <dt>
            <p>
              THE SERVICES AND CONTENT ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF
              ANY KIND. WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM
              ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY
              WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. WE
              MAKE NO WARRANTY THAT THE SERVICES WILL MEET YOUR REQUIREMENTS OR
              BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS. WE
              MAKE NO WARRANTY REGARDING THE QUALITY, ACCURACY, TIMELINESS,
              TRUTHFULNESS, COMPLETENESS OR RELIABILITY OF ANY CONTENT. MYHOMELY
              ASSUMES NO RESPONSIBILITY FOR ANY RESULT OR CONSEQUENCE ARISING
              FROM ANY ACTION OR INACTION THAT USERS TAKE BASED ON THE SERVICES
              OR ANY OTHER INFORMATION AVAILABLE THROUGH THE SERVICES.
            </p>
            <p>
              MYHOMELY DOES NOT VET THE CONTENT IT OBTAINS FROM BUYERS, SELLERS,
              THIRD PARTY DATA SOURCES, LICENSORS OR SERVICE PROVIDERS THAT ARE
              MADE AVAILABLE ON THE SERVICES FOR ACCURACY, AND IS NOT
              RESPONSIBLE FOR ANY ERRORS IN DISPLAYED INFORMATION OR DELAYS IN
              DISPLAYING INFORMATION ON THE SERVICES. ANY USE OR RELIANCE ON ANY
              USER CONTENT, OR OTHER INFORMATION ON THE SERVICES OR OBTAINED BY
              YOU THROUGH THE SERVICES IS AT YOUR OWN RISK, INCLUDING
              INFORMATION PROVIDED BY OR FOR MYHOMELY.
            </p>
            <p>
              MYHOMELY IS NOT RESPONSIBLE FOR, AND MYHOMELY MAKES NO
              REPRESENTATIONS OR WARRANTIES REGARDING THE DELIVERY OF ANY
              MESSAGES (I.E. BETWEEN BUYERS AND SELLERS) SENT THROUGH THE
              SERVICES. MYHOMELY HAS NO OBLIGATION TO VERIFY THE IDENTITY OF THE
              PERSONS USING ITS SERVICES, NOR DOES MYHOMELY HAVE ANY OBLIGATION
              TO MONITOR THE USE OF ITS SERVICES. MYHOMELY DISCLAIMS ALL
              LIABILITY FOR IDENTITY THEFT OR ANY OTHER MISUSE OF YOUR IDENTITY
              OR INFORMATION BY OTHERS.
            </p>
          </dt>

          <li> Indemnity</li>
          <dt>
            You will indemnify and hold harmless MyHomely and its officers,
            directors, employees and agents, from and against any claims,
            disputes, demands, liabilities, damages, losses, and costs and
            expenses, including, without limitation, reasonable legal and
            accounting fees arising out of or in any way connected with (i) your
            access to or use of the Services, (ii) your User Content, (iii) your
            interaction with any other user of the Services, whether or not you
            decide to enter into a Purchase Agreement with that user or whether
            or not you are acting as a Buyer or Seller; (iv) any interference,
            delay, or other adverse impact in connection with the purchase or
            sale of Property, whether or not you are acting as a Buyer or
            Seller, (v) any physical damage to a Property (such as theft or
            vandalism) or personal injury that arises in connection with listing
            a Property on the Services; or (vi) your violation of these Terms,
            applicable law, regulations or third party rights.
          </dt>

          <li> Limitation of Liability</li>
          <ol type="A">
            <li>
              <dt>
                NEITHER MYHOMELY NOR ANY OTHER PARTY INVOLVED IN DELIVERING THE
                SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY
                OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST
                REVENUES, DIMINUTION OF VALUE, LOST SAVINGS, LOST BUSINESS
                OPPORTUNITY, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION,
                COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE
                SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THESE
                TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES,
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
                NEGLIGENCE), OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT
                MYHOMELY OR ANY OTHER PARTY HAS BEEN INFORMED OF THE POSSIBILITY
                OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS
                FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME
                JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
                LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE
                LIMITATION MAY NOT APPLY TO YOU
              </dt>
            </li>

            <li>
              <dt>
                IN NO EVENT WILL MYHOMELY’S TOTAL LIABILITY ARISING OUT OF OR IN
                CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO
                USE THE SERVICES EXCEED THE AMOUNTS YOU HAVE PAID OR ARE PAYABLE
                BY YOU TO MYHOMELY FOR USE OF THE SERVICES OR ONE HUNDRED
                DOLLARS ($50), IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO
                MYHOMELY, AS APPLICABLE.
              </dt>
            </li>

            <li>
              THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE
              FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN MYHOMELY
              AND YOU
            </li>
          </ol>

          <li>Governing Law and Forum Choice</li>
          <dt>
            These Terms and any action related thereto will be governed by the
            appropriate Federal Law and/or Ontario Law, without regard to its
            conflict of laws provisions. Except as otherwise expressly set forth
            in Section 17 “Dispute Resolution,” the exclusive jurisdiction for
            all Disputes (defined below) that you and MyHomely are not required
            to arbitrate will be the province courts located in the Central West
            Region of Ontario, and you and MyHomely each waive any objection to
            jurisdiction and venue in such courts.
          </dt>

          <li>Dispute Resolution</li>
          <ol type="a">
            <li>Mandatory Arbitration of Disputes</li>
            <dt>
              We each agree that any dispute, claim or controversy arising out
              of or relating to these Terms or the breach, termination,
              enforcement, interpretation or validity thereof or the use of the
              Services or Content (collectively, “Disputes”) will be resolved
              solely by binding, individual arbitration and not in a class,
              representative or consolidated action or proceeding. You and
              MyHomely agree that the appropriate Federal Law and/or Ontario Law
              governs the interpretation and enforcement of these Terms, and
              that you and MyHomely are each waiving the right to a trial by
              jury or to participate in a class action. This arbitration
              provision shall survive termination of these Terms.
            </dt>
            <li> Exceptions and Opt-out </li>
            <dt>
              As limited exceptions to Section 17(a) above: (i) you may seek to
              resolve a Dispute in small claims court if it qualifies; and (ii)
              we each retain the right to seek injunctive or other equitable
              relief from a court to prevent (or enjoin) the infringement or
              misappropriation of our intellectual property rights. In addition,
              you will retain the right to opt out of arbitration entirely and
              litigate any Dispute if you provide us with written notice of your
              desire to do so by email at info@myhomely.io within thirty (30)
              days following the date you first agree to these Terms.
            </dt>

            <li>Conducting Arbitration and Arbitration Rules</li>
            <dt>
              The arbitration will be conducted by the Canadian Arbitration
              Association (“CAA”), except as modified by these Terms. The CAA
              Rules are available at{" "}
              <a href="https://canadianarbitrationassociation.ca/">
                https://canadianarbitrationassociation.ca/
              </a>
              . A party who wishes to start arbitration must submit a written
              Demand for Arbitration to CAA and give notice to the other party
              as specified in the CAA Rules. Detailed information can be
              obtained from{" "}
              <a href="https://canadianarbitrationassociation.ca/">
                https://canadianarbitrationassociation.ca/
              </a>
              .
            </dt>
            <li>Arbitration Costs</li>
            <dt>
              Payment of all filing, administration and arbitrator fees will be
              governed by the CAA Rules. We’ll pay for all filing,
              administration and arbitrator fees and expenses if your Dispute is
              for less than $10,000, unless the arbitrator finds your Dispute
              frivolous. If we prevail in arbitration, we’ll pay all of our
              attorneys’ fees and costs and won’t seek to recover them from you.
              If you prevail in arbitration you will be entitled to an award of
              attorneys’ fees and expenses to the extent provided under
              applicable law.
            </dt>

            <li>Class Action Waiver</li>
            <dt>
              YOU AND MYHOMELY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
              OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A
              PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
              PROCEEDING. Further, if the parties’ dispute is resolved through
              arbitration, the arbitrator may not consolidate another person's
              claims with your claims, and may not otherwise preside over any
              form of a representative or class proceeding. If this specific
              provision is found to be unenforceable, then the entirety of this
              Dispute Resolution section shall be null and void.
            </dt>
            <li>Effect of Changes on Arbitration</li>
            <dt>
              Notwithstanding the provisions of Section 3 “Changes to Terms or
              Services” above, if MyHomely changes any of the terms of this
              Section 17 “Dispute Resolution” after the date you first accepted
              these Terms (or accepted any subsequent changes to these Terms),
              you may reject any such change by sending us written notice by
              email to info@myhomely.io within 30 days of the date such change
              became effective, as indicated in the “Last Updated” date above or
              in the date of MyHomely’s email to you notifying you of such
              change. By rejecting any change, you are agreeing that you will
              arbitrate any Dispute between you and MyHomely in accordance with
              the terms of this Section 17 “Dispute Resolution” as of the date
              you first accepted these Terms (or accepted any subsequent changes
              to these Terms).
            </dt>

            <li>Severability</li>
            <dt>
              With the exception of any of the provisions in Section 17(e) of
              these Terms ("Class Action Waiver"), if an arbitrator or court of
              competent jurisdiction decides that any part of these Terms is
              invalid or unenforceable, the other parts of these Terms will
              still apply.
            </dt>
          </ol>

          <li>General Term </li>
          <ol type="a">
            <li>Entire Agreement</li>
            <dt>
              These Terms constitute the entire and exclusive understanding and
              agreement between MyHomely and you regarding the Services, and
              these Terms supersede and replace any and all prior oral or
              written understandings or agreements between MyHomely and you
              regarding the Services. Notwithstanding the foregoing, you
              acknowledge and agree that these Terms between you and MyHomely
              are an agreement relating to use of the Services and independent
              to any Purchase Agreement or other agreement entered into between
              Buyer and Seller in connection with the purchase, sale, and
              transfer of a Property featured on the Services. If any provision
              of these Terms is held invalid or unenforceable by an arbitrator
              or a court of competent jurisdiction, that provision will be
              enforced to the maximum extent permissible and the other
              provisions of these Terms will remain in full force and effect.
              You may not assign or transfer these Terms, by operation of law or
              otherwise, without MyHomely’s prior written consent. Any attempt
              by you to assign or transfer these Terms, without such consent,
              will be null. MyHomely may freely assign or transfer these Terms
              without restriction. Subject to the foregoing, these Terms will
              bind and inure to the benefit of the parties, their successors and
              permitted assigns.
            </dt>

            <li>Notices</li>
            <dt>
              Any notices or other communications provided by MyHomely under
              these Terms, including those regarding modifications to these
              Terms, will be given: (i) via email; or (ii) by posting to the
              Services. For notices made by e-mail, the date of receipt will be
              deemed the date on which such notice is transmitted.
            </dt>

            <li> Waiver of Rights</li>
            <dt>
              MyHomely’s failure to enforce any right or provision of these
              Terms will not be considered a waiver of such right or provision.
              The waiver of any such right or provision will be effective only
              if in writing and signed by a duly authorized representative of
              MyHomely. Except as expressly set forth in these Terms, the
              exercise by either party of any of its remedies under these Terms
              will be without prejudice to its other remedies under these Terms
              or otherwise.
            </dt>
          </ol>

          <li>Contact Information</li>
          <dt>
            If you have any questions about these Terms or the Services, please
            contact MyHomely info@myhomely.io
          </dt>
        </ol>
      </div>
      <div className={classes.absoluteContainer}>
        <Button
          className={classes.acceptButton}
          disabled={disabled}
          onClick={callback}
        >
          Accept Terms And Conditions
        </Button>
      </div>
    </Dialog>
  );
}
