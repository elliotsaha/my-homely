import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ChatIcon from "@material-ui/icons/Chat";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Axios from "axios";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#08184A",
      borderRadius: "1.2rem",
      width: "100%",
      flexDirection: "row",
      padding: "2rem",
      gap: "1rem",
    },
    image: {
      marginTop: "1rem",
      marginBottom: "0.75rem",
      borderRadius: "50%",
      objectFit: "cover",
      width: "12rem",
      height: "12rem",
    },
    header: {
      fontSize: "2.1rem",
      fontWeight: "bold",
      fontFamily: "inherit",
    },
    phone: {
      fontSize: "1.6rem",
      fontFamily: "Gilroy, sans-serif",
      paddingTop: "0.5rem",
    },
    email: {
      fontFamily: "Gilroy, sans-serif",
    },
    socials: {
      paddingTop: "0.5rem",
      display: "flex",
      flexDirection: "row",
      gap: "0.8rem",
      "& > *": {
        fontSize: "1.6rem",
      },
    },
  })
);

// TODO: Make component responsive & add information dynamically
export default function SellerCard({ data }) {
  const classes = useStyles();

  React.useEffect(() => {
    console.log("hi");
  }, [data]);
  return (
    <div className={classes.root}>
      <div>
        <img
          src={data.seller}
          alt="building seller"
          className={classes.image}
        />
      </div>
      <div>
        <Typography variant="h3" className={classes.header}>
          {data.sellerName} | {data.sellerPosition}
        </Typography>
        <Typography variant="h5" className={classes.phone}>
          (780) 543-8512
        </Typography>
        <Typography variant="h6" className={classes.email}>
          {data.sentBy}
        </Typography>
        <div className={classes.socials}>
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
          <LinkedInIcon />
        </div>
      </div>
    </div>
  );
}
