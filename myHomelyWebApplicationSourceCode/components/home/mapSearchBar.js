import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import {
  InputBase,
  IconButton,
  Paper,
  Typography,
  MenuItem,
  Slider,
} from "@material-ui/core";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import Divider from "@material-ui/core/Divider";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { Formik, Form, Field } from "formik";
import rangeArray from "../../utils/rangeArray";
import { useRouter } from "next/router";
import Link from "next/link";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: "relative",
    },
    paper: {
      maxWidth: "100%",
      width: "52.5rem",
      overflow: "hidden",
    },
    parent: {
      position: "relative",
    },

    results: {
      position: "relative",
      marginTop: "0.5rem",
      marginLeft: "-0.25rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      fontWeight: "bold",
      color: "grey",
      zIndex: 2,
      background: "white",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
      borderRadius: "0.4rem",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
    },

    resultsButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
      justifyContent: "flex-start",
      textTransform: "none",
    },
    root: {
      position: "relative",
      zIndex: 2,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      width: "55rem",
      borderRadius: "0.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      height: "3.5rem",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    },
    input: {
      width: "100%",
      marginRight: "0.4rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
    },
    filterIconButton: {
      marginRight: "0.1rem",
      color: "#249FFB",
    },
    ActiveChip: {
      background:
        "linear-gradient(124.04deg, rgba(231, 33, 33, 0.65) 6.6%, rgba(187, 0, 116, 0.62) 88.31%)",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      paddingRight: "0.5rem",
      paddingLeft: "0.5rem",
    },
    InactiveChip: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      paddingRight: "0.5rem",
      paddingLeft: "0.5rem",
    },
    chipContainer: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1.2rem",
      marginTop: "0.9rem",
    },
    buyerSearchResultsRoot: {
      fontWeight: "bold",
      background: "white",
      position: "absolute",
      marginTop: "1rem",
      zIndex: 4,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-start",
      padding: "1rem",
      flexDirection: "column",
      width: "25rem",
      borderRadius: "1rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    },

    noResultsRoot: {
      color: "grey",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      background: "white",
      position: "absolute",
      marginTop: "1rem",
      zIndex: 4,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
      padding: "1rem",
      flexDirection: "column",
      width: "25rem",
      borderRadius: "1rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    },

    loadingContainer: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },
    filterRoot: {
      padding: "2rem",
      borderRadius: "15rem",
      fontFamily: "Gilroy, sans-serif",
      width: "30rem",
    },
    filterTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    allPropertyTypes: {
      width: "75rem",
    },
    fieldFormik: {
      fontFamily: "Gilroy, sans-serif",
    },
    formikGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      marginTop: "1.25rem",
    },
    formikGridWidth: {
      display: "flex",
      width: "100%",
      gap: "1rem",
      marginTop: "0.75rem",
      "& > *": {
        width: "11rem",
      },
    },
    formikGridWidthSingle: {
      display: "flex",
      width: "100%",
      gap: "1rem",
      marginTop: "0.75rem",
      marginBottom: "2rem",
    },
    formikGridHeader: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      marginTop: "0.5rem",
    },
    applySearchContainer: {
      width: "175%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
    },
    applySearchButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      background: "#249FFB",
      color: "white",
      padding: "1.1rem",
      marginLeft: "2.4rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    searchResultButton: {
      textAlign: "left",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    displayNone: {
      display: "none",
    },
  })
);

export default function SearchBar({
  setBuyerData,
  setRawBuyerInput,
  rawBuyerInput,
  buyerData,
  setCenterFirst,
  setOpenModal,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [filterValues, setFilterValues] = useState({
    PropertyType: [
      "Condo",
      "Road Town House",
      "Semi-Detached",
      "Detached",
      "Bungalow",
    ],
    BedsMin: 0,
    BathsMin: 0,
    PriceMin: 0,
    PriceMax: 99999999999999,
    SquareFeetMin: 0,
    SquareFeetMax: 99999999999999,
    LotSize: 0,
    YearBuiltMin: 1800,
    YearBuiltMax: new Date().getFullYear(),
  });
  const [openFilter, setOpenFilter] = useState(false);
  // BUYER
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/searchCards`, {
        query: filterValues,
        address: rawBuyerInput,
      })
      .then((res) => {
        console.log(res);
        setBuyerData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rawBuyerInput, filterValues]);

  const [results, setResults] = useState(false);

  useEffect(() => {
    if (buyerData.length === 0) {
      setResults(false);
    }
  }, [buyerData]);
  const Filter = () => {
    return (
      <Dialog
        onClose={() => {
          setOpenFilter(false);
        }}
        open={openFilter}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.filterRoot}>
          <div className={classes.filterTitle}>Customize Your Search.</div>
          <div>
            <Formik
              initialValues={filterValues}
              enableReinitialize
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                setOpenFilter(false);
                setFilterValues(values);
              }}
            >
              {({ submitForm, isSubmitting, values, setFieldValue }) => {
                const allPropertyTypes = [
                  "Condo",
                  "Road Town House",
                  "Semi-Detached",
                  "Detached",
                  "Bungalow",
                ];
                const common = [
                  0,
                  200,
                  600,
                  1000,
                  2000,
                  3000,
                  5000,
                  10000,
                  15000,
                ];
                const commonPrice = [
                  0,
                  50000,
                  100000,
                  250000,
                  500000,
                  10000000,
                  2500000,
                  5000000,
                ];
                return (
                  <Form>
                    <div className={classes.allPropertyTypes}>
                      {allPropertyTypes.map((i) => {
                        return (
                          <Field
                            component={CheckboxWithLabel}
                            type="checkbox"
                            name="PropertyType"
                            value={i}
                            Label={{ label: i }}
                            label={
                              <Typography
                                variant="h6"
                                className={classes.fieldFormik}
                              >
                                {i}
                              </Typography>
                            }
                          />
                        );
                      })}
                    </div>

                    <div className={classes.formikGrid}>
                      <div>
                        <div className={classes.formikGridHeader}>
                          Beds & Baths
                        </div>
                        <div className={classes.formikGridWidth}>
                          <Field
                            label="Beds"
                            fullWidth
                            component={TextField}
                            name={"BedsMin"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {[...Array(7).keys()].map((i) => {
                              return (
                                <MenuItem value={i}>
                                  {i.toString() + "+"}
                                </MenuItem>
                              );
                            })}
                          </Field>

                          <Field
                            fullWidth
                            label="Baths"
                            component={TextField}
                            name={"BathsMin"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {[...Array(7).keys()].map((i) => {
                              return (
                                <MenuItem value={i}>
                                  {i.toString() + "+"}
                                </MenuItem>
                              );
                            })}
                          </Field>
                        </div>
                      </div>

                      <div>
                        <div className={classes.formikGridHeader}>Price</div>
                        <div className={classes.formikGridWidth}>
                          <Field
                            label="Min Price"
                            component={TextField}
                            name={"PriceMin"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {commonPrice.map((i) => {
                              return (
                                <MenuItem value={i}>
                                  ${i.toLocaleString()}
                                </MenuItem>
                              );
                            })}
                          </Field>

                          <Field
                            label="Max Price"
                            component={TextField}
                            name={"PriceMax"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {commonPrice.map((i) => {
                              return (
                                <MenuItem value={i}>
                                  ${i.toLocaleString()}
                                </MenuItem>
                              );
                            })}
                            <MenuItem value={99999999999999}>No Max</MenuItem>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <div className={classes.formikGridHeader}>
                          Square Feet
                        </div>
                        <div className={classes.formikGridWidth}>
                          <Field
                            label="Square Feet Min"
                            component={TextField}
                            name={"SquareFeetMin"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {common.map((i) => {
                              return (
                                <MenuItem value={i}>
                                  {i.toString() + " ft²"}
                                </MenuItem>
                              );
                            })}
                          </Field>

                          <Field
                            label="Square Feet Max"
                            component={TextField}
                            name={"SquareFeetMax"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {common.map((i) => {
                              return (
                                <MenuItem value={i}>
                                  {i.toString() + " ft²"}
                                </MenuItem>
                              );
                            })}

                            <MenuItem value={99999999999999}>No Max</MenuItem>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <div className={classes.formikGridHeader}>
                          Year Built
                        </div>
                        <div className={classes.formikGridWidth}>
                          <Field
                            label="Year Built Min"
                            component={TextField}
                            name={"YearBuiltMin"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {rangeArray(1800, new Date().getFullYear() + 1)
                              .reverse()
                              .map((i) => (
                                <MenuItem value={i}>{i}</MenuItem>
                              ))}
                          </Field>

                          <Field
                            label="Year Built Max"
                            component={TextField}
                            name={"YearBuiltMax"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {rangeArray(1800, new Date().getFullYear() + 1)
                              .reverse()
                              .map((i) => (
                                <MenuItem value={i}>{i}</MenuItem>
                              ))}
                          </Field>
                        </div>
                      </div>

                      <div>
                        <div className={classes.formikGridHeader}>Lot Size</div>
                        <div classNaem={classes.formikGridWidthSingle}>
                          <Field
                            fullWidth
                            label="Lot Size"
                            component={TextField}
                            name={"LotSize"}
                            MenuProps={{ disableScrollLock: true }}
                            variant="outlined"
                            select
                          >
                            {common.map((i) => {
                              return (
                                <MenuItem value={i}>
                                  {i.toString() + "+ ft²"}
                                </MenuItem>
                              );
                            })}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className={classes.applySearchContainer}>
                      <Button
                        type="submit"
                        className={classes.applySearchButton}
                      >
                        Search
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Dialog>
    );
  };

  console.log(buyerData);
  return (
    <div className={classes.parent}>
      <div className={classes.search}>
        <Paper elevation={0} className={classes.root}>
          <IconButton disableRipple>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search"
            className={classes.input}
            value={rawBuyerInput}
            onChange={(e) => {
              setRawBuyerInput(e.target.value);
              setResults(true);
            }}
          />
          <IconButton
            className={classes.filterIconButton}
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Paper>

        <Filter />
      </div>
      <ClickAwayListener onClickAway={() => setResults(false)}>
        <div className={results ? classes.results : classes.displayNone}>
          {buyerData.map((i) => (
            <Button
              fullWidth
              className={classes.resultsButton}
              startIcon={<LocationOnIcon />}
              onClick={() => {
                setRawBuyerInput(i.query.StreetAddress);
                setCenterFirst({
                  lat: parseFloat(i.location.lat),
                  lng: parseFloat(i.location.lng),
                });
                setOpenModal(i._id);
                setResults(false);
              }}
            >
              <div>{i.query.StreetAddress}</div>
            </Button>
          ))}
        </div>
      </ClickAwayListener>
    </div>
  );
}
