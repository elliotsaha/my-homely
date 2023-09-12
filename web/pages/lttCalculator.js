import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../components/layout";
import { TextField } from "formik-material-ui";
import {
  Button,
  ButtonGroup,
  IconButton,
  MenuItem,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import {
  useFormikContext,
  Formik,
  Form,
  FieldArray,
  FastField,
  Field,
} from "formik";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
  },
  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55rem",
  },
  calculateRoot: {
    width: "37.5rem",
    borderRadius: "0.5rem",
    position: "relative",
    overflow: "hidden",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
    padding: "2rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  currencyTextField: {
    marginTop: "1rem",
    width: "27rem",
    marginBottom: "0.5rem",
    "& > *": {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
  },
  sub: {
    marginTop: "0.25rem",
    fontWeight: "bold",
    color: "grey",
  },
  subSmall: {
    marginTop: "0.25rem",
    fontWeight: "bold",
    color: "grey",
    fontSize: "0.75rem",
  },
  buttonActive: {
    height: "2.5rem",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#249FFB",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#249FFB",
    },
  },
  buttonInactive: {
    height: "2.5rem",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "grey",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },
  buttonActiveLarge: {
    height: "3.5rem",
    fontWeight: "bold",
    width: "9rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#249FFB",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#249FFB",
    },
  },
  buttonInactiveLarge: {
    height: "3.5rem",
    fontWeight: "bold",
    width: "9rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "grey",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },
  flex: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.75rem",
    flexDirection: "column",
  },
  flexRoot: {
    display: "flex",
    flexDirection: "row",
    gap: "3rem",
  },
  calculateButton: {
    marginTop: "2rem",
    height: "3.5rem",
    fontWeight: "bold",
    width: "9rem",
    fontFamily: "Gilroy, sans-serif",
    lineHeight: "1.1rem",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    background: "white",
    color: "#249FFB",
    borderRadius: "0.5rem",
    "&:hover": {
      background: "white",
    },
  },
  price: {
    marginTop: "2rem",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#85bb65",
  },
  propertyError: {
    color: "#FF6961",
    fontWeight: "bold",
    marginTop: "1rem",
  },
}));

export default function LTTCalculator() {
  const classes = useStyles();

  const discountToronto = 8475;
  const discount = 4000;

  const brackets = [
    {
      from: 0,
      to: 55000,
      rate: 0.005,
    },
    {
      from: 55000,
      to: 250000,
      rate: 0.01,
    },
    {
      from: 250000,
      to: 400000,
      rate: 0.015,
    },
    {
      from: 400000,
      to: 2000000,
      rate: 0.02,
    },
    {
      from: 2000000,
      to: 100000000,
      rate: 0.025,
    },
  ];

  function calculate(
    options = { purchasePrice: 0, isToronto: false, firstTimeBuyer: false }
  ) {
    let total = 0;

    if (!options.purchasePrice || Number.isNaN(Number(options.purchasePrice))) {
      return 0;
    }

    let remaining = options.purchasePrice;
    let tax = 0;

    brackets.forEach((bracket, index) => {
      let amount =
        options.purchasePrice > bracket.to
          ? bracket.to - bracket.from
          : remaining;
      tax = amount * bracket.rate;
      total += tax;
      remaining = remaining - amount;
    });

    if (options.isToronto) {
      total = total * 2;
    }

    if (options.firstTimeBuyer) {
      const d = options.isToronto ? discountToronto : discount;
      total = Math.max(0, total - d);
    }

    return total;
  }

  console.log(
    calculate({
      purchasePrice: 1231231,
      isToronto: false,
      firstTimeBuyer: true,
    })
  );

  const ButtonSwitch = ({
    values,
    name,
    setFieldValue,
    firstTitle,
    secondTitle,
    large,
  }) => {
    const stringToObj = name.split(".").reduce((o, i) => o[i], values);
    return (
      <div className={classes.buttonGroupContainer}>
        <ButtonGroup
          disableElevation
          variant="contained"
          color="inherit"
          className={classes.buttonGroup}
        >
          {large ? (
            <Button
              className={
                stringToObj
                  ? classes.buttonActiveLarge
                  : classes.buttonInactiveLarge
              }
              onClick={() => {
                setFieldValue(name, true);
              }}
            >
              {firstTitle ? firstTitle : "Yes"}
            </Button>
          ) : (
            <Button
              className={
                stringToObj ? classes.buttonActive : classes.buttonInactive
              }
              onClick={() => {
                setFieldValue(name, true);
              }}
            >
              {firstTitle ? firstTitle : "Yes"}
            </Button>
          )}
          {large ? (
            <Button
              className={
                stringToObj
                  ? classes.buttonInactiveLarge
                  : classes.buttonActiveLarge
              }
              onClick={() => {
                setFieldValue(name, false);
              }}
            >
              {secondTitle ? secondTitle : "No"}
            </Button>
          ) : (
            <Button
              className={
                stringToObj ? classes.buttonInactive : classes.buttonActive
              }
              onClick={() => {
                setFieldValue(name, false);
              }}
            >
              {secondTitle ? secondTitle : "No"}
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  };

  const CurrencyField = ({ values, setFieldValue, name }) => {
    const stringToObj = name.split(".").reduce((o, i) => o[i], values);
    return (
      <CurrencyTextField
        label="Amount"
        variant="outlined"
        value={stringToObj}
        currencySymbol="$"
        outputFormat="number"
        decimalCharacter="."
        digitGroupSeperator=","
        minimumValue={0}
        decimalPlaces={0}
        className={classes.currencyTextField}
        onChange={(e, val) => {
          setFieldValue(name, val);
        }}
      />
    );
  };

  const inputForm = {
    purchasePrice: 0,
    isToronto: true,
    firstTimeBuyer: true,
  };

  const [finalPrice, setFinalPrice] = useState(null);

  const [error, setError] = useState(false);

  const onSubmit = (values) => {
    let price = calculate(values);
    if (price === 0) {
      setError(true);
      setFinalPrice(null);
    }
    if (price !== 0) {
      setError(false);
      setFinalPrice(price);
    }
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <Formik
            enableReinitialize
            initialValues={inputForm}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
              isValidating,
              isSubmitting,
            }) => {
              return (
                <div className={classes.calculateRoot}>
                  <div className={classes.title}>
                    Calculate Land Transport Tax Costs
                  </div>
                  <div>
                    <div className={classes.sub}>Property Purchase Price</div>
                    <CurrencyField
                      values={values}
                      setFieldValue={setFieldValue}
                      name={"purchasePrice"}
                    />
                  </div>
                  <div className={classes.flexRoot}>
                    <div className={classes.flex}>
                      <div className={classes.sub}>Do You Live In Toronto?</div>
                      <ButtonSwitch
                        values={values}
                        name={"isToronto"}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className={classes.flex}>
                      <div className={classes.sub}>
                        Are You A First Time Buyer?
                      </div>
                      <ButtonSwitch
                        values={values}
                        name={"firstTimeBuyer"}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  <div>
                    <Button
                      className={classes.calculateButton}
                      onClick={() => onSubmit(values)}
                    >
                      Calculate
                    </Button>
                  </div>
                  {error && (
                    <div className={classes.propertyError}>
                      Property Purchase Price Too Low
                    </div>
                  )}
                  <div className={classes.price}>
                    {finalPrice && (
                      <div>
                        <div className={classes.subSmall}>
                          Your Land Transport Tax Price is
                        </div>
                        ${finalPrice.toLocaleString("en")}
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
      ;
    </Layout>
  );
}
