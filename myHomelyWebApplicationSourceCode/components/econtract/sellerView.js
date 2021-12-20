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
    },
    para: {
      marginBottom: "1.25rem",
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
      width: "17rem",
    },
    currencyTextField: {
      maxWidth: "20rem",
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
      justifyContent: "space-between",
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
    controlButtons: {
      display: "flex",
      gap: "1rem",
    },
    greenFillButton: {
      border: "0.1rem solid #A0D2A2",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#A0D2A2",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#A0D2A2",
      },
    },
    redFillButton: {
      border: "0.1rem solid #ff6961",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#ff6961",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#ff6961",
      },
    },
    blackFillButton: {
      border: "0.1rem solid #1e1e1e",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#1e1e1e",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#1e1e1e",
      },
    },
    name: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
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

export default function EContractModal({ state, setState, data }) {
  const authLocalState = useRecoilValue(authState);
  const router = useRouter();

  const [disabledFields, setDisabledFields] = useState(true);
  /*
  if (authLocalState !== null && authLocalState.auth === false && state) {
    router.push("/login");
  }
   * */
  const [buyer, setBuyer] = useState();

  useEffect(() => {
    if (data) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getNameFromEmail`,
          {
            email: data.buyerEmail,
          }
        )
        .then((res) => setBuyer(res.data))
        .catch((err) => console.log(err));
    }
  }, [data]);

  const classes = useStyles();

  console.log(data);
  const validation = Yup.object().shape({
    buyers: Yup.array(),
    Acknowledged: Yup.boolean(),
    AgentDetails: Yup.object(),
    Lawyer: Yup.object(),
    FinancingCondition: Yup.object(),
    OfferDetails: Yup.object(),
    LoanContingency: Yup.object(),
    SellerCreditToBuyer: Yup.object(),
    AppraisalContingency: Yup.object(),
    PropertyInspectionContingency: Yup.object(),
    SaleContingency: Yup.object(),
    HomeWarranty: Yup.object(),
    IncludedAppliancesAndOtherProperty: Yup.array(),
    OtherConditions: Yup.string(),
    cashBack: Yup.number(),
    survay: Yup.object(),
  });

  const [declined, setDeclined] = useState(false);
  useEffect(() => {
    if (data.cancelled) {
      setDeclined(true);
    }
  }, [data]);
  const onDecline = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/decline`,
        {
          id: data._id,
          type: "seller",
        },
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const onAccept = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/accept`,
        {
          id: data._id,
          type: "seller",
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const onSubmitCounter = (values) => {
    console.log("SUBMITTED");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/counterOffer`,
        {
          id: data._id,
          data: values,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

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
    disabled,
  }) => {
    return (
      <Field
        disabled={disabled}
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

  const CurrencyField = ({ values, setFieldValue, name, disabled }) => {
    const stringToObj = name.split(".").reduce((o, i) => o[i], values);
    const val = stringToObj.toString().replace(/,/g, "");
    return (
      <CurrencyTextField
        disabled={disabled}
        label="Amount"
        variant="outlined"
        value={val}
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
    disabled,
  }) => {
    return (
      <ThemeProvider theme={materialDateTheme}>
        <KeyboardDatePicker
          disabled={disabled}
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  if (declined) {
    return (
      <Dialog
        open={state}
        onClose={() => setState(false)}
        classes={{ paper: classes.paper }}
      >
        <div>This document has been declined</div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={state}
      onClose={() => setState(false)}
      classes={{ paper: classes.paper }}
    >
      <Formik
        enableReinitialize
        initialValues={
          data?.buyerSubmissions?.[data?.buyerSubmissions?.length - 1]
        }
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
          console.log(
            "OfferDetails.salesPrice".split(".").reduce((o, i) => o[i], values)
          );
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
                      icon={<GroupAddIcon className={classes.icon} />}
                    >
                      <div className={classes.name}>Full Name: {buyer}</div>
                    </SmCard>
                  </div>
                )}
                {activeStep === 1 && (
                  <SmCard
                    header="Offer Details"
                    title="Offering Sales Price"
                    icon={<DescriptionIcon className={classes.icon} />}
                  >
                    <div className={classes.flexGap}>
                      <CurrencyField
                        values={values}
                        setFieldValue={setFieldValue}
                        name={"OfferDetails.salesPrice"}
                        disabled={disabledFields}
                      />
                      <div className={classes.title}>
                        Buyer is offering to pay by
                        {data?.buyerSubmissions?.[
                          data?.buyerSubmissions?.length - 1
                        ].OfferDetails.loan
                          ? " loan"
                          : " cash"}
                      </div>
                      {values.OfferDetails.loan && (
                        <div className={classes.flexGap}>
                          <Field
                            component={RadioGroup}
                            name="OfferDetails.preApproved"
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio disabled={isSubmitting} />}
                              label="I am preapproved from a lender"
                              classes={{ label: classes.label }}
                              disabled
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio disabled={isSubmitting} />}
                              label="I don't have a preapproval yet"
                              classes={{ label: classes.label }}
                              disabled
                            />
                          </Field>
                          <div className={classes.title}>Down Payment</div>
                          <CurrencyField
                            disabled={disabledFields}
                            values={values}
                            setFieldValue={setFieldValue}
                            name={"OfferDetails.downPayment"}
                          />
                        </div>
                      )}

                      {!values.OfferDetails.loan && (
                        <div>
                          <div className={classes.title}>
                            Upload Proof of Funds
                          </div>
                          <div className={classes.text}>
                            You may wish to provide a bank statement as proof of
                            closing funds. WARNING: You are responsible for
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
                                  {console.log(values)}
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
                          <div className={classes.photoRoot}>
                            <FieldArray
                              name="OfferDetails.uploadProofOfFunds"
                              render={(arrayHelpers) => (
                                <div className={classes.photoRoot}>
                                  {values.OfferDetails.uploadProofOfFunds.map(
                                    (i, index) => {
                                      return (
                                        <div className={classes.photoContainer}>
                                          <div
                                            className={
                                              classes.iconWithImagePhotos
                                            }
                                          >
                                            <div className={classes.photoIcon}>
                                              <DescriptionIcon
                                                className={classes.photoIconTag}
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
                        Deposit to trust account for Good Faith Deposit
                      </div>
                      <CurrencyField
                        disabled={disabledFields}
                        values={values}
                        setFieldValue={setFieldValue}
                        name={"OfferDetails.trustAccount"}
                      />
                      <div className={classes.title}>
                        Requested Days until transaction closes
                      </div>

                      <DateField
                        disabled={disabledFields}
                        value={values.OfferDetails.daysForTransactionToClose}
                        setFieldValue={setFieldValue}
                        stringVal="OfferDetails.daysForTransactionToClose"
                        sentanceStart="This transaction will close in"
                      />
                    </div>
                  </SmCard>
                )}
                {activeStep === 2 && values.OfferDetails.loan && (
                  <div className={classes.flexGap}>
                    <SmCard
                      header="Loan Continugency"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].LoanContingency
                          ? "Buyer is Requesting a loan contingency"
                          : "Buyer does not need loan contingency"
                      }
                      icon={<LocalAtmIcon className={classes.icon} />}
                    >
                      {values.LoanContingency.boolean && (
                        <div className={classes.loanContingency}>
                          <div className={classes.title}>Loan Approval</div>
                          <div className={classes.text}>
                            time limit on how many days you have to complete
                            your loan approval. This time frame begins the day
                            after the contract is signed, or as per your
                            contract if you have certain contingencies.
                          </div>
                          <div className={classes.selectContainer}>
                            <div className={classes.flexGap}>
                              <DateField
                                value={values.LoanContingency.daysForApproval}
                                setFieldValue={setFieldValue}
                                stringVal="LoanContingency.daysForApproval"
                                sentanceStart="Approval will take"
                              />
                            </div>

                            <div className={classes.bestTimeText}>
                              Standard time frame is typically 17-21 days.
                            </div>
                          </div>
                        </div>
                      )}
                    </SmCard>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className={classes.flexGapLarge}>
                    <SmCard
                      header="Financing condition"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].FinancingCondition.status === "Yes"
                          ? "Offer is subjected to finance approval by lender"
                          : "Offer is not subjected to finance approval by lender"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                    >
                      {values.FinancingCondition.status === "Yes" && (
                        <div className={classes.flexGapWithMarginTop}>
                          <div className={classes.title}>Loan Approval</div>
                          <DateField
                            disabled={disabledFields}
                            value={values.FinancingCondition.date}
                            setFieldValue={setFieldValue}
                            stringVal="FinancingCondition.date"
                            sentanceStart="Approval will take"
                          />
                        </div>
                      )}
                    </SmCard>

                    <SmCard
                      header="Seller Credit to Buyer"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].SellerCreditToBuyer.boolean
                          ? "Buyer is requesting credits for closing costs"
                          : "Buyer is not requesting seller credit"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                      para="In general, if you are getting a loan, lenders will only allow this amount to be as high as your recurring and non-recurring closing costs. Be sure to check with your lender to see how much they will allow."
                    >
                      {console.log(values)}
                      {values.SellerCreditToBuyer.boolean && (
                        <div className={classes.sellerCreditToBuyer}>
                          <div className={classes.title}>
                            How much do you want to request?
                          </div>
                          <CurrencyField
                            values={values}
                            setFieldValue={setFieldValue}
                            name={"SellerCreditToBuyer.request"}
                          />
                        </div>
                      )}
                    </SmCard>
                    <SmCard
                      header="Appraisal Contingency"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].AppraisalContingency.boolean
                          ? "Buyer requests that the offer is subject to completion of an appriasal of the property"
                          : "This offer is not subject to the completion of an appraisal of the property"
                      }
                      para="The Seller agrees to co-operate in providing access to the Property for the purpose of appraisal if required by the lender or the financial institution. This condition is included for the benefit of the Buyer and may be waived at his sole option by notice in writing, delivered in-person or electronically to the seller withing the time stated herein."
                      icon={<AttachMoneyIcon className={classes.icon} />}
                    >
                      {values.AppraisalContingency.boolean && (
                        <div className={classes.loanContingency}>
                          <div className={classes.title}>
                            Days requested for the appraisal
                          </div>
                          <div className={classes.text}>
                            This time frame begins the day after the contract is
                            signed, or as per your contract if you have certain
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
                            <div className={classes.bestTimeText}>
                              Standard time frame is typically 14-17 days.
                              Strengthen your offer by shortening this time
                              frame.
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
                      header="Survay"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].survay?.boolean
                          ? "Buyer is requesting the seller to provide an existing survay of the property"
                          : "Buyer does not need an existing survay of the property"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                    ></SmCard>
                    {values?.survay?.boolean && (
                      <div className={classes.flexGap}>
                        <div className={classes.title}>
                          When do you want the seller to provide this survay by?
                        </div>
                        <DateField
                          value={values.survay.date}
                          setFieldValue={setFieldValue}
                          stringVal="survay.date"
                          sentanceStart="Seller to provide survay within"
                        />
                      </div>
                    )}
                    <SmCard
                      header="Home Warranty"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].HomeWarranty.boolean
                          ? "Buyer requesting Home Warrenty"
                          : "Buyer does not need Home Warrenty"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                      para="It is customary for the seller to pay, but not a requirement."
                    >
                      {values.HomeWarranty.boolean && (
                        <div className={classes.sellerCreditToBuyer}>
                          <div className={classes.title}>
                            Up to what price would you like to pay for the plan?
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
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].PropertyInspectionContingency.boolean
                          ? "Buyer is Requesting Offer to be contingent upon their satisfaction of the property condition once property inspections are complete"
                          : "Buyer is not requesting Property Inspection Contingency"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                    >
                      {values.PropertyInspectionContingency.boolean && (
                        <div className={classes.loanContingency}>
                          <div className={classes.title}>
                            How many days would you like to allow for your
                            property inspection?
                          </div>
                          <div className={classes.text}>
                            You need to set a time limit on how many days you
                            have to complete your property inspection. This time
                            frame begins the day after the contract is signed,
                            or as per your contract if you have certain
                            contingencies.
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
                                sentanceStart="Limited to"
                              />
                            </div>
                            <div className={classes.bestTimeText}>
                              Standard time frame is typically 14-17 days.
                              Strengthen your offer by shortening this time
                              frame.
                            </div>
                          </div>
                        </div>
                      )}
                    </SmCard>
                    <SmCard
                      header="Sale Contingency"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].SaleContingency.boolean
                          ? "Buyer needs to sell a house before buying this one"
                          : "Buyer does not need to sell a house prior to buying this one"
                      }
                      icon={<AttachMoneyIcon className={classes.icon} />}
                    >
                      <div className={classes.flexGapWithMarginTop}>
                        {values.SaleContingency.boolean && (
                          <div className={classes.flexGapWithMarginTop}>
                            <div className={classes.title}>
                              How much time do you need to put this property
                              under contract with a buyer?
                            </div>
                            <div
                              className={classes.saleContingencyTextContainer}
                            >
                              <div className={classes.text}>
                                All time periods agreed to (other than your good
                                faith deposit) will begin the day after you put
                                your existing home under contract.
                              </div>
                            </div>
                            <DateField
                              value={values.SaleContingency.timeWithProperty}
                              setFieldValue={setFieldValue}
                              stringVal="SaleContingency.timeWithProperty"
                              sentanceStart="You will need"
                            />
                          </div>
                        )}
                      </div>
                    </SmCard>
                  </div>
                )}
                {activeStep === 4 && (
                  <div className={classes.flexGapLarge}>
                    <SmCard
                      header="Agent Details"
                      title={
                        data?.buyerSubmissions[
                          data?.buyerSubmissions.length - 1
                        ].AgentDetails.boolean
                          ? "Buyer is being represented by a real estate agent"
                          : "Buyer is not being represented by a real estate agent"
                      }
                      icon={<GroupAddIcon className={classes.icon} />}
                    >
                      {!values.AgentDetails.boolean && (
                        <div className={classes.flexGapWithMarginTop}>
                          <div className={classes.title}>
                            Cashback requested from Seller (0-5%)
                          </div>
                          <div className={classes.sliderContainer}>
                            <Slider
                              disabled={disabledFields}
                              defaultValue={2.2}
                              step={0.2}
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
                          <div className={classes.cashBack}>
                            Cashback is Currenty {values.cashBack}%
                            <div>
                              ( $
                              {Math.ceil(
                                (values?.cashBack / 100) *
                                  values?.OfferDetails?.salesPrice
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              )
                            </div>
                          </div>
                        </div>
                      )}
                      {values.AgentDetails.boolean && (
                        <div className={classes.agentDetails}>
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
                            <TextFieldShort
                              name="AgentDetails.agentPercentage"
                              placeholder="Enter Percentage (0-5)"
                              label="Agent's Commision Percentage"
                              type="number"
                              max={5}
                              min={0}
                              className={classes.agentField}
                            />
                          </div>
                        </div>
                      )}
                    </SmCard>

                    <SmCard
                      header="Included Appliances and Other Property"
                      title="Please indicate what items you would like to be included in the sale of this home, if any:"
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
                                    disabled={disabledFields}
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
                                disabled={disabledFields}
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
                      header="Requested Conditions"
                      title="Buyer's Requested conditions"
                      icon={<GroupAddIcon className={classes.icon} />}
                    >
                      <TextFieldShort
                        disabled
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
                    <>
                      <Button
                        key="BACK"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={classes.blueOutlineButtonBack}
                      >
                        Back
                      </Button>
                    </>
                    <>
                      <Button
                        key="NEXT"
                        disabled={activeStep === 4}
                        onClick={handleNext}
                        className={classes.blueFillButtonNext}
                      >
                        Next
                      </Button>
                    </>
                  </div>
                  <div className={classes.controlButtons}>
                    <>
                      <Button
                        key="DECLINE"
                        className={classes.redFillButton}
                        onClick={onDecline}
                      >
                        Decline
                      </Button>
                    </>
                    <>
                      <Button
                        key="ACCEPT"
                        className={classes.greenFillButton}
                        onClick={onAccept}
                      >
                        Accept
                      </Button>
                    </>
                    <>
                      {disabledFields ? (
                        <>
                          <Button
                            key="COUNTER"
                            className={classes.blackFillButton}
                            onClick={setDisabledFields(false)}
                          >
                            Counter Offer
                          </Button>
                        </>
                      ) : (
                        <Button
                          key="SUBMIT COUNTER"
                          className={classes.blackFillButton}
                          onClick={() => onSubmitCounter(values)}
                        >
                          Submit Counter
                        </Button>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
