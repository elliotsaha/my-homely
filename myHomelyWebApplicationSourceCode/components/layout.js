import React, { useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { authState, cookiePopover } from "./states.js";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import { loadStripe } from "@stripe/stripe-js";
import GlobalTheme from "../components/globalMUI";

export default function layout({ children, solidNav }) {
  const useStyles = makeStyles((theme) =>
    createStyles({
      snackbarContainer: {
        borderRadius: "0.25rem",
        maxWidth: "20rem",
        padding: "0.7rem",
        fontWeight: "bold",
        background: "white",
        fontFamily: "Gilroy, sans-serif",
        display: "flex",
        flexDirection: "column",
        color: "grey",
      },
      chatBox: {
        fontSize: "0.8rem",
      },
      flexBoxButtonContainer: {
        display: "flex",
        gap: "0.5rem",
      },
      dismissButton: {
        width: "100%",
        marginTop: "1rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        background: "#249FFB",
        color: "white",
        fontFamily: "Gilroy, sans-serif",
        textTransform: "none",
        fontWeight: "bold",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transition: "all 0.25s ease-in-out",
          background: "#249FFB",
          opacity: "90%",
        },
      },
      cookieSettingButton: {
        width: "100%",
        marginTop: "1rem",
        background: "#249FFB",
        color: "white",
        fontFamily: "Gilroy, sans-serif",
        textTransform: "none",
        fontWeight: "bold",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transition: "all 0.25s ease-in-out",
          background: "#249FFB",
          opacity: "90%",
        },
      },
    })
  );
  const classes = useStyles();
  // Dismiss Cookies
  const [cookieDismiss, setCookieDismiss] = useRecoilState(cookiePopover);

  const handleCookiesClose = () => {
    setCookieDismiss(false);
    Cookies.set("dismissedCookies", true);
  };

  // Check Authentication State
  const [authCheck, setAuthCheck] = useRecoilState(authState);
  const authCookie = Cookies.get("auth-token");
  // Call API to check if logged in
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/user/checkiflogged`, {
        token: authCookie,
      })
      .then((res) => {
        if (res.data.auth === true) {
          setAuthCheck(res.data);
        } else {
          setAuthCheck({
            auth: false,
            user: null,
            emailVerified: null,
            phoneVerified: null,
            ID: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cookiesConfirmed, setCookiesConfirmed] = React.useState(true);

  useEffect(() => {
    setCookiesConfirmed(Cookies.get("dismissedCookies"));
  }, []);

  return (
    <React.Fragment>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
      />
      <script src="https://js.stripe.com/v3/"></script>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places`}
      ></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){

window.ldfdr = window.ldfdr || {};
(function(d, s, ss, fs){
  fs = d.getElementsByTagName(s)[0];

  function ce(src){
    var cs  = d.createElement(s);
    cs.src = src;
    setTimeout(function(){fs.parentNode.insertBefore(cs,fs)}, 1);
  }

  ce(ss);
})(document, 'script', 'https://sc.lfeeder.com/lftracker_v1_YEgkB8lWRBvaep3Z.js');
})();
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.pipedriveLeadboosterConfig = {base: 'leadbooster-chat.pipedrive.com',companyId: 7986679,playbookUuid: '5d24122a-2da4-4d91-bcaa-274ae0d7d4e1',version: 2};(function () {var w = window;if (w.LeadBooster) {console.warn('LeadBooster already exists');} else {w.LeadBooster = {q: [],on: function (n, h) {this.q.push({ t: 'o', n: n, h: h });},trigger: function (n) {this.q.push({ t: 't', n: n });},};}})();
          `,
        }}
      />

      <script
        src="https://leadbooster-chat.pipedrive.com/assets/loader.js"
        async
      ></script>
      <Navbar solidNav={solidNav} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
