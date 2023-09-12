import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import mapStyles from "../../components/mapStyles";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Stepper from "../../components/sellproperty/stepper";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "7rem",
    fontFamily: "Gilroy, sans-serif",
    marginBottom: "7rem",
  },
  main: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2rem",
    marginLeft: "2rem",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    [theme.breakpoints.down("1030")]: {
      flexDirection: "column",
    },
  },
  googleMapContainer: {
    width: "35rem",
    height: "25rem",
    marginRight: "2.5rem",
    [theme.breakpoints.down("1250")]: {
      width: "30rem",
      height: "20rem",
    },
    [theme.breakpoints.down("825")]: {
      marginRight: 0,
      marginBottom: "1rem",
    },
    [theme.breakpoints.down("600")]: {
      width: "20rem",
      height: "20rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "15rem",
      height: "15rem",
    },
    [theme.breakpoints.down("330")]: {
      width: "13rem",
      height: "20rem",
    },
  },
  container: {
    boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
    position: "relative",
    paddingRight: "3rem",
    paddingLeft: "3rem",
    paddingBottom: "3rem",
    paddingTop: "2rem",
    borderRadius: "0.75rem",
    maxWidth: "60rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("1250")]: {
      paddingRight: "1.5rem",
      paddingLeft: "1.5rem",
      paddingBottom: "1.5rem",
      paddingTop: "1.5rem",
    },
    [theme.breakpoints.down("750")]: {
      paddingRight: "2rem",
      paddingLeft: "2rem",
      paddingBottom: "2rem",
      paddingTop: "2rem",
      marginRight: "3rem",
      marginLeft: "3rem",
    },
    [theme.breakpoints.down("825")]: {
      flexDirection: "column",
    },
  },
  addressContainer: {},
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#08184A",
    [theme.breakpoints.down("1250")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.down("330")]: {
      fontSize: "1.6rem",
    },
  },
  address: {
    fontSize: "2rem",
    marginTop: "1.5rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("1250")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("330")]: {
      fontSize: "0.95rem",
      marginTop: "0.5rem",
    },
  },
  buttonContainer: {
    display: "flex",
  },
  confirmButton: {
    textTransform: "none",
    border: "0.15rem solid #249FFB",
    "&:hover": {
      background: "#249FFB",
    },
    fontFamily: "Gilroy",
    background: "#249FFB",
    padding: "1rem",
    color: "white",
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
    },
  },
  backButton: {
    marginLeft: "1rem",
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    border: "0.15rem solid #249FFB",
    color: "#249FFB",
    padding: "1rem",
    fontWeight: "bold",
    [theme.breakpoints.down("1258")]: {
      padding: "0.85rem",
      marginLeft: "1rem",
    },
    [theme.breakpoints.down("930")]: {
      padding: "0.65rem",
      fontSize: "0.8rem",
      marginLeft: "1rem",
    },
    [theme.breakpoints.down("350")]: {
      padding: "0.5rem",
      fontSize: "0.8rem",
    },
  },
  tileContainer: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
    borderRadius: "0.75rem",
    flexDirection: "column",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    marginRight: "1rem",
    [theme.breakpoints.down("1030")]: {
      marginRight: "2rem",
      marginLeft: "2rem",
      padding: "2rem",
    },
    [theme.breakpoints.down("825")]: {
      width: "33rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("600")]: {
      width: "20rem",
    },
    [theme.breakpoints.down("400")]: {
      width: "19rem",
    },
    [theme.breakpoints.down("330")]: {
      width: "17rem",
    },
  },
  tileTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.25rem",
    marginTop: "0.25rem",
    fontWeight: "bolder",
    color: "grey",
    [theme.breakpoints.down("1250")]: {
      fontSize: "1.3rem",
    },
  },
  tilePriceHigher: {
    color: "#94c879 ",
    fontSize: "1.75rem",
    fontWeight: "bold",
    [theme.breakpoints.down("1250")]: {
      fontSize: "1.5rem",
    },
  },
  tilePriceAverage: {
    color: " #048C41",
    fontSize: "1.75rem",
    fontWeight: "bold",
    [theme.breakpoints.down("1250")]: {
      fontSize: "1.5rem",
    },
  },
  tilePriceLower: {
    color: " #94c879",
    fontSize: "1.75rem",
    fontWeight: "bold",
    [theme.breakpoints.down("1250")]: {
      fontSize: "1.5rem",
    },
  },
  tileHeader: {
    fontSize: "2.4rem",
    fontWeight: "bold",
    color: "#08184A",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("1250")]: {
      fontSize: "2rem",
    },
  },
}));
export default function confirm() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (
      query.lat === undefined ||
      query.lng === undefined ||
      query.address === undefined
    ) {
      router.push("/sellproperty", undefined, { shallow: true });
    }
  }, []);

  const [address, setAddress] = useState("");

  const classes = useStyles();
  const mapContainerStyles = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: parseFloat(query.lat),
    lng: parseFloat(query.lng),
  };
  const libraries = ["places"];

  // Load Google Maps Script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries,
  });

  // Google maps options
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    gestureHandling: "cooperative",
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    getReverseGeocodingData(query.lat, query.lng);
    mapRef.current = map;
  }, []);

  const getReverseGeocodingData = (lat, lng) => {
    const latlng = new window.google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        setAddress("Error, Couldn't get Address");
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == window.google.maps.GeocoderStatus.OK) {
        console.log(results);
        var reverseAddress = results[0].formatted_address;
        setAddress(reverseAddress);
      }
    });
  };
  if (!isLoaded) return "Loading maps";
  if (loadError) return "Error loading maps";

  return (
    <Layout>
      <div className={classes.root}>
        <Stepper value={20} message={"Just Confirming Details"} />
        <div className={classes.flex}>
          <div className={classes.main}>
            <div className={classes.container}>
              <div className={classes.googleMapContainer}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyles}
                  zoom={10}
                  center={center}
                  options={options}
                  onLoad={onMapLoad}
                >
                  <Marker
                    position={center}
                    animation={window.google.maps.Animation.Qo}
                    icon={{
                      url: "/googleMapMarker.svg",
                      scaledSize: new window.google.maps.Size(60, 60),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(30, 30),
                    }}
                  />
                </GoogleMap>
              </div>

              <div className={classes.addressContainer}>
                <div className={classes.title}>Is this the right property?</div>
                <div className={classes.address}>{query.address}</div>
                <div className={classes.buttonContainer}>
                  <div>
                    <Link
                      href={{
                        pathname: "/sellproperty/start-listing",
                        query: {
                          address: query.address,
                          unit: query.unit,
                          lat: query.lat,
                          lng: query.lng,
                        },
                      }}
                    >
                      <Button className={classes.confirmButton}>Confirm</Button>
                    </Link>
                  </div>
                  <div>
                    <Link href="/sellproperty">
                      <Button className={classes.backButton}>Go Back</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
