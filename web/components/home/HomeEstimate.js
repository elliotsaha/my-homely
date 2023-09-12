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
} from "@material-ui/core";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
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
import RoomIcon from "@material-ui/icons/Room";
import mapStyles from "../../components/mapStyles";
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
      width: "40rem",
      borderRadius: "0.25rem",
      borderTopLeftRadius: 0,
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
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
      overflow: "visible",
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
    fieldFormik: {
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
    },
    googleMapContainer: {
      height: "25rem",
      width: "30rem",
    },
    dialog: {
      borderRadius: "0.5rem",
      height: "38.5rem",
    },
    dialogRoot: {
      padding: "3rem",
      position: "relative",
      fontFamily: "Gilroy, sans-serif",
      height: "100%",
      overflow: "none",
    },
    dialogTitle: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      paddingBottom: "1rem",
    },
    dialogButtonGroup: {
      display: "flex",
      justifyContent: "flex-end",
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
      marginTop: "4.5rem",
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
    },
  })
);

export default function HomeEstimate() {
  const classes = useStyles();
  const router = useRouter();
  const [rawBuyerInput, setRawBuyerInput] = useState("");
  const [buyerData, setBuyerData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAPIDialog, setOpenAPIDialog] = useState(false);
  const [currentPostalCode, setCurrentPostalCode] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState({});

  const onGetEstimate = (address) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (res, status) {
      if (status === "OK") {
        setCurrentAddress(res[0].formatted_address);
        res[0]?.address_components.map((i) => {
          console.log(res[0]);
          i.types.map((j) => {
            if (j === "postal_code") {
              setOpenDialog(true);
              setCurrentPostalCode(i.long_name.replace(/ /g, ""));
              setCurrentLocation(res[0].geometry.location);
            } else {
              console.log("invalid");
            }
          });
        });
      } else {
        return null;
      }
    });

    return null;
  };

  useEffect(() => {
    axios
      .post(
        "http://ec2-3-140-247-95.us-east-2.compute.amazonaws.com/predict_postalcode_house_price",
        {
          postalCode: currentPostalCode,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPostalCode]);

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

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // BUYER
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/search`, {
        address: rawBuyerInput,
      })
      .then((res) => {
        console.log(res);
        setBuyerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rawBuyerInput]);

  const BuyerSearchResults = ({ suggestions, loading }) => {
    if (rawBuyerInput === "") {
      return null;
    }

    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className={classes.buyerSearchResultsRoot}>
        {suggestions.map((i) => (
          <div className={classes.searchResultButtonContainer}>
            <Button
              fullWidth
              onClick={() => setRawBuyerInput(i.description)}
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

  return (
    <div className={classes.search}>
      <div className={classes.tabs}></div>

      <PlacesAutoComplete
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
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <div className={classes.buyerRoot}>
              <Paper elevation={0} className={classes.root}>
                <IconButton disableRipple>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Enter House Address"
                  className={classes.input}
                  value={rawBuyerInput}
                  onChange={(e) => {
                    setRawBuyerInput(e.target.value);
                  }}
                  {...getInputProps()}
                />
                <Button
                  className={classes.browseHomesButton}
                  onClick={() => onGetEstimate(rawBuyerInput)}
                >
                  Get Estimate
                </Button>
              </Paper>

              <BuyerSearchResults suggestions={suggestions} loading={loading} />
            </div>
          </>
        )}
      </PlacesAutoComplete>
      <Dialog
        onClose={() => setOpenDialog(false)}
        classes={{ paper: classes.dialog }}
        open={openDialog}
      >
        <div className={classes.dialogRoot}>
          <div className={classes.dialogTitle}>Is This Your Address?</div>
          <div className={classes.googleMapContainer}>
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
                  setOpenAPIDialog(true);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        onClose={() => setOpenAPIDialog(false)}
        classes={{ paper: classes.dialog }}
        open={openAPIDialog}
      >
        <div className={classes.dialogRoot}>
          <div className={classes.dialogTitle}>
            Your Estimated Property Price
          </div>
          <div className={classes.priceContainer}>
            <div>
              <div className={classes.dialogSub}>Lower Bound</div>
              <div className={classes.lowRange}>$709,129</div>
            </div>
            <div>
              <div className={classes.dialogSub}>Average Price</div>
              <div className={classes.medRange}>$1,129,617</div>
            </div>
            <div>
              <div className={classes.dialogSub}>Higher Bound</div>
              <div className={classes.highRange}>$1,328,380</div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              onClick={() =>
                router.push("/sellproperty").then(() => window.scrollTo(0, 0))
              }
              className={classes.firstPriorityButtonMargin}
            >
              Start Listing
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
