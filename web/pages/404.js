import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50rem",
      flexDirection: "column",
    },
    image: {
      width: "22rem",
      marginBottom: "-2rem",
    },
    header: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    sub: {
      color: "grey",
      fontSize: "1.25rem",
      maxWidth: "20rem",
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: "1.25rem",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      background: "white",
      padding: "1rem",
      borderRadius: "0.25rem",
      background: "#249FFB",
      color: "white",
    },
  })
);

export default function notFound() {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <div>
          <img src="/login.svg" alt="img" className={classes.image} />
        </div>
        <div className={classes.header}>404</div>
        <div className={classes.sub}>
          Sorry we couldn't find what you were looking for.
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} href="/">
            Back to MyHomely
          </Button>
        </div>
      </div>
    </Layout>
  );
}
