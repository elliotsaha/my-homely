import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      height: "50rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    sub: {
      fontSize: "1rem",
      width: "30rem",
      textAlign: "center",
      fontWeight: "bold",
      color: "grey",
    },
    iconContainer: {},
    icon: {
      fontSize: "5rem",
      color: "green",
    },
    buttonContainer: {
      marginTop: "1.5rem",
    },
    button: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#249FFB",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#249FFB",
      },
    },
  })
);

export default function PropertySuccess() {
  const classes = useStyles();

  const router = useRouter();

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.iconContainer}>
          <CheckCircleOutlinedIcon className={classes.icon} />
        </div>
        <div className={classes.header}>Success</div>
        <div className={classes.sub}>
          Your Listing Is Currently Pending Verification Before Being Sent Out
          to All of Our Buyers
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => router.push("/")}>
            Go Back To Homepage
          </Button>
        </div>
      </div>
    </Layout>
  );
}
