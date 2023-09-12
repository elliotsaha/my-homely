import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import mapStyles from "./mapStyles";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Fuse from "fuse.js";

import { computeDistanceBetween } from "spherical-geometry-js";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "relative",
    marginBottom: "20rem",
  },
  mapContainerStyleHeight: {
    height: "55rem",
    [theme.breakpoints.down("1225")]: {
      height: "45rem",
    },
  },
  searchAbove: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "2.5rem",
  },
  searchRoot: {
    padding: "2px 4px",
    width: 400,
    display: "flex",
    zIndex: 10,
    marginRight: "1.2rem",
    marginLeft: "1.2rem",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    fontFamily: "Gilroy, sans-serif",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
    marginTop: 7,
  },
  searchOutputContainer: {
    position: "absolute",
    zIndex: 20,
    width: "25rem",
    top: "6rem",
    [theme.breakpoints.down("455")]: {
      width: "90%",
    },
  },
  searchOutputInner: {
    background: "white",
    position: "relative",
    padding: "0.4rem",
    borderRadius: "0.25rem",
    display: "flex",
    flexDirection: "column",
  },
  cardRoot: {
    position: "absolute",
    zIndex: 10,
    bottom: "-15rem",
    width: "100%",
  },
  searchOutputRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  displayOn: {
    display: "block",
  },
  displayOff: {
    display: "none",
  },
  searchButtonContainer: {
    justifyContent: "flex-start",
    textAlign: "left",
    fontFamily: "Gilroy, sans-serif",
  },
  // MAKING LOADING CLASS
}));

export default function googlemap() {
  const [pointData, setPointData] = useState();
  useEffect(() => {
    setPointData(markers);
  }, []);

  const updateMarkerData = (u) => {
    setPointData(u);
  };

  const classes = useStyles();
  const libraries = ["places"];
  const mapContainerStyles = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 34.9513,
    lng: -92.3809,
  };
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
    mapRef.current = map;
  }, []);

  const panTo = useCallback((lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  const [getPoint, setGetPoint] = useState({});

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div className={classes.mainContainer}>
      <Search
        panTo={panTo}
        center={center}
        clickPoint={getPoint}
        pointData={pointData}
        update={updateMarkerData}
      />
      <div className={classes.mapContainerStyleHeight}>
        <GoogleMap
          mapContainerStyle={mapContainerStyles}
          zoom={5}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {pointData.map((i) => {
            return (
              <Marker
                key={
                  i["latitude"] +
                  i["longitude"] +
                  new Date().toLocaleTimeString()
                }
                position={{ lat: i["latitude"], lng: i["longitude"] }}
                onClick={() => {
                  setGetPoint({ lat: i["latitude"], lng: i["longitude"] });
                }}
                animation={window.google.maps.Animation.Qo}
                label={
                  {
                    // text: ..
                    // className: ..
                  }
                }
                icon={{
                  url: "/googleMapMarker.svg",
                  scaledSize: new window.google.maps.Size(60, 60),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(30, 30),
                }}
                // onClick
              />
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}

function Search({ panTo, center, clickPoint, pointData, update }) {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["address", "city", "state", "zip"],
  };
  const fuse = new Fuse(pointData, options);

  const handleQuery = (lat, lng) => {
    const origin = new google.maps.LatLng(lat, lng);
    const organize = [];
    pointData.map((i) => {
      const endpoint = new google.maps.LatLng(i["latitude"], i["longitude"]);
      organize.push({
        distance: computeDistanceBetween(origin, endpoint),
        item: i,
      });
    });
    const sorted = organize
      .slice()
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
    setCards(sorted.slice());
  };

  useEffect(() => {
    if (Object.keys(clickPoint).length !== 0) {
      handleQuery(clickPoint.lat, clickPoint.lng);
      panTo(clickPoint.lat, clickPoint.lng);
    }
  }, [clickPoint]);
  useEffect(() => {
    handleQuery(center.lat, center.lng);
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClickInput = () => {
    setOpen(true);
  };
  console.log(open);

  const getPoint = (address, city, state, latitude, longitude, item) => {
    handleQuery(latitude, longitude, item),
      panTo(latitude, longitude),
      setSearch(`${address}, ${city}, ${state}`);
  };

  function onEnter(e) {
    e.preventDefault();
    if (value.length !== 0) {
      getPoint(
        value[0].item.address,
        value[0].item.city,
        value[0].item.state,
        value[0].item.latitude,
        value[0].item.longitude,
        value[0].item
      );
    }
  }
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.searchAbove}>
          <Paper component="form" className={classes.searchRoot}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search For Real Estate"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setOpen(true);
                }
                setValue(fuse.search(e.target.value).slice(0, 5));
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                e.key === "Enter" && onEnter(e);
              }}
              onClick={handleClickInput}
              value={search}
            />
            <IconButton
              disabled
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="filter"
            >
              <FilterListIcon />
            </IconButton>
          </Paper>
        </div>
      </ClickAwayListener>
      <div className={open ? classes.displayOn : classes.displayOff}>
        {value.length !== 0 ? (
          <div className={classes.searchOutputRoot}>
            <Paper className={classes.searchOutputContainer}>
              <div className={classes.searchOutputInner}>
                {value.map((i, index) => {
                  return (
                    <Button
                      className={classes.searchButtonContainer}
                      key={index}
                      onClick={() => {
                        getPoint(
                          i.item.address,
                          i.item.city,
                          i.item.state,
                          i.item.latitude,
                          i.item.longitude,
                          i.item
                        );
                      }}
                    >
                      <div>
                        {i.item.address}, {i.item.city}, {i.item.state}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Paper>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </React.Fragment>
  );
}
