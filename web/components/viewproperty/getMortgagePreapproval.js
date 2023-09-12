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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import * as Yup from "yup";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import moment from "moment";
import { Slider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    header: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "bold",
      fontSize: "1.6rem",
    },
    keyFeaturesDialog: {
      fontFamily: "Gilroy, sans-serif",
      width: "50rem",
      padding: "3.5rem",
      borderRadius: "0.5rem",
    },
    stepLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    stepIconContainer: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    fieldContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    expectedMonthly: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    header: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      marginTop: "1rem",
    },
    blueFillButtonNext: {
      marginLeft: "auto",
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
  })
);

export default function GetMortgagePreapproval({
  open,
  onClose,
  address,
  price,
}) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Basic Details", "Income Details", "Credit Details"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");

  useEffect(() => {
    if (address) {
      setPropertyAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (price) {
      setPropertyPrice(
        "$" + price.toString().replace(/(\d)(?=(\d\d\d)+$)/, "$1,")
      );
    }
  }, [price]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.keyFeaturesDialog }}
    >
      <div>
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
        <div className={classes.fieldContainer}>
          <TextField
            variant="outlined"
            label="Full Legal Name"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
          />
          <TextField
            variant="outlined"
            label="Property Address"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Property Price"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Downpayment"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
          />
          <TextField
            variant="outlined"
            label="Mortgage Amount"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
          />

          <TextField
            variant="outlined"
            label="Co-Borrower"
            placeholder="Co-Borrower (If Any)"
            InputProps={{
              className: classes.inputProps,
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
          />
          <div className={classes.expectedMonthly}>
            <TextField
              fullWidth
              variant="outlined"
              label="Expected Monthly Property Tax"
              InputProps={{
                className: classes.inputProps,
              }}
              InputLabelProps={{
                className: classes.inputProps,
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Expected Monthly Heating Bill"
              InputProps={{
                className: classes.inputProps,
              }}
              InputLabelProps={{
                className: classes.inputProps,
              }}
            />

            <FormControl>
              <FormLabel className={classes.header}>
                Is this your rental property?
              </FormLabel>
              <RadioGroup value={true}>
                <FormControlLabel
                  value={true}
                  label="Yes"
                  control={<Radio />}
                />
                <FormControlLabel
                  value={false}
                  label="No"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="button"
              onClick={handleNext}
              className={classes.blueFillButtonNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

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
