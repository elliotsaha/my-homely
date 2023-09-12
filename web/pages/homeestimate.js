import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import {
  InputBase,
  Button,
  Paper,
  IconButton,
  ClickAwayListener,
  Dialog,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import WarningIcon from "@material-ui/icons/Warning";
import Link from "next/link";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../components/states";
import { useRouter } from "next/router";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "auto",
    },
    inner: {
      overflow: "auto",
      marginTop: "6rem",
      paddingRight: "10rem",
      paddingLeft: "10rem",
      paddingBottom: "6rem",
      borderRadius: "0.5rem",
    },
    header: {
      fontSize: "3.5rem",
      textAlign: "center",
      marginBottom: "1.25rem",
      "& span": {
        color: "#249FFB",
        textDecoration: "underline",
        textUnderlineOffset: "0.25rem",
      },
      [theme.breakpoints.down("975")]: {
        fontSize: "3rem",
      },

      [theme.breakpoints.down("635")]: {
        fontSize: "2.5rem",
        paddingRight: "0.75rem",
        paddingLeft: "0.75rem",
      },
    },
    aboveFold: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "17rem",
      marginTop: "2rem",
    },
    inputContainer: {},
    inputPaper: {
      position: "relative",
      zIndex: 5,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "52.5rem",
      borderRadius: "0.25rem",
      borderTopLeftRadius: 0,
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      [theme.breakpoints.down("975")]: {
        width: "35rem",
      },
    },

    input: {
      width: "100%",
      marginRight: "0.4rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
    },

    searchResultIcon: {
      marginBottom: "0.25rem",
      color: "#484848",
    },

    getEstimateButton: {
      paddingTop: "0.55rem",
      paddingBottom: "0.55rem",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem",
      width: "11rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },

    buyerSearchResultsRoot: {
      fontWeight: "bold",
      background: "white",
      position: "absolute",
      marginTop: "1rem",
      zIndex: 5,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "flex-start",
      padding: "1rem",
      flexDirection: "column",
      width: "35rem",
      borderRadius: "0.25rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
    },
    displayNone: {
      display: "none",
    },
    searchResultButtonContainer: {
      width: "100%",
    },
    searchResultButton: {
      textAlign: "left",
      fontFamily: "Gilroy, sans-serif",
      justifyContent: "flex-start",
      fontWeight: "bold",
      textTransform: "none",
      color: "grey",
    },
    searchResultIcon: {
      marginBottom: "0.25rem",
      color: "#484848",
    },
    estimate: {
      position: "relative",
      display: "flex",
      width: "100%",
      gap: "1.75rem",
      [theme.breakpoints.down("975")]: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0rem",
        marginTop: "-2rem",
      },
    },
    estimateItem: {
      borderRadius: "0.4rem",
      width: "20rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      background: "white",
      height: "13rem",
      marginBottom: "2.5rem",
      [theme.breakpoints.down("1100")]: {
        width: "16rem",
      },
      [theme.breakpoints.down("975")]: {
        width: "32.5rem",
      },
    },
    estimateIconContainer: {
      padding: "0.8rem",
      "& > *": {
        fontSize: "1.8rem",
        color: "#249FFB",
      },
    },
    estimateHeader: {
      fontSize: "1.65rem",
      marginTop: "-1.25rem",
      color: "#1e1e1e",
      marginBottom: "0.25rem",
      textAlign: "center",
      maxWidth: "13rem",
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.down("1100")]: {
        fontSize: "1.4rem",
      },
      [theme.breakpoints.down("975")]: {
        fontSize: "1.8rem",
        marginTop: "-1.9rem",
      },
    },
    estimateLower: {
      color: "#65BF74",
      marginTop: "0.75rem",
      fontSize: "2rem",
      textAlign: "center",
      [theme.breakpoints.down("1100")]: {
        fontSize: "1.8rem",
      },
    },
    estimateMedium: {
      color: "#2FB845",
      marginTop: "0.75rem",
      fontSize: "2rem",
      textAlign: "center",

      [theme.breakpoints.down("1100")]: {
        fontSize: "1.8rem",
      },
    },
    estimateHigher: {
      color: "#38A838",
      marginTop: "0.75rem",
      fontSize: "2rem",
      textAlign: "center",
      [theme.breakpoints.down("1100")]: {
        fontSize: "1.8rem",
      },
    },
    lowerEstimateIcon: {
      color: "#65BF74",
    },
    medEstimateIcon: {
      color: "#2FB845",
    },
    higherEstimateIcon: {
      color: "#38A838",
    },
    disclaimer: {
      color: "grey",
      width: "99.4%",
      borderRadius: "0.5rem",
      marginTop: "1.5rem",
      padding: "1rem",
      maxWidth: "52.25rem",
      display: "flex",
      gap: "1rem",
      "& span": {
        color: "#249FFB",
      },
      [theme.breakpoints.down("975")]: {
        width: "32.5rem",
      },
    },
    shortDialog: {
      fontFamily: "Gilroy, sans-serif",
      padding: "3.5rem",
      borderRadius: "0.5rem",
    },

    select: {
      width: "17.5rem",

      fontFamily: "Gilroy, sans-serif",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },

    menuItem: {
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
    },
    selectContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
    },
    dialogButtonGroupCenter: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "1.5rem",
      paddingBottom: "1rem",
      gap: "0.5rem",
    },
    continueButton: {
      background: "#249FFB",
      color: "white",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      padding: "1rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    goBack: {
      color: "grey",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      padding: "1rem",
    },

    unitHeader: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "1.8rem",
      maxWidth: "20rem",
      textAlign: "center",
    },
    flexIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "5rem",
      marginTop: "-5rem",
      [theme.breakpoints.down("1100")]: {
        gap: "2rem",
      },

      [theme.breakpoints.down("975")]: {
        flexDirection: "column",
        gap: "2rem",
      },
    },
    flexIconChild: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      maxWidth: "18rem",
      textAlign: "center",
    },
    flexIconGroup: {
      background: "#249FFB",
      color: "white",
      borderRadius: "50%",
      padding: "2.5rem",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "0.75rem",
      [theme.breakpoints.down("1100")]: {
        padding: "2rem",
      },
      [theme.breakpoints.down("975")]: {
        padding: "2.5rem",
      },
    },
    flexIcon: {
      fontSize: "2.5rem",
      position: "absolute",
      [theme.breakpoints.down("1100")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.down("975")]: {
        fontSize: "3rem",
      },
      [theme.breakpoints.down("975")]: {
        fontSize: "2.5rem",
      },
    },
    flexIconTitle: {
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      marginBottom: "0.5rem",
      [theme.breakpoints.down("1100")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.down("975")]: {
        fontSize: "1.8rem",
        lineHeight: "2rem",
      },
    },
    flexIconSub: {
      color: "grey",
    },
    faqSection: {
      display: "flex",
      flexDirection: "column",
      width: "65rem",
      marginTop: "5rem",
      "& > *:nth-child(1)": {
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
      },
      "& > *:nth-child(5)": {
        borderBottomLeftRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      },

      [theme.breakpoints.down("1100")]: {
        width: "50rem",
      },
      [theme.breakpoints.down("975")]: {
        width: "32.5rem",
      },
      boxShadow: "rgb(0 0 0 / 5%) 0px 4px 12px",
    },
    faqTitle: {
      fontSize: "1.2rem",
    },
    faqDesc: {
      fontWeight: "500",
      color: "grey",
    },
    error: {
      color: "#ff0033",
      display: "flex",
      gap: "0.25rem",
      alignItems: "center",
      marginTop: "1rem",
    },
  })
);

export default function HomeEstimate() {
  const classes = useStyles();

  const router = useRouter();

  const [inputVal, setInputVal] = useState("");
  const [clickAway, setClickAway] = useState(false);

  console.log(clickAway);

  const PropertyResults = ({
    suggestions,
    getSuggestionItemProps,
    clickAway,
  }) => {
    if (inputVal === "") {
      return null;
    }
    console.log(suggestions);
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div
        className={
          clickAway ? classes.displayNone : classes.buyerSearchResultsRoot
        }
      >
        {suggestions.map((i) => (
          <div
            className={classes.searchResultButtonContainer}
            {...getSuggestionItemProps(i)}
          >
            <Button
              fullWidth
              onClick={() => {
                setInputVal(i.description);
              }}
              className={classes.searchResultButton}
              startIcon={<RoomIcon className={classes.searchResultIcon} />}
            >
              {i.description}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setClickAway(false);
  }, [inputVal]);

  const [estimateBool, setEstimateBool] = useState(false);
  const [currentPostalCode, setCurrentPostalCode] = useState("");
  const [propertyDialog, setPropertyDialog] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  const [propertyStyle, setPropertyStyle] = useState(4);

  const onGetEstimate = () => {
    console.log(inputVal);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: inputVal }, function (res, status) {
      if (status === "OK") {
        res[0]?.address_components.map((i) => {
          console.log(res[0]);
          i.types.map((j) => {
            if (j === "postal_code") {
              //TODO: GET THIS BACK setEstimateBool(true);
              setCurrentPostalCode(i.long_name.replace(/ /g, ""));
              // setCurrentLocation(res[0].geometry.location);
            } else {
              return null;
            }
          });
        });
      } else {
        return null;
      }
    });
  };

  const PropertyTypeMenu = [
    "Condomonium / Apartment",
    "Row House",
    "Semi Detached",
    "Single Family Detached",
  ];

  useEffect(() => {
    console.log(propertyStyle);
    axios
      .post(
        "https://0oal6b8ejl.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalCode: currentPostalCode,
          propertyStyle: propertyStyle,
        }
      )
      .then((res) => {
        setData(res.data.body);
      })
      .catch((err) => {
        setErr(true);
      });
  }, [currentPostalCode, propertyStyle]);

  const authLocalState = useRecoilValue(authState);

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.aboveFold}>
            <div className={classes.header}>
              What's my home <span>worth?</span>
            </div>
            <div className={classes.inputContainer}>
              <PlacesAutoComplete
                searchOptions={{
                  componentRestrictions: { country: ["ca"] },
                }}
                value={inputVal}
                onChange={(address) => {
                  setInputVal(address);
                  setErr(false);
                }}
                ref={(c) => {
                  if (!c) return;
                  c.handleInputOnBlur = () => {};
                }}
                onSelect={(address) => {
                  setInputVal(address);
                }}
              >
                {({
                  getInputProps,
                  suggestions,
                  loading,
                  getSuggestionItemProps,
                }) => (
                  <>
                    <Paper elevation={0} className={classes.inputPaper}>
                      <IconButton disableRipple>
                        <SearchIcon />
                      </IconButton>
                      <InputBase
                        placeholder="Enter Postal Code, City, Province"
                        className={classes.input}
                        value={inputVal}
                        onChange={(e) => {
                          setInputVal(e.target.value);
                          setClickAway(false);
                        }}
                        {...getInputProps()}
                      />
                      <Button
                        className={classes.getEstimateButton}
                        onClick={() => {
                          setPropertyDialog(true);
                          setPropertyStyle(4);
                          onGetEstimate();
                        }}
                      >
                        Get Estimate
                      </Button>
                    </Paper>
                    {err && (
                      <div className={classes.error}>
                        <ErrorOutlineRoundedIcon />
                        <div>
                          Sorry, Home Estimates Are Not Available For This
                          Address
                        </div>
                      </div>
                    )}

                    <ClickAwayListener onClickAway={() => setClickAway(true)}>
                      <div>
                        <PropertyResults
                          suggestions={suggestions}
                          getSuggestionItemProps={getSuggestionItemProps}
                          clickAway={clickAway}
                        />
                      </div>
                    </ClickAwayListener>
                  </>
                )}
              </PlacesAutoComplete>
            </div>
          </div>
          <div>
            <Dialog
              onClose={() => {
                setPropertyDialog(false);
              }}
              classes={{ paper: classes.shortDialog }}
              open={propertyDialog}
            >
              <div className={classes.unitHeader}>
                Enter What Type of Property You Have
              </div>
              <div className={classes.selectContainer}>
                <TextField
                  className={classes.select}
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.inputProps,
                  }}
                  InputProps={{
                    className: classes.inputProps,
                  }}
                  defaultValue={"Single Family Detached"}
                  select
                >
                  {PropertyTypeMenu.map((i, index) => (
                    <MenuItem
                      className={classes.menuItem}
                      value={i}
                      onClick={() => {
                        setPropertyStyle(index + 1);
                      }}
                    >
                      {i}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.dialogButtonGroupCenter}>
                <Button
                  className={classes.goBack}
                  onClick={() => setPropertyDialog(false)}
                >
                  Go Back
                </Button>
                <Button
                  className={classes.continueButton}
                  onClick={() => {
                    setPropertyDialog(false);
                    if (authLocalState.auth) {
                      setEstimateBool(true);
                      if (!data) {
                        setErr(true);
                      } else {
                        setErr(false);
                      }
                    } else {
                      router.push("/login?needAuth=true");
                    }
                  }}
                >
                  Continue
                </Button>
              </div>
            </Dialog>
          </div>
          <div className={classes.estimateContainer}>
            {estimateBool && data ? (
              <div className={classes.estimate}>
                <div className={classes.estimateItem}>
                  <div className={classes.estimateIconContainer}>
                    <ExpandMoreIcon className={classes.lowerEstimateIcon} />
                  </div>
                  <div className={classes.estimateHeader}>
                    Lower Range Estimate
                  </div>
                  <div className={classes.estimateLower}>
                    $
                    {data.low
                      .toString()
                      .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                  </div>
                </div>
                <div className={classes.estimateItem}>
                  <div className={classes.estimateIconContainer}>
                    <RemoveIcon className={classes.medEstimateIcon} />
                  </div>
                  <div className={classes.estimateHeader}>
                    Mid Range Estimate
                  </div>
                  <div className={classes.estimateMedium}>
                    $
                    {data.medium
                      .toString()
                      .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                  </div>
                </div>
                <div className={classes.estimateItem}>
                  <div className={classes.estimateIconContainer}>
                    <ExpandLessIcon className={classes.higherEstimateIcon} />
                  </div>
                  <div className={classes.estimateHeader}>
                    High Range Estimate
                  </div>
                  <div className={classes.estimateHigher}>
                    $
                    {data.high
                      .toString()
                      .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.flexIconContainer}>
          <div className={classes.flexIconChild}>
            <div className={classes.flexIconGroup}>
              <AccountBalanceWalletRoundedIcon className={classes.flexIcon} />
            </div>
            <div className={classes.flexIconTitle}>Get an unbiased opinion</div>
            <div className={classes.flexIconSub}>
              A fact-based calculation unique to your home
            </div>
          </div>
          <div className={classes.flexIconChild}>
            <div className={classes.flexIconGroup}>
              <SearchRoundedIcon className={classes.flexIcon} />
            </div>
            <div className={classes.flexIconTitle}>Time the market</div>
            <div className={classes.flexIconSub}>
              Hit your financial goals by selling when the price is right
            </div>
          </div>
          <div className={classes.flexIconChild}>
            <div className={classes.flexIconGroup}>
              <AccountBalanceRoundedIcon className={classes.flexIcon} />
            </div>
            <div className={classes.flexIconTitle}>Track your net worth</div>
            <div className={classes.flexIconSub}>
              Get a real-time valuation of your biggest asset: your home
            </div>
          </div>
        </div>

        <div className={classes.faqSection}>
          {[
            [
              "What’s myHomely Home Estimate?",
              "Home Estimate is today’s market value for a home calculated using myHomely artificial intelligence technology. The free Home Estimate includes supporting data such as a market update, economic conditions, actual selling prices of nearby sold homes aka comparables, and similar homes for sale now in neighborhood.",
            ],
            [
              "How accurate is myHomely Home Estimate?",
              "myHomely Home Estimate artificial intelligence algorithm considers over one million actual sold homes, and is on average over 80% accurate (R-Squared = 0.80; MAPE = 17%). myHomely Home Estimate isn’t a perfect science because nobody knows the true price of a home until it’s sold. That’s why myHomely Home Estimate gives you a middle, upper, and lower range for you to contextualize your home value.",
            ],
            [
              "What factors does myHomely Home Estimate consider?",
              `myHomely Home Estimate factors in your home’s most impactful selling features. Try editing any of them to see how your home’s value changes. Plus, myHomely Home Estimate considers comparable sold homes nearby, neighborhood market conditions, economic growth, and much more. myHomely Home Estimate doesn’t factor in photos, interior condition, upgrades, or unique features such as saunas.`,
            ],
            [
              "Where is myHomely Home Estimate available?",
              `myHomely Home Estimate is available all over the Canada. It works for condos, detached, semi-detached, and row and townhomes. To check if your home is covered, just enter your home address above.`,
            ],
            [
              `How often does myHomely Home Estimate change?`,
              `The myHomely Value Estimate updates every month unless a property sold in nearby neighborhood on myHomely. myHomely continuously updating and improving the artificial intelligence behind Home Estimate so you get the most accurate home value estimate.`,
            ],
          ].map((i) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.faqTitle}>{i[0]}</div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.faqDesc}>{i[1]}</div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div className={classes.disclaimer}>
          <div>
            <WarningIcon />
          </div>
          <div>
            Home Estimate is an indicative property price estimate based on
            historical sales prices and neighborhood data attributes. See our{" "}
            <span>
              <Link href="/termsofuse">Terms of Use</Link>
            </span>{" "}
            for more usage limitations
          </div>
        </div>
      </div>
    </Layout>
  );
}
