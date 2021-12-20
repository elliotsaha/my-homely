import React, { useState } from "react";
import Layout from "./layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    circular: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20rem",
    },
    linear: {},
  })
);

export default function Loading() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.linear}>
          <LinearProgress color="secondary" />
        </div>
        <div className={classes.circular}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    </Layout>
  );
}
