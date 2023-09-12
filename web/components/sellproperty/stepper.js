import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  max: {
    maxWidth: "50rem",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
  },
  message: {
    marginTop: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#08184A",
    fontFamily: "Gilroy, sans-serif",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(270deg, #249FFB 4.5%, #15C7DB 94.6%)",
  },
}))(LinearProgress);

export default function stepper({ value, message }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.max}>
        <BorderLinearProgress variant="determinate" value={value} />
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
}
