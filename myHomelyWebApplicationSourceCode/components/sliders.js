import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    insightsMultiBar: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      width: "30rem",
      [theme.breakpoints.down("1580")]: {
        width: "20rem",
      },
      [theme.breakpoints.down("1260")]: {
        width: "17rem",
      },
      [theme.breakpoints.down("1167")]: {
        width: "40rem",
      },
      [theme.breakpoints.down("1000")]: {
        width: "35rem",
      },
      [theme.breakpoints.down("900")]: {
        width: "30rem",
      },
      [theme.breakpoints.down("725")]: {
        width: "27rem",
      },
      [theme.breakpoints.down("700")]: {
        width: "22rem",
      },
      [theme.breakpoints.down("400")]: {
        width: "15rem",
      },
    },

    percentFlexContainer: {
      display: "flex",
      justifyContent: "space-between",
      color: "#585a5c",
      fontWeight: "bold",
    },
    percentFlexContainerPercentage: {
      display: "flex",
      justifyContent: "space-between",
      color: "#585a5c",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      fontSize: "1.6rem",
    },
    barSpacer: {
      marginTop: "0.8rem",
      marginBottom: "0.8rem",
    },
    percentTitle: {
      fontSize: "1.1rem",
      color: "#555555",
    },
    percentTitleReverse: {
      fontSize: "1.1rem",
      color: "#555555",
      textAlign: "right",
    },
  })
);
export default function InsightMultiBar({ title1, title2, percent }) {
  const BothWayLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#41E58B",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  const classes = useStyles();
  return (
    <div className={classes.insightsMultiBar}>
      <div className={classes.percentFlexContainer}>
        <div className={classes.percentTitle}>{title1}</div>
        <div className={classes.percentTitleReverse}>{title2}</div>
      </div>
      <div className={classes.percentFlexContainerPercentage}>
        <div>{percent}%</div>
        <div>{100 - percent}%</div>
      </div>
      <BothWayLinearProgress variant="determinate" value={percent} />
    </div>
  );
}
