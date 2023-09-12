import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import formatCash from "../FormatCash";

import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
const useStyles = makeStyles((theme) =>
  createStyles({
    insights: {
      marginTop: "2.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginRight: "1.5rem",
      marginBottom: "1.25rem",
    },

    neighborHoodInsightsTitle: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginTop: "1.6rem",
      lineHeight: "3rem",
    },

    demographicRoot: {
      width: "65rem",
    },

    demographicSub: {
      fontFamily: "Gilroy, sans-serif",
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#08184A",
      marginTop: "0.9rem",
      marginBottom: "1rem",
    },

    staticSliderGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "#08184A",
      width: "100%",
      fontSize: "1.25rem",
      "& > div:nth-child(2)": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& > div:nth-child(3)": {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },

    colorRed: {
      color: "#D13C3C",
      fontSize: "1.2rem",
    },
    colorGreen: {
      color: "#4DC298",
      fontSize: "1.2rem",
    },

    staticColorSlider: {
      backgroundImage:
        "linear-gradient(.25turn, #DA815B, #E0C76C, #55CB84, #55CB84,#22BE69, #048C41, #22BE69, #55CB84, #55CB84, #E0C76C, #DA815B)",
      height: "0.5rem",
      borderRadius: "0.5rem",
      width: "100%",
      opacity: "55%",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
    flexIndividual: {
      display: "flex",
      gap: "0.5rem",
    },
    flexCollectiveSpace: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      gap: "5rem",
      marginTop: "1rem",
      color: "#08184A",
      marginBottom: "2rem",
    },
    individualIcon: {
      fontSize: "2rem",
      verticalAlign: "middle",
    },
    avgRPSCounter: {
      verticalAlign: "middle",
      marginTop: "0.3rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
  })
);
export default function PriceInsights({ data }) {
  const rpsData = data.proximity.data;

  console.log(rpsData[0]);
  const classes = useStyles();
  return (
    <div className={classes.insights}>
      <div className={classes.demographicRoot}>
        <div className={classes.neighborHoodInsightsTitle}>
          Price Insights In This Area
        </div>
        <div className={classes.demographicSub}>
          Single Family Detached Homes
        </div>
        <div className={classes.staticSliderGrid}>
          <div>Lowerbound Price</div>
          <div>Average Price</div>
          <div>Higherbound Price</div>
        </div>
        <div className={classes.staticColorSlider} />
        <div className={classes.staticSliderGrid}>
          <div className={classes.colorRed}>{formatCash(rpsData[0])}</div>
          <div className={classes.colorGreen}>{formatCash(rpsData[1])}</div>
          <div className={classes.colorRed}>{formatCash(rpsData[2])}</div>
        </div>
        <div className={classes.flexCollectiveSpace}>
          <div className={classes.flexIndividual}>
            <div>
              <HotelIcon className={classes.individualIcon} />
            </div>
            <div className={classes.avgRPSCounter}>{rpsData[3]}</div>
          </div>
          <div className={classes.flexIndividual}>
            <div>
              <BathtubIcon className={classes.individualIcon} />
            </div>
            <div className={classes.avgRPSCounter}>{rpsData[4]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
