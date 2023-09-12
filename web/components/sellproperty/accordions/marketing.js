import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import EmailIcon from "@material-ui/icons/Email";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Button } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  inner: {
    display: "flex",
    flexDirection: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginRight: "2rem",
    marginLeft: "2rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  cardContainer: {
    paddingBottom: "1.5rem",
    paddingTop: "1.5rem",
    width: "100%",
    boxShadow:
      "rgb(0 0 0 / 4%) 0px 6px 12px 0px, rgb(0 0 0 / 4%) 0px 0px 0px 1px",
    padding: "1rem",
    borderRadius: "0.75rem",
    textAlign: "center",
    cursor: "pointer",
  },
  cardContainerActive: {
    paddingBottom: "1.5rem",
    paddingTop: "1.5rem",
    width: "100%",
    boxShadow:
      "rgb(0 0 0 / 4%) 0px 6px 12px 0px, rgb(0 0 0 / 4%) 0px 0px 0px 1px",
    padding: "1rem",
    borderRadius: "0.75rem",
    textAlign: "center",
    border: "solid 0.15rem #249FFB",
    cursor: "pointer",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#249FFB",
  },
  pinkTitle: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#E8219C",
  },
  iconContainer: {
    "& > *": {
      fontSize: "3rem",
      color: "#249FFB",
    },
  },
  pinkIconContainer: {
    "& > *": {
      fontSize: "3rem",
      color: "#E8219C",
    },
  },
  price: {
    color: "grey",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  description: {
    maxWidth: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0.5rem",
  },
  greenButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  greenButton: {
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    background: "#249FFB",
    padding: "1rem",
    color: "white",
    fontWeight: "bolder",
    "&:hover": {
      background: "#249FFB",
    },
    [theme.breakpoints.down("1258")]: {
      padding: "0.85rem",
    },
    [theme.breakpoints.down("930")]: {
      padding: "0.65rem",
      fontSize: "0.8rem",
      marginLeft: "0rem",
    },
    [theme.breakpoints.down("350")]: {
      padding: "0.5rem",
      fontSize: "0.8rem",
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    },
  },
}));

export default function Marketing({
  touched,
  errors,
  setFieldValue,
  values,
  handleAccordionNext,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div
          className={
            values.MarketYourHome.emailCampaign
              ? classes.cardContainerActive
              : classes.cardContainer
          }
          onClick={() =>
            setFieldValue(
              "MarketYourHome.emailCampaign",
              !values.MarketYourHome.emailCampaign
            )
          }
        >
          <div className={classes.iconContainer}>
            <EmailIcon />
          </div>
          <div className={classes.title}>Email Campaign</div>
          <div className={classes.price}>$100</div>
          <div className={classes.description}>
            myHomely runs email campaigns to increase your house listing reaches
            to broader range of potential buyers for a quicker sale
          </div>
        </div>

        <div
          className={
            values.MarketYourHome.socialMediaCampaign
              ? classes.cardContainerActive
              : classes.cardContainer
          }
          onClick={() =>
            setFieldValue(
              "MarketYourHome.socialMediaCampaign",
              !values.MarketYourHome.socialMediaCampaign
            )
          }
        >
          <div className={classes.pinkIconContainer}>
            <InstagramIcon />
          </div>
          <div className={classes.pinkTitle}>Social Media Campaign</div>
          <div className={classes.price}>$100</div>
          <div className={classes.description}>
            myHomely runs targeted social media campaigns to increase your house
            listing reaches to broader range of potential buyers for a quicker
            sale
          </div>
        </div>
      </div>

      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(8);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
