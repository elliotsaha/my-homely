import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
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
import {
  Button,
  ButtonGroup,
  IconButton,
  MenuItem,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Link from "next/link";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DescriptionIcon from "@material-ui/icons/Description";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Select, RadioGroup } from "formik-material-ui";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import * as Yup from "yup";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import moment from "moment";
import { Slider } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      color: "#249FFB",
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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
    },
    paper: {
      padding: "3rem",
      maxWidth: "60rem",
      borderRadius: "0.35rem",
      fontFamily: "Gilroy, sans-serif",
    },
    card: {},
    header: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "bold",
      fontSize: "1.6rem",
    },
    icon: {
      fontSize: "2rem",
      marginBottom: "0.25rem",
    },
    line: {
      width: "100%",
      height: "0.1rem",
      background: "grey",
      opacity: "20%",
      marginTop: "0.5rem",
      marginBottom: "1.25rem",
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
    title: {
      fontWeight: "bold",
      fontSize: "1.05rem",
      marginTop: "0.25rem",
      maxWidth: "40rem",
    },
    titleMax: {
      fontWeight: "bold",
      fontSize: "1.05rem",
      marginTop: "0.25rem",
      maxWidth: "20rem",
    },
    titleMaxShort: {
      fontWeight: "bold",
      fontSize: "1.05rem",
      marginTop: "0.25rem",
      maxWidth: "17rem",
    },
    para: {
      marginBottom: "1.25rem",
    },
    paraNoGap: {
      marginBottom: "0.25rem",
    },
    depositDetails: {
      fontWeight: "bold",
      color: "grey",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    removeButton: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #249FFB",
      padding: "0.25rem",
      color: "#249FFB",
      fontWeight: "bolder",
    },
    blueFillButton: {
      border: "0.1rem solid #249FFB",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#249FFB",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#249FFB",
      },
    },

    blueFillButtonSubmit: {
      border: "0.1rem solid #249FFB",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#249FFB",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      width: "8rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    textBold: {
      fontWeight: "bold",
      color: "grey",
    },
    blueFillButtonNext: {
      border: "0.1rem solid #249FFB",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#249FFB",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      width: "5rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    blueOutlineButtonBack: {
      border: "0.1rem solid #249FFB",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "white",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      width: "5rem",
      marginRight: "0.5rem",
      color: "#249FFB",
    },
    addBuyersFieldContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "0.75rem",
    },
    fourPeopleDisclaimer: {
      marginTop: "0.5rem",
      fontWeight: "bold",
      color: "#A4A4A4",
    },
    agentDetails: {
      marginTop: "1.25rem",
    },
    agentGrid: {
      marginTop: "0.55rem",
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gridTemplateRows: "1fr 1fr 1fr",
      gap: "0.5rem",
    },
    agentField: {
      width: "21rem",
    },
    currencyTextField: {
      maxWidth: "20rem",
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },

    currencyTextFieldLong: {
      width: "23rem",
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },

    checkbox: {
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },
    greyCheckbox: {
      "& > *": {
        maxWidth: "40rem",
        color: "grey",
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },
    select: {
      width: "9rem",
      "& > *": {
        fontFamily: "Gilroy, sans-serif",
      },
    },
    flexGap: {
      display: "flex",
      gap: "1.2rem",
      flexDirection: "column",
    },

    flexGapWithMarginTop: {
      marginTop: "0.8rem",
      display: "flex",
      gap: "0.9rem",
      flexDirection: "column",
    },

    flexGapLarge: {
      display: "flex",
      gap: "2rem",
      flexDirection: "column",
    },
    photoRoot: {
      display: "flex",
      gap: "1rem",
      flexDirection: "column",
      marginTop: "0.75rem",
    },
    photoContainer: {
      background: "#f3f6f8",
      padding: "1.5rem",
      paddingBottom: "0.75rem",
      paddingTop: "0.75rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: "0.5rem",
    },
    iconWithImagePhotos: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      fontWeight: "bold",
    },
    photoIcon: {
      marginRight: "0.75rem",
    },
    photoIconTag: {
      background: "#D5D7D9",
      padding: "0.5rem",
      fontSize: "2.5rem",
      borderRadius: "50%",
    },
    sellerCreditToBuyer: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    loanContingency: {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    bestTimeText: {
      fontSize: "0.7rem",
      maxWidth: "20rem",
      color: "grey",
      fontWeight: "bold",
    },
    selectContainer: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    toolTipContainer: {
      marginTop: "0.75rem",
    },
    toolTipIcon: {
      fontSize: "1.7rem",
      color: "#249FFB",
    },
    spacer: {
      marginTop: "1rem",
    },
    picker: {
      maxWidth: "15rem",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
    },
    letterToSeller: {
      width: "100%",
    },
    submitContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    saleContingency: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    saleContingencyEmail: {
      marginBottom: "0.5rem",
    },
    saleContingencyTitleContainer: {
      marginBottom: "0.6rem",
      marginTop: "0.75rem",
    },
    trustGap: {
      marginBottom: "0.45rem",
    },
    saleContingencyTextContainer: {
      marginBottom: "0.5rem",
    },
    stepLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    valueLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",

      "& *": {
        background: "#249FFB",
        color: "white",
      },
    },
    stepIconContainer: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    label: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    a3digital: {
      fontWeight: "bold",
      marginTop: "-0.25rem",
      marginBottom: "0.45rem",
      color: "grey",
    },
    lawyerContainer: {
      marginTop: "0.5rem",
      display: "flex",
      gap: "1rem",
    },
    sliderContainer: {
      maxWidth: "20rem",
    },
    cashBack: {
      marginTop: "-0.5rem",
      fontWeight: "bold",
      color: "grey",
    },
    flexSeperator: {
      display: "flex",
      gap: "7rem",
    },
    offerSentRoot: {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    checkCircleOfferSent: {
      fontSize: "3rem",
      color: "#32CD32",
    },
    offerSentHeader: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    offerSentPara: {
      maxWidth: "20rem",
      fontSize: "1.1rem",
    },
    flexUp: {
      marginTop: "0.5rem",
      display: "flex",
      gap: "0.5rem",
      width: "21.5rem",
      flexDirection: "column",
    },
    shortText: {
      color: "grey",
      fontWeight: "bold",
      fontSize: "0.85rem",
    },
    link: {
      color: "#249FFB",
      display: "inline",
    },
    flexSub: {
      display: "flex",
      alignItems: "center",
    },
    toolTipGap: {
      marginBottom: "1.2rem",
      marginLeft: "0.5rem",
    },
    tooltip: {
      fontFamily: "Gilroy, sans-serif",
    },
    mustAcknowledge: {
      marginTop: "-1rem",
      color: "#ff6961",
      fontWeight: "bold",
    },
    uploadError: {
      color: "red",
      marginTop: "0.5rem",
      fontWeight: "bold",
    },
    submitContainerError: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    fixErrorsContainer: {
      color: "red",
      fontWeight: "bold",
    },
  })
);

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

const stepperTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiStepIcon: {
      root: {
        "&$completed": {
          fill: "#249FFB",
        },
        "&$active": {
          fill: "#249FFB",
          "& $text": {
            fill: "white",
          },
        },
      },
      text: {
        fill: "#D3D3D3",
      },
    },
  },
});

export default function EContractModal({
  buyerEmail,
  sellerEmail,
  state,
  setState,
  propertyData,
}) {
  const authLocalState = useRecoilValue(authState);
  const router = useRouter();

  /*
  if (authLocalState !== null && authLocalState.auth === false && state) {
    router.push("/login");
  }
    * */
  const classes = useStyles();

  const validation = Yup.object().shape({
    buyers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
      })
    ),
    Acknowledged: Yup.boolean().oneOf(
      [true],
      "Must Acknowledge Before Continuing"
    ),
    AgentDetails: Yup.object().shape({
      boolean: Yup.boolean(),
      agentName: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),

      agentLicence: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),

      agentEmail: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),

      agentBrokerageName: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),

      agentBrokerageLicence: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),

      agentPhone: Yup.string().when("boolean", {
        is: true,
        then: Yup.string().required("Required"),
      }),
      agentPercentage: Yup.number().when("boolean", {
        is: true,
        then: Yup.number()
          .required("Required")
          .positive("Value Must Be Positive"),
      }),
    }),
    Lawyer: Yup.object().shape({
      boolean: Yup.boolean(),
      email: Yup.string().when("boolean", {
        is: true,
        then: Yup.string("Must Be String").required("Required"),
      }),
      phoneNumber: Yup.string().when("boolean", {
        is: true,
        then: Yup.string("Must Be String").required("Required"),
      }),
    }),
    FinancingCondition: Yup.object(),
    OfferDetails: Yup.object().shape({
      loan: Yup.boolean().required(),
      salesPrice: Yup.number("Invalid")
        .positive("Value Must Be Positive")
        .required("Required"),
      downPayment: Yup.number("Invalid").when("loan", {
        is: true,
        then: Yup.number("Invalid")
          .required("Required Down payment")
          .positive("Value Must Be Positive"),
      }),

      trustAccount: Yup.number("Invalid")
        .required("Required")
        .positive("Value Must Be Positive"),
      uploadProofOfFunds: Yup.array().when("loan", {
        is: false,
        then: Yup.array().test(
          "Under",
          "Please Atleast have one proof of funding",
          function (value) {
            if (value.length < 1) {
              return false;
            } else {
              return true;
            }
          }
        ),
      }),
    }),
    LoanContingency: Yup.object(),
    SellerCreditToBuyer: Yup.object(),
    AppraisalContingency: Yup.object(),
    PropertyInspectionContingency: Yup.object(),
    SaleContingency: Yup.object(),
    HomeWarranty: Yup.object(),
    IncludedAppliancesAndOtherProperty: Yup.array(),
    OtherConditions: Yup.string(),
    cashBack: Yup.number(),
    survey: Yup.object(),
  });

  const [inputForm, setInputForm] = useState({
    buyers: [{ name: "", email: "" }],
    Acknowledged: false,
    AgentDetails: {
      boolean: false,
      agentName: "",
      agentLicence: "",
      agentEmail: "",
      agentBrokerageName: "",
      agentBrokerageLicence: "",
      agentPhone: "",
      agentPercentage: "",
    },
    Lawyer: {
      boolean: false,
      email: "",
      phoneNumber: "",
    },
    FinancingCondition: {
      bool: true,
      date: new Date(Date.now() + 3600 * 1000 * 24),
    },
    OfferDetails: {
      salesPrice: propertyData?.query?.AskingPrice,
      loan: true,
      // LOAN OPTIONS
      preApproved: "true",
      // qualifyForPreApproval: false,
      downPayment: "",
      downPaymentPercentage: 5,
      trustAccount: "",
      daysForTransactionToClose: new Date(Date.now() + 3600 * 1000 * 24),
      timeToGiveSellerToRespondToThisOffer: new Date(
        Date.now() + 3600 * 1000 * 24
      ), // HOURS
      // CASH OPTIONS
      uploadProofOfFunds: [],
      eTransfer: true,
    },
    LoanContingency: {
      boolean: false,
      daysForApproval: new Date(Date.now() + 3600 * 1000 * 24),
    },
    SellerCreditToBuyer: {
      boolean: false,
      request: "",
    },
    AppraisalContingency: {
      boolean: false,
      daysForAppraisal: new Date(Date.now() + 3600 * 1000 * 24),
    },
    PropertyInspectionContingency: {
      boolean: false,
      propertyInspection: new Date(Date.now() + 3600 * 1000 * 24),
      propertyInspectionSellerCover: false,
    },
    SaleContingency: {
      boolean: false,
      timeWithProperty: new Date(Date.now() + 3600 * 1000 * 24),
      scheduledClosingDate: new Date(Date.now() + 3600 * 1000 * 24),
    },
    HomeWarranty: {
      boolean: false,
      priceForSeller: 500,
    },
    IncludedAppliancesAndOtherProperty: [{ itemName: "" }],
    OtherConditions: "",
    cashBack: 2.2,
    survey: {
      boolean: false,
      date: new Date(Date.now() + 3600 * 1000 * 24),
    },
  });

  useEffect(() => {
    if (propertyData) {
      let copy = { ...inputForm };
      copy.OfferDetails.salesPrice = propertyData.query.AskingPrice;
      copy.buyers[0].name = authLocalState?.user?.name;
      copy.buyers[0].email = authLocalState?.user?.email;
      setInputForm(copy);
    }
  }, [propertyData, authLocalState]);

  const [openAgentCommissionTooltip, setOpenAgentCommisionTooltip] = useState(
    false
  );

  const SmCard = ({ header, title, para, children, icon }) => {
    return (
      <div className={classes.card}>
        <div className={classes.header}>
          {icon}
          <div>{header}</div>
        </div>
        <div className={classes.line} />

        <div className={classes.title}>{title}</div>
        <div className={classes.para}>{para}</div>
        {children}
      </div>
    );
  };

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

  const AddBuyers = ({ arrValue, stringValue }) => {
    return (
      <FieldArray
        name={arrValue}
        render={(arrayHelpers) => (
          <div>
            {arrValue.map((i, index) => {
              return (
                <div className={classes.addBuyersFieldContainer}>
                  <Field
                    component={TextField}
                    name={`${stringValue}.${index}.name`}
                    label="Name"
                    placeholder="Full Legal Name"
                    InputProps={{
                      className: classes.inputProps,
                    }}
                    InputLabelProps={{
                      className: classes.inputProps,
                    }}
                    variant="outlined"
                    className={classes.field}
                  />
                  <Field
                    component={TextField}
                    name={`${stringValue}.${index}.email`}
                    label="Email Address"
                    placeholder="Email Address"
                    InputProps={{
                      className: classes.inputProps,
                    }}
                    InputLabelProps={{
                      className: classes.inputProps,
                    }}
                    variant="outlined"
                    className={classes.field}
                  />

                  {index > 0 && (
                    <div>
                      <IconButton
                        className={classes.removeButton}
                        onClick={() => {
                          arrayHelpers.remove(index);
                          arrValue.splice(index, 1)[0];
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              );
            })}
            <div>
              <Button
                onClick={() => {
                  arrValue.push({});
                  arrayHelpers.push({
                    name: "",
                    email: "",
                  });
                }}
                className={classes.blueFillButton}
                endIcon={<AddIcon />}
                disabled={arrValue.length >= 4 ? true : false}
              >
                Add Owners
              </Button>
              {arrValue.length >= 4 && (
                <div className={classes.fourPeopleDisclaimer}>
                  You can only add up to four people
                </div>
              )}
            </div>
          </div>
        )}
      />
    );
  };

  const TextFieldShort = ({
    name,
    label,
    placeholder,
    className,
    type,
    max,
    min,
    multiline,
    rows,
  }) => {
    return (
      <Field
        component={TextField}
        name={name}
        label={label}
        placeholder={placeholder}
        type={type ? type : "string"}
        InputProps={{
          className: classes.inputProps,
          inputProps: {
            max: max,
            min: min,
          },
        }}
        InputLabelProps={{
          className: classes.inputProps,
        }}
        variant="outlined"
        className={className}
        multiline={multiline}
        rows={rows}
      />
    );
  };

  const CurrencyField = ({
    values,
    setFieldValue,
    name,
    label,
    percentage,
    maxVal,
    decimalPlaces,
    long,
    onChange,
    maxWidth,
    error,
    helperText,
  }) => {
    const stringToObj = name.split(".").reduce((o, i) => o[i], values);
    return (
      <>
        <CurrencyTextField
          maxWidth={maxWidth ? maxWidth : false}
          label={label ? label : "Amount"}
          variant="outlined"
          value={stringToObj}
          currencySymbol={percentage ? "%" : "$"}
          outputFormat="number"
          decimalCharacter="."
          digitGroupSeperator=","
          minimumValue={0}
          maximumValue={maxVal ? maxVal : 99999999999}
          decimalPlaces={decimalPlaces ? decimalPlaces : 0}
          error={error ? error : false}
          helperText={helperText ? helperText : ""}
          className={
            long ? classes.currencyTextFieldLong : classes.currencyTextField
          }
          onChange={(e, val) => {
            setFieldValue(name, val);
            if (onChange) {
              onChange();
            }
          }}
        />
      </>
    );
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Basic Details",
    "Offer Details 1/2",
    "Offer Details 2/2",
    "Offer Conditions",
    "Other Conditions",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const DateField = ({
    value,
    setFieldValue,
    maxDate,
    minDate,
    stringVal,
    sentanceStart,
  }) => {
    return (
      <ThemeProvider theme={materialDateTheme}>
        <KeyboardDatePicker
          value={value}
          onChange={(date) => setFieldValue(stringVal, date)}
          minDate={minDate ? minDate : new Date(Date.now() + 3600 * 1000 * 24)}
          className={classes.picker}
          format="dd/MM/yyyy"
          inputVariant="outlined"
          variant="inline"
          maxDate={maxDate ? maxDate : moment(new Date()).add(180, "d")}
        />
        <div className={classes.textBold}>
          {sentanceStart}{" "}
          {Math.ceil(moment.duration(moment(value).diff(new Date())).asDays())}{" "}
          {Math.ceil(
            moment.duration(moment(value).diff(new Date())).asDays()
          ) === 1
            ? "day"
            : "days"}{" "}
        </div>
      </ThemeProvider>
    );
  };

  const [offerSent, setOfferSent] = useState(false);
  const [fixErrors, setFixErrors] = useState(false);

  const onSubmit = (values) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/submitInitialForm`,
        {
          propertyId: propertyData?._id,
          query: values,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setState(false);
        setOfferSent(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Dialog
        open={offerSent}
        onClose={() => setOfferSent(false)}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.offerSentRoot}>
          <div>
            <CheckCircleOutlineIcon className={classes.checkCircleOfferSent} />
          </div>
          <div className={classes.offerSentHeader}>Offer Sent!</div>
          <div className={classes.offerSentPara}>
            We've sent your offer to the seller for them to review. You will
            recieve an update when the seller responds.
          </div>
        </div>
      </Dialog>
      <Dialog
        open={state}
        onClose={() => setState(false)}
        classes={{ paper: classes.paper }}
      >
        <Formik
          enableReinitialize
          initialValues={inputForm}
          validationSchema={validation}
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
            useEffect(() => {
              setActiveStep(0);
            }, []);
            return (
              <Form>
                <div className={classes.root}>
                  <ThemeProvider theme={stepperTheme}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel
                            classes={{
                              label: classes.stepLabel,
                              iconContainer: classes.stepIconContainer,
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </ThemeProvider>
                  {activeStep === 0 && (
                    <div className={classes.flexGapLarge}>
                      <SmCard
                        header="Buyer Details"
                        title="Who is the buyer of this transaction"
                        icon={<GroupAddIcon className={classes.icon} />}
                        para="This information will be used on the Purchase Agreement, so be sure to enter your full legal name."
                      >
                        <AddBuyers
                          arrValue={values.buyers}
                          stringValue="buyers"
                        />
                      </SmCard>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="Acknowledged"
                        Label={{
                          label: (
                            <div>
                              I acknowledge that I am starting an offer to buy
                              this property and have agreed to myHomely's{" "}
                              <Link
                                href="/termsofuse"
                                target="_blank"
                                className={classes.link}
                              >
                                <div className={classes.link}>Terms of Use</div>
                              </Link>
                              ,{" "}
                              <Link
                                href="/copyRight"
                                target="_blank"
                                className={classes.link}
                              >
                                <div className={classes.link}>
                                  Copyright Policy
                                </div>
                              </Link>
                              , and{" "}
                              <Link
                                href="/iPurchaseAgreement"
                                target="_blank"
                                className={classes.link}
                              >
                                <div className={classes.link}>
                                  iPurchase Agreement
                                </div>
                              </Link>
                            </div>
                          ),
                          className: classes.greyCheckbox,
                        }}
                      />

                      <div className={classes.mustAcknowledge}>
                        {!values.Acknowledged
                          ? "Must Acknowledge Before Continuing"
                          : null}
                      </div>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div
                      header="Offer Details"
                      title="What Sales Price Are You offering the Seller"
                      icon={<DescriptionIcon className={classes.icon} />}
                    >
                      <div className={classes.header}>
                        <DescriptionIcon className={classes.icon} />
                        <div>Offer Details</div>
                      </div>
                      <div className={classes.line} />

                      <div className={classes.flexSeperator}>
                        <div className={classes.flexGap}>
                          <div className={classes.titleMaxShort}>
                            What is your Offer Sale Price
                          </div>
                          <CurrencyField
                            values={values}
                            setFieldValue={setFieldValue}
                            name={"OfferDetails.salesPrice"}
                            error={errors?.OfferDetails?.salesPrice}
                            helperText={errors?.OfferDetails?.salesPrice}
                          />
                        </div>
                        <div className={classes.flexGap}>
                          <div className={classes.titleMax}>
                            Your Preferred Closing Date?
                          </div>

                          <DateField
                            value={
                              values.OfferDetails.daysForTransactionToClose
                            }
                            setFieldValue={setFieldValue}
                            stringVal="OfferDetails.daysForTransactionToClose"
                            sentanceStart="This transaction will close in"
                          />
                        </div>
                      </div>

                      <div className={classes.flexGap}>
                        <div className={classes.flexSeperator}></div>
                        <div className={classes.title}>
                          How would you like to pay for this property?
                        </div>
                        <ButtonSwitch
                          values={values}
                          name={"OfferDetails.loan"}
                          setFieldValue={setFieldValue}
                          firstTitle="Loan"
                          secondTitle="Cash"
                        />
                        {values.OfferDetails.loan && (
                          <div className={classes.flexGap}>
                            <Field
                              component={RadioGroup}
                              name="OfferDetails.preApproved"
                            >
                              <FormControlLabel
                                value="true"
                                control={<Radio disabled={isSubmitting} />}
                                label="I have a preapproval from a lender"
                                classes={{ label: classes.label }}
                              />
                              <FormControlLabel
                                value="false"
                                control={<Radio disabled={isSubmitting} />}
                                label="I don't have a preapproval yet"
                                classes={{ label: classes.label }}
                              />
                            </Field>
                            {/*
                            <div>
                              <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="qualifyForPreApproval"
                                Label={{
                                  label: "Qualify for Mortgage Pre-approval",
                          className: classes.greyCheckbox,
                                }}
                            </div>
                            */}
                            <div className={classes.title}>
                              How much will your down payment be?
                            </div>
                            <div>
                              <CurrencyField
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
                                name={"OfferDetails.downPayment"}
                                error={errors?.OfferDetails?.downPayment}
                                helperText={errors?.OfferDetails?.downPayment}
                              />
                            </div>

                            <div>
                              {" "}
                              {(
                                (values.OfferDetails.downPayment /
                                  values.OfferDetails.salesPrice) *
                                100
                              ).toFixed(2)}
                              % of Offer Sale Price $
                              {values.OfferDetails.salesPrice.toLocaleString(
                                "en"
                              )}
                            </div>
                          </div>
                        )}

                        {!values.OfferDetails.loan && (
                          <div>
                            <div className={classes.title}>
                              Upload Proof of Funds
                            </div>
                            <div className={classes.text}>
                              You may wish to provide a bank statement as proof
                              of closing funds. WARNING: You are responsible for
                              redacting any private information prior to
                              uploading, that you do not wish to share with the
                              seller, such as your account number, etc.
                            </div>
                            <div className={classes.spacer}></div>
                            <FieldArray
                              name="OfferDetails.uploadProofOfFunds"
                              render={(arrayHelpers) => (
                                <div>
                                  <input
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    onChange={(event) => {
                                      const files = event.target.files;
                                      for (var i = 0, f; (f = files[i]); i++) {
                                        // Only process image files.
                                        if (!f.type.match("image.*")) {
                                          continue;
                                        }

                                        var reader = new FileReader();

                                        // Closure to capture the file information.
                                        reader.onload = (function (theFile) {
                                          return function (e) {
                                            console.log(theFile);
                                            arrayHelpers.push({
                                              name: theFile.name,
                                              base64: e.target.result,
                                            });
                                          };
                                        })(f);
                                        reader.readAsDataURL(f);
                                      }
                                    }}
                                  />
                                  <label htmlFor="upload-photo">
                                    <Button
                                      variant="contained"
                                      component="span"
                                      className={classes.blueFillButton}
                                    >
                                      Upload Photos
                                    </Button>
                                  </label>
                                </div>
                              )}
                            />
                            <div className={classes.uploadError}>
                              {errors?.OfferDetails?.uploadProofOfFunds}
                            </div>
                            <div className={classes.photoRoot}>
                              <FieldArray
                                name="OfferDetails.uploadProofOfFunds"
                                render={(arrayHelpers) => (
                                  <div className={classes.photoRoot}>
                                    {values.OfferDetails.uploadProofOfFunds.map(
                                      (i, index) => {
                                        return (
                                          <div
                                            className={classes.photoContainer}
                                          >
                                            <div
                                              className={
                                                classes.iconWithImagePhotos
                                              }
                                            >
                                              <div
                                                className={classes.photoIcon}
                                              >
                                                <DescriptionIcon
                                                  className={
                                                    classes.photoIconTag
                                                  }
                                                />
                                              </div>
                                              {i.name}
                                            </div>
                                            <div>
                                              <IconButton
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                              >
                                                <HighlightOffIcon />
                                              </IconButton>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        )}
                        <div className={classes.title}>
                          How much will be your offer deposit in a trust
                          account?
                        </div>
                        <div className={classes.paraNoGap}>
                          Typically 2-5% of the purchase price. This money is
                          not in addition to your down payment. At closing, this
                          eventually becomes part of your down payment. The good
                          faith deposit will be due to trust account within 3
                          business days of obtaining an accepted offer.
                        </div>
                        <div className={classes.depositDetails}>
                          Deposit your Certified Cheque or Bank Draft payable to
                          "A3 Digital Corp"
                          <br />
                          <br /> Transit Number: 09971
                          <br /> Bank Number: 003 (Royal Bank)
                          <br /> Account Number: 1003532
                        </div>
                        <CurrencyField
                          errors={errors}
                          values={values}
                          setFieldValue={setFieldValue}
                          name={"OfferDetails.trustAccount"}
                          error={errors?.OfferDetails?.trustAccount}
                          helperText={errors?.OfferDetails?.trustAccount}
                        />

                        <div>
                          You are offering{" "}
                          {(
                            (values.OfferDetails.trustAccount /
                              values.OfferDetails.salesPrice) *
                            100
                          ).toFixed(2)}
                          % of Offer Sale Price $
                          {values.OfferDetails.salesPrice.toLocaleString("en")}
                        </div>

                        <div className={classes.title}>
                          How much time would you like to give the seller to
                          respond to this offer?
                        </div>
                        <DateField
                          value={
                            values.OfferDetails
                              .timeToGiveSellerToRespondToThisOffer
                          }
                          setFieldValue={setFieldValue}
                          stringVal="OfferDetails.timeToGiveSellerToRespondToThisOffer"
                          sentanceStart="This offer will expire in"
                        />
                      </div>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className={classes.flexGapLarge}>
                      <SmCard
                        header="Financing condition"
                        title="Is your Offer subjected to Finance approval?"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <div className={classes.buttonGroupContainer}>
                          <ButtonSwitch
                            values={values}
                            name={"FinancingCondition.bool"}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {values.FinancingCondition.bool && (
                          <div className={classes.flexGapWithMarginTop}>
                            <div className={classes.title}>
                              How many working days do you need for your
                              mortgage approval post offer acceptance date?
                            </div>
                            <div className={classes.selectContainer}>
                              <div className={classes.flexGap}>
                                <DateField
                                  value={values.FinancingCondition.date}
                                  setFieldValue={setFieldValue}
                                  stringVal="FinancingCondition.date"
                                  sentanceStart="Approval will take"
                                />
                              </div>

                              <div className={classes.toolTipContainer}>
                                <Tooltip
                                  title="Standard time frame is typically 5-15 working days. Strengthen your offer by shortening this time frame."
                                  arrow
                                >
                                  <InfoIcon className={classes.toolTipIcon} />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        )}
                      </SmCard>

                      <SmCard
                        header="Appraisal Contingency"
                        title="Is your offer subject to the completion of an appraisal of the property?"
                        para="The Seller agrees to co-operate in providing access to the Property for the purpose of appraisal if required by the lender or the financial institution. This condition is included for the benefit of the Buyer and may be waived at his sole option by notice in writing, delivered in-person or electronically to the seller withing the time stated herein."
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <ButtonSwitch
                          values={values}
                          name={"AppraisalContingency.boolean"}
                          setFieldValue={setFieldValue}
                        />

                        {values.AppraisalContingency.boolean && (
                          <div className={classes.loanContingency}>
                            <div className={classes.title}>
                              How many working days do you need for the
                              appraisal for your mortgage approval after the
                              offer acceptance date?
                            </div>
                            <div className={classes.text}>
                              You need to set a time limit on how many days you
                              have to complete your appraisal. This time frame
                              begins the day after the contract is signed, or as
                              per your contract if you have certain
                              contingencies.
                            </div>
                            <div className={classes.selectContainer}>
                              <div className={classes.flexGap}>
                                <DateField
                                  value={
                                    values.AppraisalContingency.daysForAppraisal
                                  }
                                  setFieldValue={setFieldValue}
                                  stringVal="AppraisalContingency.daysForAppraisal"
                                  sentanceStart="Appraisal will take"
                                />
                              </div>
                              <div className={classes.toolTipContainer}>
                                <Tooltip
                                  title="Standard time frame is typically 10-20 working days. Strengthen your offer by shortening this time frame."
                                  arrow
                                >
                                  <InfoIcon className={classes.toolTipIcon} />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        )}
                      </SmCard>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className={classes.flexGapLarge}>
                      <SmCard
                        header="Survey"
                        title="Do you want the seller to provide an existing survey of the property?"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <ButtonSwitch
                          values={values}
                          name="survey.boolean"
                          setFieldValue={setFieldValue}
                        />
                      </SmCard>
                      {values.survey.boolean && (
                        <div className={classes.flexGap}>
                          <div className={classes.title}>
                            When do you want the seller to provide this survey
                            by?
                          </div>
                          <DateField
                            value={values.survey.date}
                            setFieldValue={setFieldValue}
                            stringVal="survey.date"
                            sentanceStart="Seller to provide survey within"
                          />
                        </div>
                      )}
                      <SmCard
                        header="Home Warranty"
                        title="Do you want the seller to pay for a home warranty plan?"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                        para="It is customary for the seller to pay, but not a requirement."
                      >
                        <ButtonSwitch
                          values={values}
                          name={"HomeWarranty.boolean"}
                          setFieldValue={setFieldValue}
                        />
                        {values.HomeWarranty.boolean && (
                          <div className={classes.sellerCreditToBuyer}>
                            <div className={classes.title}>
                              Up to what price would you like the seller to pay
                              for the plan?
                            </div>

                            <Field
                              component={Select}
                              name="HomeWarranty.priceForSeller"
                              variant="outlined"
                              className={classes.select}
                            >
                              {[...Array(21).keys()].map((i, index) => {
                                if (index !== 0) {
                                  return (
                                    <MenuItem value={i * 100}>
                                      ${i * 100}
                                    </MenuItem>
                                  );
                                }
                              })}
                            </Field>
                          </div>
                        )}
                      </SmCard>
                      <SmCard
                        header="Property Inspection Contingency"
                        title="Do you want property inspection?"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <ButtonSwitch
                          values={values}
                          name={"PropertyInspectionContingency.boolean"}
                          setFieldValue={setFieldValue}
                        />

                        {values.PropertyInspectionContingency.boolean && (
                          <div className={classes.loanContingency}>
                            <div className={classes.title}>
                              How many working days do you need for the
                              Inspection?
                            </div>
                            <div className={classes.text}>
                              You need to set a time limit on how many days you
                              have to complete your property inspection. This
                              time frame begins the day after the contract is
                              signed, or as per your contract if you have
                              certain contingencies.
                            </div>
                            <div className={classes.selectContainer}>
                              <div className={classes.flexGap}>
                                <DateField
                                  value={
                                    values.PropertyInspectionContingency
                                      .propertyInspection
                                  }
                                  setFieldValue={setFieldValue}
                                  stringVal={
                                    "PropertyInspectionContingency.propertyInspection"
                                  }
                                  sentanceStart="You Will Need"
                                />
                              </div>
                              <div className={classes.toolTipContainer}>
                                <Tooltip
                                  title="Standard time frame is typically 10-20 working days. Strengthen your offer by shortening this time frame."
                                  arrow
                                >
                                  <InfoIcon className={classes.toolTipIcon} />
                                </Tooltip>
                              </div>
                            </div>
                            <div className={classes.title}>
                              Would you like Seller cover expenses for repairs
                              in case Inspection Report suggests?
                            </div>
                            <div>
                              <ButtonSwitch
                                values={values}
                                name={
                                  "PropertyInspectionContingency.propertyInspectionSellerCover"
                                }
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </div>
                        )}
                      </SmCard>
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className={classes.flexGapLarge}>
                      <SmCard
                        header="Agent Details"
                        title="Are you being represented by a real estate agent?"
                        icon={<GroupAddIcon className={classes.icon} />}
                      >
                        <ButtonSwitch
                          values={values}
                          name="AgentDetails.boolean"
                          setFieldValue={setFieldValue}
                        />

                        {!values.AgentDetails.boolean && (
                          <div className={classes.flexGapWithMarginTop}>
                            <div className={classes.title}>
                              How Much Cashback do you Expect from Seller?
                              (0-5%)
                            </div>
                            <div className={classes.sliderContainer}>
                              <Slider
                                defaultValue={2.2}
                                step={0.1}
                                max={5}
                                min={0}
                                classes={{ valueLabel: classes.valueLabel }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(val) => val + "%"}
                                onChange={(e, val) => {
                                  setFieldValue("cashBack", val);
                                }}
                              />
                            </div>

                            <div className={classes.flexSub}>
                              <div className={classes.cashBack}>
                                Your Cashback is Currently {values.cashBack}%{" "}
                                <span>
                                  ($
                                  {Math.ceil(
                                    (values.cashBack / 100) *
                                      values.OfferDetails.salesPrice
                                  )
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  )
                                </span>
                              </div>
                              <div className={classes.toolTipGap}>
                                <div className={classes.toolTipContainer}>
                                  <Tooltip
                                    title={
                                      "Lower the Cashback you ask, the more likely that Seller will accept your offer"
                                    }
                                    arrow
                                  >
                                    <InfoIcon className={classes.toolTipIcon} />
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {values.AgentDetails.boolean && (
                          <div className={classes.agentDetails}>
                            <div className={classes.title}>
                              Please enter your agent's information below.
                            </div>
                            <div className={classes.agentGrid}>
                              <TextFieldShort
                                name="AgentDetails.agentName"
                                placeholder="Enter Agent's Name"
                                label="Agent's Name"
                                className={classes.agentField}
                              />
                              <TextFieldShort
                                name="AgentDetails.agentLicence"
                                placeholder="Enter Licence Number"
                                label="Agent's Licence #"
                                className={classes.agentField}
                              />
                              <TextFieldShort
                                name="AgentDetails.agentEmail"
                                placeholder="Enter email address"
                                label="Agent's Email Address"
                                className={classes.agentField}
                              />
                              <TextFieldShort
                                name="AgentDetails.agentBrokerageName"
                                placeholder="Enter Brokerage Name"
                                label="Agent's Brokerage Name"
                                className={classes.agentField}
                              />
                              <TextFieldShort
                                name="AgentDetails.agentBrokerageLicence"
                                placeholder="Enter Licence Number"
                                label="Agent's Brokerage Licence #"
                                className={classes.agentField}
                              />
                              <TextFieldShort
                                name="AgentDetails.agentPhone"
                                placeholder="Enter Phone Number"
                                label="Agent's Phone #"
                                className={classes.agentField}
                              />
                              <div className={classes.flexUp}>
                                <CurrencyField
                                  error={errors?.AgentDetails?.agentPercentage}
                                  helperText={
                                    errors?.AgentDetails?.agentPercentage
                                  }
                                  long
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  name="AgentDetails.agentPercentage"
                                  label="Agent's Commission Percentage"
                                  percentage
                                  maxVal={100}
                                  decimalPlaces={2}
                                />
                                <div className={classes.shortText}>
                                  {values.AgentDetails.agentPercentage
                                    ? `Your Agent's Commission is $${(
                                        (values.AgentDetails.agentPercentage /
                                          100) *
                                        values.OfferDetails.salesPrice
                                      ).toLocaleString(
                                        "en"
                                      )} and you got $0. With myHomely, you can earn Cashback directly to you.`
                                    : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </SmCard>
                      <SmCard
                        header="Do you bring your own lawyer for transaction closing?"
                        title="Please indicate if you have a lawyer or are using myHomely's services"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <ButtonSwitch
                          values={values}
                          name={"Lawyer.boolean"}
                          setFieldValue={setFieldValue}
                          firstTitle="Lawyer"
                          secondTitle="myHomely"
                        />
                        {values.Lawyer.boolean && (
                          <div className={classes.lawyerContainer}>
                            <div>
                              <Field
                                component={TextField}
                                name="Lawyer.email"
                                label="Lawyer's Email"
                                InputProps={{
                                  className: classes.inputProps,
                                }}
                                InputLabelProps={{
                                  className: classes.inputProps,
                                }}
                                variant="outlined"
                                className={classes.field}
                              />
                            </div>
                            <div>
                              <Field
                                component={TextField}
                                name="Lawyer.phoneNumber"
                                label="Lawyer's Phone #"
                                InputProps={{
                                  className: classes.inputProps,
                                }}
                                InputLabelProps={{
                                  className: classes.inputProps,
                                }}
                                variant="outlined"
                                className={classes.field}
                              />
                            </div>
                          </div>
                        )}
                      </SmCard>
                      <SmCard
                        header="Included Appliances and Other Property"
                        title="Please indicate what appliances, fixtures, or chalets you would like to be included in the sale of this home, if any:"
                        icon={<AttachMoneyIcon className={classes.icon} />}
                      >
                        <FieldArray
                          name="IncludedAppliancesAndOtherProperty"
                          render={(arrayHelpers) => (
                            <div>
                              {values.IncludedAppliancesAndOtherProperty.map(
                                (i, index) => (
                                  <div
                                    className={classes.addBuyersFieldContainer}
                                  >
                                    <Field
                                      component={TextField}
                                      name={`IncludedAppliancesAndOtherProperty.${index}.itemName`}
                                      label="Enter Item Type"
                                      placeholder="Enter Item"
                                      InputProps={{
                                        className: classes.inputProps,
                                      }}
                                      InputLabelProps={{
                                        className: classes.inputProps,
                                      }}
                                      variant="outlined"
                                      className={classes.field}
                                    />
                                    {index > 0 && (
                                      <div>
                                        <IconButton
                                          className={classes.removeButton}
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <RemoveIcon />
                                        </IconButton>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}

                              <div>
                                <Button
                                  onClick={() => {
                                    arrayHelpers.push({ itemName: "" });
                                  }}
                                  className={classes.blueFillButton}
                                  endIcon={<AddIcon />}
                                >
                                  Add Item
                                </Button>
                              </div>
                            </div>
                          )}
                        />
                      </SmCard>

                      <SmCard
                        header="Any Other Conditions you request"
                        title="Request any Other Conditions"
                        icon={<GroupAddIcon className={classes.icon} />}
                      >
                        <TextFieldShort
                          name={"OtherConditions"}
                          placeholder="Write Requests here"
                          multiline={true}
                          rows={8}
                          className={classes.letterToSeller}
                        />
                      </SmCard>
                    </div>
                  )}
                  <div className={classes.submitContainer}>
                    <div>
                      <Button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={classes.blueOutlineButtonBack}
                      >
                        Back
                      </Button>
                    </div>

                    {activeStep === 4 ? (
                      <>
                        <Button
                          type="submit"
                          disabled={Object.keys(errors).length >= 1}
                          className={classes.blueFillButton}
                          key={"SUBMIT"}
                        >
                          Submit Offer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          key={"NEXT"}
                          type="button"
                          onClick={handleNext}
                          className={classes.blueFillButtonNext}
                          disabled={!values.Acknowledged}
                        >
                          Next
                        </Button>
                      </>
                    )}
                  </div>

                  {Object.keys(errors).length >= 1 && activeStep === 4 && (
                    <div className={classes.fixErrorsContainer}>
                      Please Resolve Errors on This Form Before Submitting
                    </div>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}
