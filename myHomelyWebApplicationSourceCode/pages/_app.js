import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../components/theme";
import { RecoilRoot } from "recoil";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/globals.css";
import "../styles/CardSectionStyles.css";
import App from "next/app";
import TagManager from "react-gtm-module";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_FRONTEND);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const tagManagerArgs = {
      gtmId: "GTM-P8GFMM5",
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My Homely</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=geometry,places`}
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RecoilRoot>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Elements stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
          </MuiPickersUtilsProvider>
        </RecoilRoot>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
