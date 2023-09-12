import React from "react";
import { makeStyles, IconButton, Button } from "@material-ui/core";
import { Info, ArrowForward } from "@material-ui/icons";
import { TextField } from "formik-material-ui";
import { FastField, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "0.2rem",
  },
  infoHeaderFlex: {
    display: "flex",
    alignItems: "center",
    marginLeft: "0.2rem",
    marginBottom: "0.75rem",
  },
  icon: {
    color: "#08184A",
  },
  inputProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },

  header: {
    marginLeft: "1.25rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#08184A",
    fontSize: "2rem",
    fontWeight: "bold",
    lineHeight: "2.5rem",
    marginBottom: "0.25rem",
    [theme.breakpoints.down("580")]: {
      fontSize: "1.8rem",
      lineHeight: "2.2rem",
      marginBottom: "0.89rem",
    },
    [theme.breakpoints.down("400")]: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      marginBottom: "0.8rem",
    },
  },
  textField: {
    marginTop: "0.8rem",
    marginBottom: "2.5rem",
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
  },
  infoContainer: {
    position: "relative",
    alignItems: "start",
    [theme.breakpoints.down("600")]: {
      display: "none",
    },
    "& div": {
      display: "none",
      position: "absolute",
      opacity: 0,
      zIndex: 9999,
    },
    "&:hover": {
      "& div": {
        marginTop: "2rem",
        opacity: 1,
        display: "block",
        position: "absolute",
        fontFamily: "Gilroy, sans-serif",
        fontSize: "0.75rem",
        width: "20rem",
        color: "white",
        backgroundColor: "#08184A",
        borderRadius: "0.35rem",
        padding: "0.8rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      },
    },
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

export default function OptionalDetails({ handleAccordionNext }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.header}>Describe Property</div>
        <div>
          <IconButton
            aria-label="info"
            disableTouchRipple
            className={classes.infoContainer}
          >
            <Info className={classes.icon} />
            <div>
              This is the property description that will display publicly
              wherever your listing is displayed. It's a good idea to be
              accurate, choose your adjectives carefully, avoid red flags, and
              include words that add value. Since basic info is already
              displayed on the listing page like bed and bath count, you can
              leave that out if you'd like. Be sure to mention any unique
              features or recent upgrades.
            </div>
          </IconButton>
        </div>
      </div>

      <FastField
        component={TextField}
        className={classes.textField}
        name={`PropertyDescription`}
        variant="outlined"
        placeholder={
          "Add a description to give buyers more insight into what your property features and what it's like to live there."
        }
        multiline
        rows={9}
        InputLabelProps={{
          className: classes.inputProps,
        }}
        InputProps={{
          className: classes.inputProps,
        }}
      />

      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(4);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
