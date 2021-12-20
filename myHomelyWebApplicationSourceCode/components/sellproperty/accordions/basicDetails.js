import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray, Field, FastField } from "formik";
import { TextField } from "formik-material-ui";
import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  InputAdornment,
  ButtonGroup,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Add, Remove, AttachMoney, ArrowForward } from "@material-ui/icons";
import rangeArray from "../../../utils/rangeArray";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& > div": {
      margin: "1rem",
      marginBottom: "1.5rem",
    },
  },
  fontChange: {
    fontFamily: "Gilroy, sans-serif",
  },
  fieldSeperator: {
    display: "flex",
    gap: "1rem",
    marginBottom: "0.75rem",
  },

  // INPUT PROPS SIZES
  inputProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },
  longInputProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    width: "25rem",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },
  shortInputProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    width: "10rem",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },

  // SELECT
  select: {
    width: "17.5rem",
    [theme.breakpoints.down("675")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("580")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("425")]: {
      width: "12rem",
    },
  },

  greenGlowButton: {
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
  menuItem: {
    fontFamily: "Gilroy, sans-serif",
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
  removeButton: {
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    border: "0.15rem solid #249FFB",
    padding: "0.85rem",
    color: "#249FFB",
    fontWeight: "bolder",
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
  subHeader: {
    fontSize: "1rem",
    fontFamily: "Gilroy, sans-serif",
    color: "grey",
    fontWeight: "bold",
    paddingBottom: "0.75rem",
  },
  medHeader: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "#08184A",
    fontSize: "1.35rem",
  },

  largeHeader: {
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
  monthlyYearlyButtonGroup: {
    height: "3.45rem",
  },

  medButtonGroup: {
    marginTop: "1.2rem",
    height: "2.75rem",
  },

  buttonActive: {
    height: "100%",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#08184A",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#08184A",
    },
  },
  buttonInactive: {
    height: "100%",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "#08184A",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },

  sqftBlock: {
    backgroundColor: "#08184A",
    fontFamily: "Gilroy, sans-serif",
    color: "white",
    fontWeight: "bold",
    height: "3.5rem",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.2rem",
    paddingRight: "0.9rem",
    paddingLeft: "0.9rem",
    marginLeft: "0.7rem",
  },
  squareMeterFlex: {
    display: "flex",
    gap: "0.15rem",
  },

  dash: {
    height: "3.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  largeVerticalSpacer: {
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  verticalSpacer: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },

  toggleButtonGroup: {
    marginTop: "0.75rem",
    marginBottom: "2.5rem",
  },

  activeSelect: {
    fontWeight: "bold",
    width: "6.5rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD!important",
    background: "#08184A!important",
    lineHeight: "1.1rem",
    border: "0.15rem solid #08184A",
    "&:hover": {
      background: "#08184A",
    },
  },
  inactiveSelect: {
    fontWeight: "bold",
    width: "6.5rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#08184A",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    border: "0.15rem solid #D9D9D9",
    "&:hover": {
      background: "#f2f0f0",
    },
  },
  customError: {
    color: "#f44336",
    fontSize: "0.75rem",
    marginTop: "0.5rem",
  },
  greenButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  basementOptionsFlex: {
    display: "flex",
    gap: "7.75rem",
    marginBottom: "2rem",
  },
}));

function BasicDetails({
  errors,
  setFieldValue,
  values,
  query,
  handleAccordionNext,
}) {
  // Owner Number State
  const [owners, setOwners] = React.useState([{}]);

  // set address to query address on render
  React.useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query.address }, (results, status) => {
      if (status === "OK") {
        let components = results[0].address_components;
        components.map((i) => {
          if (i.types.includes("postal_code")) {
            setFieldValue("PostalCode", i.short_name);
          }
        });
      }
    });
    if (query.address) {
      setFieldValue("StreetAddress", query.address);
    }
  }, []);
  // Property Type Menu Item Array Loop
  const PropertyTypeMenu = [
    "Single Family Detatched",
    "Semi Detatched / Bungalow",
    "Row House / Row Town House",
    "Condo / Apartment",
  ];

  // Button Group for Bedrooms, Bathrooms, etc.
  const ButtonGroupOptions = ({ field, arr }) => (
    <div className={classes.toggleButtonGroup}>
      <ToggleButtonGroup
        value={values[field]}
        exclusive
        onChange={(e, n) => {
          if (n !== null) {
            setFieldValue(field, n);
          }
        }}
      >
        {arr.map((i) => {
          return (
            <ToggleButton
              value={i}
              className={
                values[field] === i
                  ? classes.activeSelect
                  : classes.inactiveSelect
              }
            >
              {i}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );

  // Used as the arr parameter in ButtonGroupOptions
  const ButtonOptionsLongCounter = ["0", "1", "2", "3", "4", "5", "5+"];
  const ButtonOptionsNoZero = ["1", "2", "3", "4", "5+"];
  const ButtonOptionsShortCounter = ["Single", "Double", "Triple", "+"];

  React.useEffect(() => {
    if (values.PropertyType === "Condo / Apartment") {
      setFieldValue("Stories", "0");
    } else {
      setFieldValue("Stories", "Single");
    }
  }, [values.PropertyType]);

  // Repeated Button Groups For Basement
  const basementOptionList = [
    {
      label: "Bedrooms",
      formikName: "BasementBedrooms",
      arr: ButtonOptionsNoZero,
    },
    {
      label: "Bathrooms",
      formikName: "BasementBathrooms",
      arr: ButtonOptionsNoZero,
    },
  ];

  // Repeated Button Groups
  const buttonOptionList = [
    {
      label: "Stories",
      formikName: "Stories",
      arr:
        values.PropertyType === "Condo / Apartment"
          ? ButtonOptionsLongCounter
          : ButtonOptionsShortCounter,
    },
    {
      label: "Bedrooms",
      formikName: "Bedrooms",
      arr: ButtonOptionsNoZero,
    },
    {
      label: "Bathrooms",
      formikName: "Bathrooms",
      arr: ButtonOptionsNoZero,
    },
    {
      label: "Garage Spaces",
      formikName: "GarageSpaces",
      arr: ButtonOptionsLongCounter,
    },
    {
      label: "Parking Spaces",
      formikName: "ParkingSpaces",
      arr: ButtonOptionsLongCounter,
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/*Collects Owner Names and Emails*/}
      <div>
        <FieldArray
          name="owners"
          render={(arrayHelpers) => (
            <div>
              {owners.map((i, index) => {
                return (
                  <div className={classes.fieldSeperator}>
                    <Field
                      component={TextField}
                      name={`owners.${index}.name`}
                      label={"Primary Owner Name"}
                      placeholder={"Enter Full Legal Name"}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      name={`owners.${index}.email`}
                      label={"Email Address"}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                    />
                    {index > 0 && (
                      <div>
                        <IconButton
                          className={classes.removeButton}
                          onClick={() => {
                            arrayHelpers.remove(index);
                            owners.splice(index, 1)[0];
                          }}
                        >
                          <Remove />
                        </IconButton>
                      </div>
                    )}
                  </div>
                );
              })}
              <div>
                <Button
                  onClick={() => {
                    owners.push({});
                    arrayHelpers.push({
                      name: "",
                      email: "",
                    });
                  }}
                  className={classes.greenGlowButton}
                  endIcon={<Add />}
                  disabled={owners.length >= 4 ? true : false}
                >
                  Add Owners
                </Button>
              </div>
            </div>
          )}
        />
      </div>

      {/*Address, Unit, Property Type, & Year Built*/}
      <div className={classes.fieldSeperator}>
        <FastField
          component={TextField}
          name={`StreetAddress`}
          label={"Type Address"}
          InputProps={{
            className: classes.longInputProps,
          }}
          InputLabelProps={{
            className: classes.inputProps,
          }}
          variant="outlined"
          disabled
        />

        <FastField
          component={TextField}
          name={`Unit`}
          label={"Unit #"}
          InputProps={{
            className: classes.shortInputProps,
          }}
          InputLabelProps={{
            className: classes.inputProps,
          }}
          variant="outlined"
          disabled
        />
      </div>
      <div className={classes.fieldSeperator}>
        <Field
          label="Property Type"
          component={TextField}
          name={`PropertyType`}
          className={classes.select}
          MenuProps={{ disableScrollLock: true }}
          variant="outlined"
          InputLabelProps={{
            className: classes.inputProps,
          }}
          InputProps={{
            className: classes.inputProps,
          }}
          select
        >
          {PropertyTypeMenu.map((i) => (
            <MenuItem className={classes.menuItem} value={i}>
              {i}
            </MenuItem>
          ))}
        </Field>
        <FastField
          component={TextField}
          name={`YearBuilt`}
          label={"Year Built"}
          className={classes.select}
          InputProps={{
            className: classes.inputProps,
          }}
          InputLabelProps={{
            className: classes.inputProps,
          }}
          variant="outlined"
          select
        >
          {rangeArray(1800, new Date().getFullYear() + 1)
            .reverse()
            .map((i) => (
              <MenuItem className={classes.fontChange} value={i}>
                {i}
              </MenuItem>
            ))}
          <MenuItem className={classes.fontChange} value={"Below 1800"}>
            Below 1800
          </MenuItem>
        </FastField>
      </div>

      {/*Property Tax*/}
      <div>
        <div className={classes.medHeader}>Property Tax</div>
        <div className={classes.subHeader}>(Municipality Tax)</div>
        <div className={classes.fieldSeperator}>
          <FastField
            component={TextField}
            name={`PropertyTax`}
            InputProps={{
              className: classes.inputProps,
              startAdornment: (
                <InputAdornment>
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: classes.inputProps,
            }}
            variant="outlined"
          />

          <ButtonGroup
            className={classes.monthlyYearlyButtonGroup}
            disableElevation
            variant="contained"
            color="inherit"
          >
            <Button
              className={
                values.PropertyTaxPayment === "Monthly"
                  ? classes.buttonActive
                  : classes.buttonInactive
              }
              onClick={() => {
                setFieldValue("PropertyTaxPayment", "Monthly");
              }}
            >
              Monthly
            </Button>
            <Button
              className={
                values.PropertyTaxPayment === "Yearly"
                  ? classes.buttonActive
                  : classes.buttonInactive
              }
              onClick={() => {
                setFieldValue("PropertyTaxPayment", "Yearly");
              }}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </div>

        <div className={classes.largeVerticalSpacer}></div>

        <div>
          <div className={classes.medHeader}>Built Area</div>
          {/*TODO: CHANGE SQUARE FEET IN YUP AND FORMIK JSON TO BUILT AREA*/}
          <div className={classes.verticalSpacer}></div>
          <div className={classes.fieldSeperator}>
            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`HouseSize.width`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 100"
              />

              <div>
                {values.HouseSize.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div className={classes.dash}>-</div>

            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`HouseSize.length`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 500"
              />

              <div>
                {values.HouseSize.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div>
              <ButtonGroup
                className={classes.monthlyYearlyButtonGroup}
                disableElevation
                variant="contained"
                color="inherit"
              >
                <Button
                  className={
                    values.HouseSize.unit === "Square Meter"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("HouseSize.unit", "Square Meter");
                  }}
                >
                  Square Meter
                </Button>
                <Button
                  className={
                    values.HouseSize.unit === "Square Feet"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("HouseSize.unit", "Square Feet");
                  }}
                >
                  Square Feet
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className={classes.largeVerticalSpacer}></div>

        <div>
          <div className={classes.medHeader}>Living Area</div>
          <div className={classes.verticalSpacer}></div>
          <div className={classes.fieldSeperator}>
            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`LivingArea.width`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 100"
              />

              <div>
                {values.LivingArea.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div className={classes.dash}>-</div>

            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`LivingArea.length`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 500"
              />

              <div>
                {values.LivingArea.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div>
              <ButtonGroup
                className={classes.monthlyYearlyButtonGroup}
                disableElevation
                variant="contained"
                color="inherit"
              >
                <Button
                  className={
                    values.LivingArea.unit === "Square Meter"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("LivingArea.unit", "Square Meter");
                  }}
                >
                  Square Meter
                </Button>
                <Button
                  className={
                    values.LivingArea.unit === "Square Feet"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("LivingArea.unit", "Square Feet");
                  }}
                >
                  Square Feet
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className={classes.largeVerticalSpacer}></div>

        <div>
          <div className={classes.medHeader}>Lot Size</div>
          <div className={classes.verticalSpacer}></div>
          <div className={classes.fieldSeperator}>
            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`LotSize.width`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 100"
              />

              <div>
                {values.LotSize.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div className={classes.dash}>-</div>

            <div className={classes.squareMeterFlex}>
              <FastField
                component={TextField}
                name={`LotSize.length`}
                InputProps={{
                  className: classes.inputProps,
                }}
                InputLabelProps={{
                  className: classes.inputProps,
                }}
                variant="outlined"
                placeholder="ex. 500"
              />

              <div>
                {values.LotSize.unit === "Square Feet" ? (
                  <div className={classes.sqftBlock}>ft</div>
                ) : (
                  <div className={classes.sqftBlock}>m</div>
                )}
              </div>
            </div>

            <div>
              <ButtonGroup
                className={classes.monthlyYearlyButtonGroup}
                disableElevation
                variant="contained"
                color="inherit"
              >
                <Button
                  className={
                    values.LotSize.unit === "Square Meter"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("LotSize.unit", "Square Meter");
                  }}
                >
                  Square Meter
                </Button>
                <Button
                  className={
                    values.LotSize.unit === "Square Feet"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("LotSize.unit", "Square Feet");
                  }}
                >
                  Square Feet
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className={classes.largeVerticalSpacer} />

        {buttonOptionList.map((i) => (
          <>
            <div className={classes.medHeader}>{i.label}</div>
            <ButtonGroupOptions field={i.formikName} arr={i.arr} />
            <div className={classes.verticalSpacer} />
          </>
        ))}

        <div className={classes.largeVerticalSpacer} />
        <div>
          <div className={classes.largeHeader}>Do You Have a Basement?</div>
          <div>
            <ButtonGroup
              className={classes.medButtonGroup}
              disableElevation
              variant="contained"
              color="inherit"
            >
              <Button
                className={
                  values.Basement
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
                onClick={() => {
                  setFieldValue("Basement", true, false);
                  if (
                    values.BasementFinished === undefined ||
                    values.BasementSize === undefined
                  ) {
                    setFieldValue("BasementFinished", "NO");
                    setFieldValue("BasementSize", {
                      width: "",
                      length: "",
                      unit: "Square Meter",
                    });
                  }
                }}
              >
                Yes
              </Button>
              <Button
                className={
                  values.Basement === false
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
                onClick={() => {
                  setFieldValue("Basement", false);
                  setFieldValue("BasementFinished", undefined, false);
                  setFieldValue("BasementSize", undefined, false);

                  setFieldValue("BasementSqft", undefined);
                  setFieldValue("BasementFeatures", undefined);
                  setFieldValue("BasementLivingArea", undefined);

                  setFieldValue("BasementBathrooms", undefined);
                  setFieldValue("BasementBedrooms", undefined);
                }}
              >
                No
              </Button>
            </ButtonGroup>
            {errors.Basement ? "Required" : null}
          </div>

          {values.Basement ? (
            <div>
              <div className={classes.largeVerticalSpacer} />
              <div className={classes.medHeader}>Is The Basement Finished</div>

              <ButtonGroup
                className={classes.medButtonGroup}
                disableElevation
                variant="contained"
                color="inherit"
              >
                <Button
                  className={
                    values.BasementFinished === "YES"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("BasementFinished", "YES", false);
                    setFieldValue("BasementSqft", "");
                    setFieldValue("BasementFeatures", {
                      SeperateEnterence: false,
                      SeperateUtilities: false,
                      CurrentlyRented: false,
                    });
                    setFieldValue("BasementBathrooms", "1");
                    setFieldValue("BasementBedrooms", "1");
                    setFieldValue("BasementLivingArea", {
                      width: "",
                      length: "",
                      unit: "Square Meter",
                    });
                  }}
                >
                  Yes
                </Button>
                <Button
                  className={
                    values.BasementFinished === "NO"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("BasementFinished", "NO", false);

                    setFieldValue("BasementSqft", undefined);
                    setFieldValue("BasementFeatures", undefined);
                    setFieldValue("BasementLivingArea", undefined);

                    setFieldValue("BasementBathrooms", undefined);
                    setFieldValue("BasementBedrooms", undefined);
                  }}
                >
                  No
                </Button>
                <Button
                  className={
                    values.BasementFinished === "PARTIALLY"
                      ? classes.buttonActive
                      : classes.buttonInactive
                  }
                  onClick={() => {
                    setFieldValue("BasementFinished", "PARTIALLY", false);

                    setFieldValue("BasementSqft", undefined);
                    setFieldValue("BasementFeatures", undefined);
                    setFieldValue("BasementLivingArea", undefined);

                    setFieldValue("BasementBathrooms", undefined);
                    setFieldValue("BasementBedrooms", undefined);
                  }}
                >
                  Partially
                </Button>
              </ButtonGroup>
              <div className={classes.largeVerticalSpacer} />
              <div>
                <div className={classes.medHeader}>Basement Size</div>
                <div className={classes.verticalSpacer}></div>
                <div className={classes.fieldSeperator}>
                  <div className={classes.squareMeterFlex}>
                    <FastField
                      component={TextField}
                      name={`BasementSize.width`}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      placeholder="ex. 100"
                    />

                    <div>
                      {values.BasementSize.unit === "Square Feet" ? (
                        <div className={classes.sqftBlock}>ft</div>
                      ) : (
                        <div className={classes.sqftBlock}>m</div>
                      )}
                    </div>
                  </div>
                  <div className={classes.dash}>-</div>
                  <div className={classes.squareMeterFlex}>
                    <FastField
                      component={TextField}
                      name={`BasementSize.length`}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      placeholder="ex. 500"
                    />

                    <div>
                      {values.BasementSize.unit === "Square Feet" ? (
                        <div className={classes.sqftBlock}>ft</div>
                      ) : (
                        <div className={classes.sqftBlock}>m</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <ButtonGroup
                      className={classes.monthlyYearlyButtonGroup}
                      disableElevation
                      variant="contained"
                      color="inherit"
                    >
                      <Button
                        className={
                          values.BasementSize.unit === "Square Meter"
                            ? classes.buttonActive
                            : classes.buttonInactive
                        }
                        onClick={() => {
                          setFieldValue("BasementSize.unit", "Square Meter");
                        }}
                      >
                        Square Meter
                      </Button>
                      <Button
                        className={
                          values.BasementSize.unit === "Square Feet"
                            ? classes.buttonActive
                            : classes.buttonInactive
                        }
                        onClick={() => {
                          setFieldValue("BasementSize.unit", "Square Feet");
                        }}
                      >
                        Square Feet
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
                {values.BasementFinished === "YES" ? (
                  <>
                    <div className={classes.largeVerticalSpacer} />

                    {basementOptionList.map((i) => (
                      <>
                        <div className={classes.medHeader}>{i.label}</div>
                        <ButtonGroupOptions field={i.formikName} arr={i.arr} />
                        <div className={classes.verticalSpacer} />
                      </>
                    ))}

                    <div className={classes.largeVerticalSpacer} />
                    <div>
                      <div className={classes.medHeader}>Living Area</div>
                      <div className={classes.verticalSpacer}></div>
                      <div className={classes.fieldSeperator}>
                        <div className={classes.squareMeterFlex}>
                          <FastField
                            component={TextField}
                            name={`BasementLivingArea.width`}
                            InputProps={{
                              className: classes.inputProps,
                            }}
                            InputLabelProps={{
                              className: classes.inputProps,
                            }}
                            variant="outlined"
                            placeholder="ex. 100"
                          />

                          <div>
                            {values.BasementLivingArea.unit ===
                            "Square Feet" ? (
                              <div className={classes.sqftBlock}>ft</div>
                            ) : (
                              <div className={classes.sqftBlock}>m</div>
                            )}
                          </div>
                        </div>
                        <div className={classes.dash}>-</div>
                        <div className={classes.squareMeterFlex}>
                          <FastField
                            component={TextField}
                            name={`BasementLivingArea.length`}
                            InputProps={{
                              className: classes.inputProps,
                            }}
                            InputLabelProps={{
                              className: classes.inputProps,
                            }}
                            variant="outlined"
                            placeholder="ex. 500"
                          />

                          <div>
                            {values.BasementLivingArea.unit ===
                            "Square Feet" ? (
                              <div className={classes.sqftBlock}>ft</div>
                            ) : (
                              <div className={classes.sqftBlock}>m</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <ButtonGroup
                            className={classes.monthlyYearlyButtonGroup}
                            disableElevation
                            variant="contained"
                            color="inherit"
                          >
                            <Button
                              className={
                                values.BasementLivingArea.unit ===
                                "Square Meter"
                                  ? classes.buttonActive
                                  : classes.buttonInactive
                              }
                              onClick={() => {
                                setFieldValue(
                                  "BasementLivingArea.unit",
                                  "Square Meter"
                                );
                              }}
                            >
                              Square Meter
                            </Button>
                            <Button
                              className={
                                values.BasementLivingArea.unit === "Square Feet"
                                  ? classes.buttonActive
                                  : classes.buttonInactive
                              }
                              onClick={() => {
                                setFieldValue(
                                  "BasementLivingArea.unit",
                                  "Square Feet"
                                );
                              }}
                            >
                              Square Feet
                            </Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>
                    <div className={classes.largeVerticalSpacer} />
                    <div className={classes.basementOptionsFlex}>
                      <div>
                        <div className={classes.medHeader}>
                          Seperate Enterence?
                        </div>

                        <ButtonGroup
                          className={classes.medButtonGroup}
                          disableElevation
                          variant="contained"
                          color="inherit"
                        >
                          <Button
                            className={
                              values.BasementFeatures.SeperateEnterence === true
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.SeperateEnterence",
                                true
                              );
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            className={
                              values.BasementFeatures.SeperateEnterence ===
                              false
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.SeperateEnterence",
                                false
                              );
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div>
                        <div className={classes.medHeader}>
                          Seperate Utilities?
                        </div>

                        <ButtonGroup
                          className={classes.medButtonGroup}
                          disableElevation
                          variant="contained"
                          color="inherit"
                        >
                          <Button
                            className={
                              values.BasementFeatures.SeperateUtilities === true
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.SeperateUtilities",
                                true
                              );
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            className={
                              values.BasementFeatures.SeperateUtilities ===
                              false
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.SeperateUtilities",
                                false
                              );
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </div>

                      <div>
                        <div className={classes.medHeader}>
                          Currently Rented?
                        </div>

                        <ButtonGroup
                          className={classes.medButtonGroup}
                          disableElevation
                          variant="contained"
                          color="inherit"
                        >
                          <Button
                            className={
                              values.BasementFeatures.CurrentlyRented === true
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.CurrentlyRented",
                                true
                              );
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            className={
                              values.BasementFeatures.CurrentlyRented === false
                                ? classes.buttonActive
                                : classes.buttonInactive
                            }
                            onClick={() => {
                              setFieldValue(
                                "BasementFeatures.CurrentlyRented",
                                false
                              );
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(2);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default BasicDetails;
