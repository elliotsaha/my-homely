import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #CFCFCF",
      borderRadius: "1rem",
      color: "#08184A",
      height: "11rem",

      [theme.breakpoints.down("1500")]: {
        height: "13rem",
      },

      [theme.breakpoints.down("1300")]: {
        width: "20rem",
        height: "auto",
      },
    },
    title: {
      fontSize: "1.2rem",
      maxWidth: "15rem",
      fontWeight: "bold",
      marginBottom: "0.35rem",
      [theme.breakpoints.down("1500")]: {
        maxWidth: "8rem",
      },

      [theme.breakpoints.down("1300")]: {
        maxWidth: "100%",
        width: "100%",
      },
    },
    para: {
      color: "#5f6368",
      fontSize: "0.95rem",
    },
    flexbox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      padding: "1.5rem",
    },
    icon: {
      "& > *": {
        fontSize: "3.25rem",
      },
    },
    seeContext: {
      paddingLeft: "1.5rem",
      paddingTop: "1.25rem",
      paddingBottom: "1.25rem",
      borderTop: "0.15rem solid #CFCFCF",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
    },
  })
);

export default function SeeMoreCard({
  icon,
  title,
  para,
  seeContext,
  contextIndex,
  getIndex,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.flexbox}>
        <div>
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.icon}>{icon}</div>
      </div>

      <div
        className={classes.seeContext}
        onClick={() => {
          getIndex(contextIndex);
        }}
      >
        {seeContext}
      </div>
    </div>
  );
}
