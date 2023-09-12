import React from "react";
import { Field, FastField } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "minmax(min-content, max-content)",
    gap: "2rem",
    marginLeft: "0.75rem",
    marginRight: "0.75rem",
  },
  valueInnerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  field: {
    width: "3rem",
  },
  formControlLabel: {
    color: "rgba(8, 24, 74, 0.69)",
    "& span": {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
  },
  header: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "#08184A",
    fontSize: "1.35rem",
    marginBottom: "1.25rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.55rem",
  },
  selectAllThatApply: {
    fontSize: "0.8rem",
    marginTop: "0.35rem",
    color: "rgba(8, 24, 74, 0.69)",
  },
  inputProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },
  otherContainer: {
    marginTop: "1rem",
  },
  fieldContainer: {
    marginBottom: "0.3rem",
  },
  err: {
    fontWeight: "bold",
    color: "#f44336",
    opacity: "80%",
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
  greenButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function MoreDetails({
  values,
  errors,
  handleAccordionNext,
  touched,
}) {
  const valueLabels = [
    "Exterior Features",
    "Kitchen",
    "Flooring",
    "Electricity & Lighting",
    "Heating & Cooling",
    "Doors & Windows",
    "Other Features",
    "Roof & Foundation",
  ];
  const classes = useStyles();
  console.log(Object.keys(touched));

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        {valueLabels.map((i) => (
          <div>
            <div className={classes.header}>
              <div>{i}</div>
              <div className={classes.selectAllThatApply}>
                (Select All That Apply)
              </div>
            </div>
            <div className={classes.valueInnerGrid}>
              {Object.keys(values[i]["Options"]).map((ii) => {
                if (ii !== "Others")
                  return (
                    <div className={classes.fieldContainer}>
                      <FastField
                        color="primary"
                        className={classes.field}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={`[${i}]["Options"][${ii}]`}
                        Label={{
                          label: ii,
                          className: classes.formControlLabel,
                        }}
                      />
                    </div>
                  );
              })}
            </div>
            {Object.keys(touched).includes(i) ? (
              <div className={classes.err}>{errors[i]?.Options}</div>
            ) : null}
            <div className={classes.otherContainer}>
              {Object.keys(values[i]).map((ii) => {
                if (ii === "Others")
                  return (
                    <FastField
                      component={TextField}
                      name={`[${i}]][${ii}]`}
                      label="Other"
                      variant="outlined"
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                    />
                  );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(3);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
