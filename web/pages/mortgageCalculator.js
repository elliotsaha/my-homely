import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import Layout from "../components/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
  },
  inner: {
    display: "flex",
    justifyContent: "center",
  },
  mortgageCalculatorRoot: {
    marginTop: "7.5rem",
    display: "flex",
    justifyContent: "center",
    width: "40rem",
    borderRadius: "0.5rem",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
    padding: "2rem",
    background: "white",
  },
}));

export default function Mortgage() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.mortgageCalculatorRoot}>
            <div>
              <h2> Mortgage payment calculator</h2>

              <div
                class="widget"
                data-widget="calc-payment"
                data-lang="en"
              ></div>

              <script
                type="text/javascript"
                src="https://www.ratehub.ca/assets/js/widget-loader.js"
              ></script>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
