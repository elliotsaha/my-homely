import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  withStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import {
  IconButton,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../components/states";
import {
  useFormikContext,
  Formik,
  Form,
  FieldArray,
  FastField,
  Field,
} from "formik";
import {
  TextField,
  CheckboxWithLabel,
  SimpleFileUpload,
} from "formik-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createMuiTheme } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  ButtonGroup,
  MenuItem,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
    },
    header: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    muiTabs: {
      marginBottom: "0.25rem",
    },
    muiTabs__tab: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    muiTabs__indicator: {
      backgroundColor: "black",
      borderRadius: "0.25rem",
    },
    tabPanelRoot: {
      fontFamily: "Gilroy, sans-serif",
    },
    card: {
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      padding: "2rem",
      borderRadius: "0.5rem",
      maxWidth: "35rem",
    },
    cardSub: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginTop: "0.5rem",
    },
    streetAddress: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      marginBottom: "0.5rem",
    },
    sentFrom: {
      color: "grey",
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginBottom: "0.75rem",
    },
    address: {
      fontSize: "2rem",
      lineHeight: "2.35rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    dateOffered: {
      color: "grey",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    expires: {
      fontWeight: "bold",
      marginBottom: "0.45rem",
    },
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
    currencyTextField: {
      maxWidth: "20rem",
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },
    acceptedContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.95rem",
      fontWeight: "bold",
    },

    picker: {
      maxWidth: "15rem",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
    },
    flexGapContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    textBold: {
      marginTop: "1rem",
    },
    submitButton: {
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
      marginRight: "0.5rem",
    },
    declineButton: {
      height: "2.5rem",
      border: "0.15rem solid #249FFB",
      color: "grey",
      fontWeight: "bold",
      width: "6rem",
      fontFamily: "Gilroy, sans-serif",
      lineHeight: "1.1rem",
    },
    split: {
      display: "flex",
      gap: "2rem",
    },
  })
);

export default function eContract() {
  const [tabVal, setTabVal] = useState(0);
  const [sellerContracts, setSellerContracts] = useState([]);
  const [buyerContracts, setBuyerContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const authLocalState = useRecoilValue(authState);

  const [refreshCounter, setRefreshCounter] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getSellerContracts`,
        { withCredentials: true }
      )
      .then((res) => setSellerContracts(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [refreshCounter]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getBuyerContracts`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setBuyerContracts(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [refreshCounter]);

  const classes = useStyles();

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

  const inputForm = {
    offerPrice: {
      accepted: true,
      value: 0,
    },
    downPayment: {
      accepted: true,
      value: 0,
    },
    trustAccountDeposit: {
      accepted: true,
      value: 0,
    },
    daysToClose: {
      accepted: true,
      value: new Date(Date.now() + 3600 * 1000 * 24),
    },
  };

  const onSellerSubmit = (values, i) => {
    let allApproved = true;
    Object.values(values).map((i) => {
      if (!i.accepted) {
        allApproved = false;
      }
    });

    if (allApproved) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/accept`,
          {
            type: "seller",
            id: i.econtract._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          setRefreshCounter([...refreshCounter, 1]);
        })
        .catch((err) => console.log(err));
    } else {
      let copyEcontract = { ...i.econtract };
      Object.values(values).map((i, index) => {
        if (!i.accepted) {
          let key = Object.keys(values)[index];
          let offerDetails =
            copyEcontract.offerList[copyEcontract.offerList.length - 1]
              .OfferDetails;
          if (key === "offerPrice") {
            offerDetails.salesPrice = values.offerPrice.value;
          }
          if (key === "downPayment") {
            offerDetails.downPayment = values.downPayment.value;
          }
          if (key === "trustAccountDeposit") {
            offerDetails.trustAccount = values.trustAccountDeposit.value;
          }
          if (key === "daysToClose") {
            offerDetails.daysForTransactionToClose = values.daysToClose.value;
          }
        }
      });
      let lastOfOfferList =
        copyEcontract.offerList[copyEcontract.offerList.length - 1];

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/counterOffer`,
          {
            type: "seller",
            id: i.econtract._id,
            data: lastOfOfferList,
          },
          { withCredentials: true }
        )
        .then((res) => setRefreshCounter([...refreshCounter, 1]))
        .catch((err) => console.log(err));
    }
  };

  const onSellerDecline = (values) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/decline`,
        {
          type: "seller",
          id: values.econtract._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setRefreshCounter([...refreshCounter, 1]);
      })
      .catch((err) => console.log(err));
  };

  const onBuyerSubmit = (values, i) => {
    let allApproved = true;
    Object.values(values).map((i) => {
      if (!i.accepted) {
        allApproved = false;
      }
    });

    if (allApproved) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/accept`,
          {
            type: "buyer",
            id: i.econtract._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          setRefreshCounter([...refreshCounter, 1]);
        })
        .catch((err) => console.log(err));
    } else {
      let copyEcontract = { ...i.econtract };
      Object.values(values).map((i, index) => {
        if (!i.accepted) {
          let key = Object.keys(values)[index];
          let offerDetails =
            copyEcontract.offerList[copyEcontract.offerList.length - 1]
              .OfferDetails;
          if (key === "offerPrice") {
            offerDetails.salesPrice = values.offerPrice.value;
          }
          if (key === "downPayment") {
            offerDetails.downPayment = values.downPayment.value;
          }
          if (key === "trustAccountDeposit") {
            offerDetails.trustAccount = values.trustAccountDeposit.value;
          }
          if (key === "daysToClose") {
            offerDetails.daysForTransactionToClose = values.daysToClose.value;
          }
        }
      });
      let lastOfOfferList =
        copyEcontract.offerList[copyEcontract.offerList.length - 1];

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/counterOffer`,
          {
            type: "buyer",
            id: i.econtract._id,
            data: lastOfOfferList,
          },
          { withCredentials: true }
        )
        .then((res) => setRefreshCounter([...refreshCounter, 1]))
        .catch((err) => console.log(err));
    }
  };

  const onBuyerDecline = (values) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/decline`,
        {
          type: "buyer",
          id: values.econtract._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setRefreshCounter([...refreshCounter, 1]);
      })
      .catch((err) => console.log(err));
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

  const materialDateTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
        toolbar: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
      },
      MuiPickersCalendarHeader: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
        switchHeader: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
      },
      MuiPickersDay: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
        day: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
        daySelected: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
        dayDisabled: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
        current: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
      },
      MuiPickersModal: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
        dialogAction: {
          fontFamily: "Gilroy, sans-serif",
          "& *": {
            fontFamily: "Gilroy, sans-serif",
          },
        },
      },
    },
  });

  return (
    <div className={classes.root}>
      <div className={classes.header}>Documents Repository</div>

      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.split}>
          <div className={classes.tabPanelRoot}>
            {sellerContracts.map((i) => {
              if (
                i.econtract.offerList[i.econtract.offerList.length - 1].sentFrom
                  .email !== authLocalState.user.email
              ) {
                const last =
                  i.econtract.offerList[i.econtract.offerList.length - 1];
                return (
                  <Formik enableReinitialize initialValues={inputForm}>
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
                      useEffect(() => {
                        setFieldValue(
                          "offerPrice.value",
                          last.OfferDetails.salesPrice
                        );
                        setFieldValue(
                          "downPayment.value",
                          last.OfferDetails.downPayment
                        );
                        setFieldValue(
                          "trustAccountDeposit.value",
                          last.OfferDetails.trustAccount
                        );
                      }, []);

                      return (
                        <div className={classes.card}>
                          <div className={classes.address}>
                            {i.property.query.StreetAddress}
                          </div>
                          <div className={classes.dateOffered}>
                            Date Offered:{" "}
                            {moment(i.econtract.Date).format("MMMM Do YYYY")}
                          </div>
                          <div className={classes.expires}>
                            Offer Expires:{" "}
                            {moment(
                              last.OfferDetails
                                .timeToGiveSellerToRespondToThisOffer
                            ).format("MMMM Do YYYY")}
                          </div>
                          <div className={classes.sentFrom}>
                            {last.sentFrom.name} is offering to purchase this
                            property with{" "}
                            {last.OfferDetails.loan ? "a loan" : "cash"}
                          </div>

                          <div className={classes.flexGapContainer}>
                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Offer Price
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.salesPrice.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"offerPrice.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.offerPrice.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Sales Price Would you like to counter
                                  with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"offerPrice.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Down Payment
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.downPayment.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"downPayment.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.downPayment.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Down Payment Price Would you like to
                                  counter with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"downPayment.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Trust Account Deposit
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.trustAccount.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"trustAccountDeposit.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.trustAccountDeposit.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Trust Account Deposit Price Would you
                                  like to counter with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"trustAccountDeposit.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Days To Close
                                </div>
                                <div>
                                  {Math.ceil(
                                    moment
                                      .duration(
                                        moment(
                                          last.OfferDetails
                                            .daysForTransactionToClose
                                        ).diff(new Date())
                                      )
                                      .asDays()
                                  )}{" "}
                                  {Math.ceil(
                                    moment
                                      .duration(
                                        moment(
                                          last.OfferDetails
                                            .daysForTransactionToClose
                                        ).diff(new Date())
                                      )
                                      .asDays()
                                  ) === 1
                                    ? "day"
                                    : "days"}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"daysToClose.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>

                            {!values.daysToClose.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Closing Date Would you like to counter
                                  with?
                                </div>
                                <div>
                                  <ThemeProvider theme={materialDateTheme}>
                                    <KeyboardDatePicker
                                      value={values.daysToClose.value}
                                      onChange={(date) =>
                                        setFieldValue("daysToClose.value", date)
                                      }
                                      minDate={
                                        new Date(Date.now() + 3600 * 1000 * 24)
                                      }
                                      className={classes.picker}
                                      format="dd/MM/yyyy"
                                      inputVariant="outlined"
                                      variant="inline"
                                      maxDate={moment(new Date()).add(180, "d")}
                                    />

                                    <div className={classes.textBold}>
                                      This transaction will close in{" "}
                                      {Math.ceil(
                                        moment
                                          .duration(
                                            moment(
                                              values.daysToClose.value
                                            ).diff(new Date())
                                          )
                                          .asDays()
                                      )}{" "}
                                      {Math.ceil(
                                        moment
                                          .duration(
                                            moment(
                                              values.daysToClose.value
                                            ).diff(new Date())
                                          )
                                          .asDays()
                                      ) === 1
                                        ? "day"
                                        : "days"}{" "}
                                    </div>
                                  </ThemeProvider>
                                </div>
                              </div>
                            )}

                            <div>
                              <Button
                                type="button"
                                className={classes.submitButton}
                                onClick={() => onSellerSubmit(values, i)}
                              >
                                Submit
                              </Button>
                              <Button
                                type="button"
                                className={classes.declineButton}
                                onClick={() => onSellerDecline(i)}
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Formik>
                );
              }
            })}
          </div>
          <div className={classes.tabPanelRoot}>
            {buyerContracts.map((i) => {
              if (
                i.econtract.offerList[i.econtract.offerList.length - 1].sentFrom
                  .email !== authLocalState.user.email
              ) {
                const last =
                  i.econtract.offerList[i.econtract.offerList.length - 1];
                return (
                  <Formik enableReinitialize initialValues={inputForm}>
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
                      useEffect(() => {
                        setFieldValue(
                          "offerPrice.value",
                          last.OfferDetails.salesPrice
                        );
                        setFieldValue(
                          "downPayment.value",
                          last.OfferDetails.downPayment
                        );
                        setFieldValue(
                          "trustAccountDeposit.value",
                          last.OfferDetails.trustAccount
                        );
                      }, []);

                      return (
                        <div className={classes.card}>
                          <div className={classes.address}>
                            {i.property.query.StreetAddress}
                          </div>
                          <div className={classes.dateOffered}>
                            Date Offered:{" "}
                            {moment(i.econtract.Date).format("MMMM Do YYYY")}
                          </div>
                          <div className={classes.expires}>
                            Offer Expires:{" "}
                            {moment(
                              last.OfferDetails
                                .timeToGiveSellerToRespondToThisOffer
                            ).format("MMMM Do YYYY")}
                          </div>
                          <div className={classes.sentFrom}>
                            {last.sentFrom.name} is offering to purchase this
                            property with{" "}
                            {last.OfferDetails.loan ? "a loan" : "cash"}
                          </div>

                          <div className={classes.flexGapContainer}>
                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Offer Price
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.salesPrice.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"offerPrice.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.offerPrice.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Sales Price Would you like to counter
                                  with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"offerPrice.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Down Payment
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.downPayment.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"downPayment.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.downPayment.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Down Payment Price Would you like to
                                  counter with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"downPayment.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Trust Account Deposit
                                </div>
                                <div>
                                  $
                                  {last.OfferDetails.trustAccount.toLocaleString(
                                    "en"
                                  )}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"trustAccountDeposit.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>
                            {!values.trustAccountDeposit.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Trust Account Deposit Price Would you
                                  like to counter with?
                                </div>
                                <div>
                                  <CurrencyField
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    name={"trustAccountDeposit.value"}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={classes.flex}>
                              <div>
                                <div className={classes.cardSub}>
                                  Days To Close
                                </div>
                                <div>
                                  {Math.ceil(
                                    moment
                                      .duration(
                                        moment(
                                          last.OfferDetails
                                            .daysForTransactionToClose
                                        ).diff(new Date())
                                      )
                                      .asDays()
                                  )}{" "}
                                  {Math.ceil(
                                    moment
                                      .duration(
                                        moment(
                                          last.OfferDetails
                                            .daysForTransactionToClose
                                        ).diff(new Date())
                                      )
                                      .asDays()
                                  ) === 1
                                    ? "day"
                                    : "days"}
                                </div>
                              </div>
                              <div>
                                <ButtonSwitch
                                  values={values}
                                  name={"daysToClose.accepted"}
                                  setFieldValue={setFieldValue}
                                  firstTitle="Accepted"
                                  secondTitle="Counter"
                                />
                              </div>
                            </div>

                            {!values.daysToClose.accepted && (
                              <div className={classes.acceptedContainer}>
                                <div>
                                  What Closing Date Would you like to counter
                                  with?
                                </div>
                                <div>
                                  <ThemeProvider theme={materialDateTheme}>
                                    <KeyboardDatePicker
                                      value={values.daysToClose.value}
                                      onChange={(date) =>
                                        setFieldValue("daysToClose.value", date)
                                      }
                                      minDate={
                                        new Date(Date.now() + 3600 * 1000 * 24)
                                      }
                                      className={classes.picker}
                                      format="dd/MM/yyyy"
                                      inputVariant="outlined"
                                      variant="inline"
                                      maxDate={moment(new Date()).add(180, "d")}
                                    />

                                    <div className={classes.textBold}>
                                      This transaction will close in{" "}
                                      {Math.ceil(
                                        moment
                                          .duration(
                                            moment(
                                              values.daysToClose.value
                                            ).diff(new Date())
                                          )
                                          .asDays()
                                      )}{" "}
                                      {Math.ceil(
                                        moment
                                          .duration(
                                            moment(
                                              values.daysToClose.value
                                            ).diff(new Date())
                                          )
                                          .asDays()
                                      ) === 1
                                        ? "day"
                                        : "days"}{" "}
                                    </div>
                                  </ThemeProvider>
                                </div>
                              </div>
                            )}

                            <div>
                              <Button
                                type="button"
                                className={classes.submitButton}
                                onClick={() => onBuyerSubmit(values, i)}
                              >
                                Submit
                              </Button>
                              <Button
                                type="button"
                                className={classes.declineButton}
                                onClick={() => onBuyerDecline(i)}
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Formik>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
