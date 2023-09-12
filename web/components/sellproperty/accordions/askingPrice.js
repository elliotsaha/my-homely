import React, { useEffect, useState } from "react";
import { Field, FastField } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, Slider, InputAdornment } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import formatCash from "../../FormatCash";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import axios from "axios";
import HouseIcon from "@material-ui/icons/House";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  subSelectHeader: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "#08184A",
    fontSize: "1.35rem",
  },
  paraSmall: {
    fontFamily: "Gilroy, sans-serif",
    fontSize: "0.9rem",
    marginRight: "0.25rem",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  biggerHeader: {
    textAlign: "center",
    marginBottom: "0.6rem",
    marginTop: "2rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#08184A",
    fontSize: "2rem",
    fontWeight: "bold",
    lineHeight: "2.5rem",
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
  paraSmall: {
    fontFamily: "Gilroy, sans-serif",
    fontSize: "0.9rem",
    marginRight: "0.25rem",
    marginBottom: "2rem",
  },
  sub: {
    marginTop: "-0.2rem",
    fontWeight: "bold",
    color: "grey",
    fontSize: "1rem",
  },
  inputProps: {
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
  },
  inputContainer: {
    marginTop: "1.25rem",
    marginBottom: "3rem",
  },
  adornment: {
    "& > *": {
      fontFamily: "Gilroy, sans-serif",
    },
  },
  automatedHomeValue: {
    marginBottom: "4rem",
  },
  automatedHomeValue__card: {
    padding: "2rem",
    borderRadius: "0.75rem",
    boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 6px 12px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2.25rem",
    paddingRight: "4rem",
    paddingLeft: "4rem",
  },
  automatedHomeValue__cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
  },
  automatedHomeValue__cardImageContainer: {},
  automatedHomeValue__cardImage: {
    fontSize: "5.35rem",
    color: "#08184A",
  },
  automatedHomeValue__cardTitle: {
    textAlign: "center",
    fontSize: "1.55rem",
    color: "#08184A",
    fontWeight: "bold",
  },
  automatedHomeValue__cardTitleSub: {
    fontSize: "1.1rem",
    textAlign: "center",
    color: "grey",
    fontWeight: "bold",
  },
  automatedHomeValue__cardPrice: {
    fontSize: "1.75rem",
    color: "#38A838",
    fontWeight: "bold",
  },
  automatedHomeValue__cardPriceSm: {
    textAlign: "center",
    fontSize: "1.55rem",
    color: "#38A838",
    fontWeight: "bold",
  },
  currencyField: {
    width: "22.5rem",
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
export default function AskingPrice({
  handleAccordionNext,
  values,
  errors,
  setFieldValue,
  touched,
}) {
  const classes = useStyles();

  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    if (values.PropertyType !== "") {
      let propertyTypeSubmit = 0;
      if (values.PropertyType === "Single Family Detatched") {
        propertyTypeSubmit = 4;
      } else if (values.PropertyType === "Semi Detatched / Bungalow") {
        propertyTypeSubmit = 3;
      } else if (values.PropertyType === "Row House / Row Town House") {
        propertyTypeSubmit = 2;
      } else if (values.PropertyType === "Condo / Apartment") {
        propertyTypeSubmit = 1;
      } else {
        propertyTypeSubmit = 0;
      }

      if (propertyTypeSubmit !== 0) {
        let propertyAge = new Date().getFullYear() - values.YearBuilt;
        console.log("ASKINGPRICE");
        console.log(values);
        axios
          .post(
            "https://0oal6b8ejl.execute-api.us-east-2.amazonaws.com/v1/postalcode",
            {
              password:
                "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
              postalCode: values.PostalCode.replace(/\s/g, ""),
              propertyStyle: propertyTypeSubmit,
            }
          )
          .then((res) => {
            console.log("DATAAAAAAA", res.data);
            if (res.data.statusCode === 200) {
              setEstimate(res.data);
            } else {
              setEstimate(null);
            }
          })
          .catch((err) => {
            setEstimate(null);
            console.log(err);
          });
      }
    }
  }, [values.PropertyType, values.PostalCode]);

  console.log(estimate);

  return (
    <div className={classes.root}>
      <div className={classes.subSelectHeader}>
        It's time to set your asking price.
      </div>
      <div className={classes.paraSmall}>
        Pricing your home right is critical in maximizing your bottom line. If
        you price it too high, it will sit on the market and buyers eventually
        think there is something wrong with it. However, if you price it too
        low, you can either cause a bidding war or possibly miss out on equity.
      </div>

      <div className={classes.flexCenter}>
        <div className={classes.biggerHeader}>Enter Your Asking Price</div>
        <div className={classes.sub}>
          You can easily change this at any time even prior to making it live.
        </div>
        <div className={classes.inputContainer}>
          <CurrencyTextField
            className={classes.currencyField}
            label="Asking Price"
            variant="outlined"
            value={values.AskingPrice}
            onChange={(e, val) => setFieldValue("AskingPrice", val)}
            digitGroupSeparator=","
            currencySymbol="$"
            decimalCharacter="."
            decimalPlaces={0}
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
          />
        </div>

        {estimate && (
          <div className={classes.automatedHomeValue}>
            <div className={classes.biggerHeader}>Automated Home Value</div>
            <div className={classes.automatedHomeValue__cardsContainer}>
              <div className={classes.automatedHomeValue__card}>
                <div className={classes.automatedHomeValue__cardImageContainer}>
                  <HouseIcon
                    className={classes.automatedHomeValue__cardImage}
                  />
                </div>
                <div>
                  <div className={classes.automatedHomeValue__cardTitle}>
                    Value
                  </div>
                  <div className={classes.automatedHomeValue__cardPrice}>
                    ${estimate?.body?.medium.toLocaleString("en")}
                  </div>
                </div>
              </div>
              <div className={classes.automatedHomeValue__card}>
                <div className={classes.automatedHomeValue__cardImageContainer}>
                  <SwapVerticalCircleIcon
                    className={classes.automatedHomeValue__cardImage}
                  />
                </div>
                <div>
                  <div className={classes.automatedHomeValue__cardTitle}>
                    Range
                  </div>
                  <div className={classes.automatedHomeValue__cardPriceSm}>
                    ${estimate?.body?.low.toLocaleString("en")}
                  </div>
                  <div className={classes.automatedHomeValue__cardTitleSub}>
                    to
                  </div>
                  <div className={classes.automatedHomeValue__cardPriceSm}>
                    ${estimate?.body?.high.toLocaleString("en")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(5);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
