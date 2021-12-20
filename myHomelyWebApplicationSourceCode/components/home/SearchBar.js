import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import {
  InputBase,
  IconButton,
  Paper,
  Typography,
  MenuItem,
  Slider,
  TextField,
} from "@material-ui/core";
import { CheckboxWithLabel } from "formik-material-ui";
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
import RoomIcon from "@material-ui/icons/Room";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { ClickAwayListener } from "@material-ui/core";
import mapStyles from "../../components/mapStyles";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import HomeEstimate from "../../components/home/HomeEstimateModel";
import WarningIcon from "@material-ui/icons/Warning";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: "relative",
      zIndex: 9999,
      overflow: "visible",
    },
    root: {
      position: "relative",
      zIndex: 9999,
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
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
      [theme.breakpoints.down("950")]: {
        width: "40rem",
      },
      [theme.breakpoints.down("750")]: {
        width: "36rem",
        marginRight: "1.25rem",
      },
      [theme.breakpoints.down("650")]: {
        width: "30rem",
        marginRight: "2rem",
      },

      [theme.breakpoints.down("650")]: {
        width: "25rem",
        marginRight: "0.5rem",
      },

      [theme.breakpoints.down("430")]: {
        width: "22.5rem",
      },

      [theme.breakpoints.down("400")]: {
        width: "18rem",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    input: {
      width: "100%",
      marginRight: "0.4rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
      [theme.breakpoints.down("430")]: {
        fontSize: "0.85rem",
      },
    },
    searchResultIcon: {
      marginBottom: "0.25rem",
      color: "#484848",
    },
    tabs: {
      marginLeft: "-0.23rem",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      fontWeight: "bold",
    },
    activeTab: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      paddingRight: "1.75rem",
      paddingLeft: "1.75rem",
      textTransform: "none",
      background: "white",
      borderTopRightRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      fontSize: "1rem",
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      boxShadow:
        " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 10px rgba(0, 0, 0, 0.06),  0 22.3px 17.9px rgba(0, 0, 0, 0.072),  0 41.8px 33.4px rgba(0, 0, 0, 0.026),  0 100px 80px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        background: "white",
      },
      paddingTop: "0.8rem",
      [theme.breakpoints.down("780")]: {
        paddingRight: "1.5rem",
        paddingLeft: "1.5rem",
        textTransform: "none",
        fontSize: "0.7rem",
      },

      [theme.breakpoints.down("430")]: {
        marginBottom: "0.5rem",
        borderRadius: "1.2rem",
        paddingTop: "0.5rem",
      },

      [theme.breakpoints.down("400")]: {
        paddingRight: "0.65rem",
        paddingLeft: "0.4rem",
      },
    },
    InactiveTab: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      paddingRight: "1.75rem",
      paddingLeft: "1.75rem",
      textTransform: "none",
      borderTopRightRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      fontSize: "1rem",
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      color: "grey",
      paddingTop: "0.8rem",
      [theme.breakpoints.down("780")]: {
        paddingRight: "1.5rem",
        paddingLeft: "1.5rem",
        fontSize: "0.7rem",
      },
      [theme.breakpoints.down("430")]: {
        paddingRight: "0.4rem",
        paddingLeft: "0.4rem",
      },
    },
    chipContainer: {
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1.2rem",
      marginTop: "0.9rem",
    },
    noResultsInner: {
      padding: "0.3rem",
      color: "grey",
    },
    loadingSpinner: {
      color: "grey",
    },
    buyerSearchResultsRoot: {
      fontWeight: "bold",
      background: "white",
      position: "absolute",
      marginTop: "1rem",
      zIndex: 9999,
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
      [theme.breakpoints.down("650")]: {
        width: "25rem",
      },

      [theme.breakpoints.down("430")]: {
        width: "20rem",
      },

      [theme.breakpoints.down("400")]: {
        width: "17rem",
      },
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
      position: "absolute",
      marginTop: "1rem",
      zIndex: 4,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      padding: "1rem",
      flexDirection: "column",
      width: "30rem",
      borderRadius: "1rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      background: "white",
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
    fieldFormik: {
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
    formikGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0.75rem",
      marginTop: "1.25rem",
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1.5rem",
    },
    applySearchButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      background: "#249FFB",
      color: "white",
      padding: "1.1rem",
      "&:hover": {
        background: "#249FFB",
      },
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

      [theme.breakpoints.down("400")]: {
        fontSize: "0.75rem",
      },
    },
    buyerRoot: {
      position: "relative",
      overflow: "visible",
    },
    browseHomesButton: {
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
      [theme.breakpoints.down("950")]: {
        paddingTop: "0.45rem",
        paddingBottom: "0.45rem",
        paddingRight: "0.65rem",
        paddingLeft: "0.65rem",
        fontSize: "0.8rem",
      },
      [theme.breakpoints.down("650")]: {
        display: "none",
      },
    },
    browseHomesMobile: {
      display: "none",
      background: "#249FFB",
      color: "white",
      padding: "0.25rem",
      "&:hover": {
        background: "#249FFB",
      },
      [theme.breakpoints.down("650")]: {
        display: "block",
      },
    },
    iconButtonSearch: {
      [theme.breakpoints.down("430")]: {
        display: "none",
      },
    },
    googleMapContainer: {
      height: "25rem",
      width: "30rem",
      [theme.breakpoints.down("650")]: {
        width: "100%",
      },
    },
    smallDialog: {
      borderRadius: "0.5rem",
      padding: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
    },
    dialog: {
      overflow: "hidden",
      borderRadius: "0.5rem",
      height: "42.2rem",
    },
    dialogRoot: {
      padding: "3rem",
      position: "relative",
      fontFamily: "Gilroy, sans-serif",
      height: "100%",
      overflow: "none",
      [theme.breakpoints.down("400")]: {
        padding: "2rem",
      },
    },
    dialogInner: {
      marginTop: "10rem",
    },
    dialogTitle: {
      fontSize: "1.75rem",
      textAlign: "center",
      fontWeight: "bold",
      paddingBottom: "1rem",
      [theme.breakpoints.down("650")]: {
        fontSize: "1.6rem",
      },
    },
    dialogButtonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: "1.5rem",
      paddingBottom: "1rem",
      gap: "0.5rem",
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
    priceContainer: {
      marginTop: "2.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "1.5rem",
      "& > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
      [theme.breakpoints.down("950")]: {
        marginTop: "1rem",
      },
    },
    dialogSub: {
      fontWeight: "bold",
      fontSize: "1.6rem",
    },
    lowRange: {
      color: "#94c879",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    medRange: {
      color: "#048C41",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    highRange: {
      color: "#94c879",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      marginTop: "3rem",
    },
    firstPriorityButtonMargin: {
      textTransform: "none",
      padding: "1rem",
      paddingRight: "1.1rem",
      paddingLeft: "1.1rem",
      fontSize: "1rem",
      marginTop: "1.25rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
      [theme.breakpoints.down("950")]: {
        fontSize: "0.8rem",
        marginTop: "-1rem",
      },
    },
    displayNone: {
      display: "none",
    },
    disclaimer: {
      paddingTop: "2rem",
      paddingBottom: "1.5rem",
      display: "flex",
      gap: "1rem",
      color: "grey",
      "& span": {
        color: "#249FFB",
        fontWeight: "bold",
      },
      [theme.breakpoints.down("950")]: {
        fontSize: "0.8rem",
      },
    },
    unitHeader: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "1.8rem",
      maxWidth: "20rem",
      textAlign: "center",
      [theme.breakpoints.down("360")]: {
        fontSize: "1.45rem",
      },
    },
    selectContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
    },
    smDialogButtons: {
      display: "flex",
      gap: "1rem",
    },
    smDialogButtonFill: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #249FFB",
      padding: "1rem",
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      fontWeight: "bolder",
      background: "#249FFB",
      color: "white",
      "&:hover": {
        background: "#249FFB",
      },
    },
    smDialogButton: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #249FFB",
      padding: "1rem",
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      color: "#249FFB",
      fontWeight: "bolder",
    },
    ex: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    loadingContainer: {
      width: "30rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    estimateLoading: {
      marginTop: "auto",
      marginBottom: "auto",
      color: "grey",
    },
    errorContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "0.75rem",
    },
    errorIcon: {
      fontSize: "3rem",
      color: "#ff6961",
    },
    dialogSubSmall: {
      textAlign: "center",
      color: "grey",
      fontWeight: "bold",
      marginTop: "-0.25rem",
      fontSize: "1.1rem",
    },
    select: {
      width: "17.5rem",
    },
    shortDialog: {
      fontFamily: "Gilroy, sans-serif",
      padding: "3.5rem",
      borderRadius: "0.5rem",
      [theme.breakpoints.down("360")]: {
        padding: "2rem",
      },
    },
    tabIcon: {
      display: "block",

      [theme.breakpoints.down("650")]: {
        display: "none",
      },
    },
  })
);

export default function SearchBar() {
  const classes = useStyles();
  const router = useRouter();
  const [rawBuyerInput, setRawBuyerInput] = useState("");
  const [rawSellerInput, setRawSellerInput] = useState("");
  const [buyerSeller, setBuyerSeller] = useState("Home Estimate");
  const [buyerData, setBuyerData] = useState([]);
  const [openAPIDialog, setOpenAPIDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [clickAway, setClickAway] = useState(false);
  const [buyerLoading, setBuyerLoading] = useState(true);
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
    PriceMax: 5000000,
    SquareFeetMin: 0,
    SquareFeetMax: 15000,
    LotSize: 0,
    YearBuiltMin: 1800,
    YearBuiltMax: new Date().getFullYear(),
  });

  const [openFilter, setOpenFilter] = useState(false);

  const mapContainerStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "0.5rem",
  };

  // Google maps options
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    gestureHandling: "greedy",
  };
  // BUYER
  useEffect(() => {
    if (buyerSeller !== "Buyer") {
      setClickAway(false);
    }
  }, [rawBuyerInput]);

  const [unitNumber, setUnitNumber] = useState();

  useEffect(() => {
    setBuyerLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/search`, {
        address: rawBuyerInput,
      })
      .then((res) => {
        console.log(res.data);
        setBuyerData(res.data);
        setBuyerLoading(false);
      })
      .catch((err) => {
        console.log("AWDAWD", err);
      });
  }, [rawBuyerInput]);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [mapOkay, setMapOkay] = useState(false);
  useEffect(() => {
    setMapOkay(true);
  }, []);

  const ListPropertySearch = ({
    suggestions,
    getSuggestionItemProps,
    clickAway,
  }) => {
    if (rawBuyerInput === "") {
      return null;
    }

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
                setRawBuyerInput(i.description);
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

  const BuyerSearchResults = () => {
    if (clickAway) {
      return null;
    }
    if (rawBuyerInput === "") {
      return null;
    }
    if (buyerData?.length === 0) {
      return (
        <div className={classes.buyerSearchResultsRoot}>
          <div className={classes.noResultsInner}>No Results</div>
        </div>
      );
    }
    if (buyerLoading) {
      return (
        <div className={classes.buyerSearchResultsRoot}>
          <CircularProgress className={classes.loadingSpinner} size="2rem" />
        </div>
      );
    }
    return (
      <div className={classes.buyerSearchResultsRoot}>
        {buyerData.slice(0, 5).map((i) => (
          <div className={classes.searchResultButtonContainer}>
            <Button
              fullWidth
              onClick={() => {
                setRawBuyerInput(i.query.StreetAddress);
                setClickAway(true);
              }}
              className={classes.searchResultButton}
              startIcon={<RoomIcon className={classes.searchResultIcon} />}
            >
              {i.query.StreetAddress}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [unitYesDialogOpen, setUnitYesDialogOpen] = useState(false);
  const SellHomesOnClick = (input) => {
    setUnitDialogOpen(true);
  };

  const authLocalState = useRecoilValue(authState);

  const [estimatedLoading, setEstimatedLoading] = useState(null);

  const [currentEstimatePostalCode, setCurrentEstimatePostalCode] = useState(
    ""
  );

  console.log(currentEstimatePostalCode);

  useEffect(() => {
    if (buyerSeller === "Home Estimate") {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: rawBuyerInput }, function (res, status) {
        console.log("STATUS", status);
        console.log(res);
        if (status === "OK") {
          res[0]?.address_components.map((i) => {
            i.types.map((j) => {
              if (j === "postal_code") {
                setCurrentEstimatePostalCode(i.long_name.replace(/ /g, ""));
              } else {
                return null;
              }
            });
          });
        } else {
          return null;
        }
      });
    }
  }, [rawBuyerInput, buyerSeller]);

  const [propertyStyle, setPropertyStyle] = useState(4);

  const [selectPropertyStyleDialog, setSelectPropertyStyleDialog] = useState();

  const PropertyTypeMenu = [
    "Condomonium / Apartment",
    "Row House",
    "Semi Detached",
    "Single Family Detached",
  ];

  useEffect(() => {
    axios
      .post(
        "https://0oal6b8ejl.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalCode: currentEstimatePostalCode,
          propertyStyle: propertyStyle,
        }
      )
      .then((res) => {
        console.log(propertyStyle);
        setEstimatedLoading(res.data);
        console.log("DATA", res.data);
      })
      .catch((err) => {
        console.log("ERRRR", err);
      });
  }, [currentEstimatePostalCode, propertyStyle]);

  return (
    <div className={classes.search}>
      <div className={classes.tabs}>
        <Button
          className={
            buyerSeller === "Home Estimate"
              ? classes.activeTab
              : classes.InactiveTab
          }
          onClick={() => {
            setBuyerSeller("Home Estimate");
            if (buyerSeller !== "Home Estimate") {
              setRawBuyerInput("");
            }
          }}
          startIcon={<LocalAtmOutlinedIcon className={classes.tabIcon} />}
        >
          Home Estimate
        </Button>
        <Button
          className={
            buyerSeller === "Buyer" ? classes.activeTab : classes.InactiveTab
          }
          onClick={() => {
            setBuyerSeller("Buyer");
            if (buyerSeller !== "Buyer") {
              setRawBuyerInput("");
            }
          }}
          startIcon={<MonetizationOnOutlinedIcon className={classes.tabIcon} />}
        >
          Browse Homes
        </Button>
        <Button
          className={
            buyerSeller === "Seller" ? classes.activeTab : classes.InactiveTab
          }
          onClick={() => {
            setBuyerSeller("Seller");
            if (buyerSeller !== "Seller") {
              setRawBuyerInput("");
            }
          }}
          startIcon={<HomeWorkOutlinedIcon className={classes.tabIcon} />}
        >
          List Property
        </Button>
      </div>
      {buyerSeller === "Buyer" ? (
        <div className={classes.buyerRoot}>
          <Paper elevation={0} className={classes.root}>
            <IconButton disableRipple className={classes.iconButtonSearch}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Enter Address, Postal Code, City, Province"
              className={classes.input}
              value={rawBuyerInput}
              onChange={(e) => {
                setRawBuyerInput(e.target.value);
                setClickAway(false);
              }}
            />
            <Button
              className={classes.browseHomesButton}
              onClick={() => {
                router.push({
                  pathname: "/buyproperty",
                  query: { query: rawBuyerInput },
                });
              }}
            >
              Browse Homes
            </Button>

            <IconButton
              className={classes.browseHomesMobile}
              size="small"
              onClick={() => {
                router.push({
                  pathname: "/buyproperty",
                  query: { query: rawBuyerInput },
                });
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Paper>
          <ClickAwayListener onClickAway={() => setClickAway(true)}>
            <div>
              <BuyerSearchResults />
            </div>
          </ClickAwayListener>
        </div>
      ) : buyerSeller === "Seller" ? (
        <PlacesAutoComplete
          searchOptions={{
            componentRestrictions: { country: ["ca"] },
          }}
          value={rawBuyerInput}
          onChange={(address) => setRawBuyerInput(address)}
          ref={(c) => {
            if (!c) return;
            c.handleInputOnBlur = () => {};
          }}
          onSelect={(address) => {
            setRawBuyerInput(address);
          }}
        >
          {({
            getInputProps,
            suggestions,
            loading,
            getSuggestionItemProps,
          }) => (
            <>
              <Paper elevation={0} className={classes.root}>
                <IconButton disableRipple className={classes.iconButtonSearch}>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Enter Your Address"
                  className={classes.input}
                  onChange={(e) => {
                    setRawBuyerInput(e.target.value);
                  }}
                  value={rawBuyerInput}
                  {...getInputProps()}
                />

                <Button
                  className={classes.browseHomesButton}
                  onClick={SellHomesOnClick}
                >
                  Start Listing
                </Button>

                <IconButton
                  className={classes.browseHomesMobile}
                  size="small"
                  onClick={SellHomesOnClick}
                >
                  <ArrowForwardIcon />
                </IconButton>
                <Dialog
                  open={unitDialogOpen}
                  onClose={() => setUnitDialogOpen(false)}
                  classes={{ paper: classes.smallDialog }}
                >
                  <div className={classes.unitHeader}>
                    Does Your Home Have a unit number?
                  </div>
                  <div className={classes.smDialogButtons}>
                    <Button
                      className={classes.smDialogButtonFill}
                      onClick={() => {
                        setUnitYesDialogOpen(true);
                        setUnitDialogOpen(false);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      className={classes.smDialogButton}
                      onClick={() => {
                        router.push({
                          pathname: "/sellproperty",
                          query: { query: rawBuyerInput },
                        });
                      }}
                    >
                      No
                    </Button>
                  </div>
                  <div className={classes.ex}>
                    Ex. Condos, apartments, townhomes
                  </div>
                </Dialog>
                <Dialog
                  open={unitYesDialogOpen}
                  onClose={() => setUnitDialogOpen(false)}
                  classes={{ paper: classes.smallDialog }}
                >
                  <div className={classes.unitHeader}>Enter Unit Number</div>
                  <div>
                    <TextField
                      variant="outlined"
                      className={classes.input}
                      value={unitNumber}
                      label="Unit Number"
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      onChange={(e) => {
                        setUnitNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      className={classes.smDialogButton}
                      onClick={() => {
                        router.push({
                          pathname: "/sellproperty",
                          query: { query: rawBuyerInput, unit: unitNumber },
                        });
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </Dialog>
              </Paper>
              <ClickAwayListener onClickAway={() => setClickAway(true)}>
                <div>
                  <ListPropertySearch
                    suggestions={suggestions}
                    getSuggestionItemProps={getSuggestionItemProps}
                    clickAway={clickAway}
                  />
                </div>
              </ClickAwayListener>
            </>
          )}
        </PlacesAutoComplete>
      ) : (
        <PlacesAutoComplete
          searchOptions={{
            componentRestrictions: { country: ["ca"] },
          }}
          value={rawBuyerInput}
          onChange={(address) => setRawBuyerInput(address)}
          ref={(c) => {
            if (!c) return;
            c.handleInputOnBlur = () => {};
          }}
          onSelect={(address) => {
            setRawBuyerInput(address);
          }}
        >
          {({
            getInputProps,
            suggestions,
            loading,
            getSuggestionItemProps,
          }) => (
            <>
              <Paper elevation={0} className={classes.root}>
                <IconButton disableRipple className={classes.iconButtonSearch}>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Enter Your Address"
                  className={classes.input}
                  onChange={(e) => {
                    setRawBuyerInput(e.target.value);
                  }}
                  value={rawBuyerInput}
                  {...getInputProps()}
                />

                <Button
                  className={classes.browseHomesButton}
                  onClick={() => {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode(
                      { address: rawBuyerInput },
                      function (res, status) {
                        console.log("ESTIMATE", res);
                        if (status === "OK") {
                          setOpenDialog(true);
                          setCurrentLocation(res[0].geometry.location);
                        } else {
                          console.log("invalid");
                        }
                      }
                    );
                  }}
                >
                  Get Estimate
                </Button>

                <IconButton
                  className={classes.browseHomesMobile}
                  size="small"
                  onClick={() => {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode(
                      { address: rawBuyerInput },
                      function (res, status) {
                        console.log("ESTIMATE", res);
                        if (status === "OK") {
                          setOpenDialog(true);
                          setCurrentLocation(res[0].geometry.location);
                        } else {
                          console.log("invalid");
                        }
                      }
                    );
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Paper>

              <ClickAwayListener onClickAway={() => setClickAway(true)}>
                <div>
                  <ListPropertySearch
                    suggestions={suggestions}
                    getSuggestionItemProps={getSuggestionItemProps}
                    clickAway={clickAway}
                  />
                </div>
              </ClickAwayListener>

              <Dialog
                onClose={() => setOpenDialog(false)}
                classes={{ paper: classes.dialog }}
                open={openDialog}
              >
                <div className={classes.dialogRoot}>
                  <div className={classes.dialogTitle}>
                    Is This Your Address?
                  </div>
                  <div className={classes.googleMapContainer}>
                    {mapOkay && (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyles}
                        zoom={13}
                        center={currentLocation}
                        options={options}
                        onLoad={onMapLoad}
                      >
                        <Marker
                          position={currentLocation}
                          icon={{
                            url: "/googleMapMarker.svg",
                            scaledSize: new window.google.maps.Size(60, 60),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(30, 30),
                          }}
                        ></Marker>
                      </GoogleMap>
                    )}
                    <div className={classes.dialogButtonGroup}>
                      <Button
                        className={classes.goBack}
                        onClick={() => setOpenDialog(false)}
                      >
                        Go Back
                      </Button>
                      <Button
                        className={classes.continueButton}
                        onClick={() => {
                          setOpenDialog(false);
                          setSelectPropertyStyleDialog(true);
                          setPropertyStyle(4);
                        }}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog>

              <Dialog
                onClose={() => {
                  setSelectPropertyStyleDialog(false);
                }}
                classes={{ paper: classes.shortDialog }}
                open={selectPropertyStyleDialog}
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
                    onClick={() => setSelectPropertyStyleDialog(false)}
                  >
                    Go Back
                  </Button>
                  <Button
                    className={classes.continueButton}
                    onClick={() => {
                      setSelectPropertyStyleDialog(false);
                      if (authLocalState.auth) {
                        setOpenAPIDialog(true);
                      } else {
                        router.push("/login?needAuth=true");
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </Dialog>
              <Dialog
                onClose={() => setOpenAPIDialog(false)}
                classes={{ paper: classes.dialog }}
                open={openAPIDialog}
              >
                {estimatedLoading ? (
                  <div>
                    {estimatedLoading.statusCode === 200 && (
                      <div className={classes.dialogRoot}>
                        <div className={classes.dialogTitle}>
                          Your Estimated Property Price
                        </div>
                        <div className={classes.priceContainer}>
                          <div>
                            <div className={classes.dialogSub}>Lower Bound</div>
                            <div className={classes.lowRange}>
                              $
                              {estimatedLoading.body.low

                                .toString()
                                .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                            </div>
                          </div>
                          <div>
                            <div className={classes.dialogSub}>
                              Average Price
                            </div>
                            <div className={classes.medRange}>
                              $
                              {estimatedLoading.body.medium

                                .toString()
                                .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                            </div>
                          </div>
                          <div>
                            <div className={classes.dialogSub}>
                              Higher Bound
                            </div>
                            <div className={classes.highRange}>
                              $
                              {estimatedLoading.body.high
                                .toString()
                                .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                            </div>
                          </div>
                        </div>
                        <div className={classes.buttonContainer}>
                          <Button
                            onClick={() =>
                              router
                                .push(`/sellproperty?query=${rawBuyerInput}`)
                                .then(() => window.scrollTo(0, 0))
                            }
                            className={classes.firstPriorityButtonMargin}
                          >
                            List Your Property For Free
                          </Button>
                        </div>
                        <div className={classes.disclaimer}>
                          <WarningIcon />
                          <div>
                            Home Estimate is an indicative property price
                            estimate based on historical sales prices and
                            neighborhood data attributes. See our{" "}
                            <span>
                              <Link href="termsofservice">Terms of Use</Link>
                            </span>{" "}
                            for more details
                          </div>
                        </div>
                      </div>
                    )}

                    {estimatedLoading &&
                      estimatedLoading.message !== "Success!" && (
                        <div className={classes.dialogRoot}>
                          <div className={classes.dialogInner}>
                            <div className={classes.errorContainer}>
                              <ErrorOutlineIcon className={classes.errorIcon} />
                            </div>
                            <div className={classes.dialogTitle}>
                              Sorry, Our Estimates Are Not Avaliable For This
                              Address
                            </div>
                            <div className={classes.dialogSubSmall}>
                              Check Back Soon.
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className={classes.loadingContainer}>
                    <CircularProgress className={classes.estimateLoading} />
                  </div>
                )}
              </Dialog>
            </>
          )}
        </PlacesAutoComplete>
      )}
    </div>
  );
}
