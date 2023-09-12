import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fuse from "fuse.js";

import { computeDistanceBetween } from "spherical-geometry-js";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("1070")]: {
      flexDirection: "column",
    },
  },
  relative: {
    position: "relative",
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    position: "relative",
  },
  rootInner: {
    padding: "2px 4px",
    width: 400,
    display: "flex",
    zIndex: 10,
    width: "28rem",
    [theme.breakpoints.down("1070")]: {
      width: "33.75rem",
      marginBottom: "1rem",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "0.5rem",
    },
    [theme.breakpoints.down("575")]: {
      width: "90vw",
      marginLeft: 0,
    },
  },
  iconButton: {
    padding: 10,
  },
  searchIcon: {
    color: "#249FFB",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontFamily: "Gilroy, sans-serif",
  },
  displayOn: {
    display: "block",
  },
  displayOff: {
    display: "none",
  },
  outputRoot: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  outputContainer: {
    zIndex: 10,
    position: "absolute",
    top: "3.5rem",
    width: "28rem",
    [theme.breakpoints.down("500")]: {
      width: "100%",
    },
  },
  outputInner: {
    background: "white",
    position: "relative",
    padding: "0.4rem",
    borderRadius: "0.25rem",
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    justifyContent: "flex-start",
    textAlign: "left",
    fontFamily: "Gilroy, sans-serif",
  },
  filterButtons: {
    display: "flex",
    [theme.breakpoints.down("570")]: {
      display: "none",
    },
  },
  firstFilterOptions: {
    display: "flex",
  },
  buttonFilter: {
    marginLeft: "0.5rem",
  },
  buttonInner: {
    paddingTop: "0.77rem",
    paddingBottom: "0.77rem",
    paddingLeft: "0.8rem",
    fontFamily: "Gilroy, sans-serif",
    textTransform: "none",
    color: "#A7A7A7",
  },
  moreFiltersSection: {
    display: "flex",
  },
  filterIcon: {
    display: "none",
    color: "#0CCC63",
    [theme.breakpoints.down("570")]: {
      display: "block",
    },
  },
}));

export default function searchWithFilters({
  allMarkers,
  targetLat,
  targetLng,
  updateRangeState,
  updateMarkerPoint,
  mapRef,
}) {
  // Mui Styles
  const classes = useStyles();
  // Function that takes all markers and returns and array of nearest markers (organized by distance away)
  const handleQuery = (lat, lng) => {
    const origin = new google.maps.LatLng(lat, lng);
    const organize = [];
    allMarkers.map((i) => {
      const latEnd = parseFloat(i.location.lat);
      const lngEnd = parseFloat(i.location.lng);
      const endpoint = new google.maps.LatLng(latEnd, latEnd);

      organize.push({
        distance: computeDistanceBetween(origin, endpoint),
        item: i,
      });
    });
    const sorted = organize
      .slice()
      .sort((a, b) => a.distance - b.distance)
      .slice();
    updateRangeState(sorted);
  };

  useEffect(() => {
    handleQuery(targetLat, targetLng);
  }, [allMarkers, targetLat, targetLng]);

  // Need to redefine the functionality of the original mapRef for pointers to change on map
  if (mapRef.current !== undefined) {
    mapRef.current.panTo(new google.maps.LatLng(targetLat, targetLng));
    mapRef.current.setZoom(13);
  }
  // Approximate String Matching
  const options = {
    includeScore: true,
    keys: ["address", "city", "state", "zip"],
  };
  const fuse = new Fuse(allMarkers, options);

  // If user clicks away from search box logic
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClickInput = () => {
    setOpen(true);
  };

  // Search Input Value
  const [searchValue, setSearchValue] = useState("");
  // Getting Approximate String Matching Results
  const [approxResults, setApproxResults] = useState([]);

  // If user presses enter, get the first search result
  const onSearchEnter = (e) => {
    e.preventDefault();
    if (approxResults.length !== 0) {
      updateSearchAndMap(approxResults[0]);
    }
  };

  // From an array item, pan to the location, pass the item to parent state, and set the search to the address
  const updateSearchAndMap = (i) => {
    setSearchValue(`${i.item.address}, ${i.item.city}, ${i.item.state}`);
    handleQuery(i.item.latitude, i.item.longitude);
    updateMarkerPoint({ lat: i.item.latitude, lng: i.item.longitude });
  };

  return (
    <div className={classes.root}>
      <div className={classes.relative}>
        {/*Search Bar*/}
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.container}>
            <Paper component="form" className={classes.rootInner}>
              <IconButton
                disabled
                aria-label="search"
                className={classes.iconButton}
              >
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
              <InputBase
                className={classes.searchInput}
                placeholder="Postal Code / Street Address / Landmark / City"
                fullWidth={true}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setApproxResults(fuse.search(e.target.value).slice(0, 5)); // Getting First 5 results from approximate string matching
                }}
                onClick={handleClickInput}
                value={searchValue}
                onKeyPress={(e) => {
                  e.key === "Enter" && onSearchEnter(e);
                }}
              />
              <IconButton
                disabled
                aria-label="search"
                className={classes.iconButton}
              >
                <FilterListIcon className={classes.filterIcon} />
              </IconButton>
            </Paper>
          </div>
        </ClickAwayListener>
        {/*Search Results from input*/}
        <div className={open ? classes.displayOn : classes.displayOff}>
          {approxResults.length !== 0 ? (
            <div className={classes.outputRoot}>
              <Paper className={classes.outputContainer}>
                <div className={classes.outputInner}>
                  {approxResults.map((i, index) => {
                    return (
                      <Button
                        className={classes.buttonContainer}
                        key={index}
                        onClick={() => {
                          console.log(i);
                          updateSearchAndMap(i);
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
      </div>
      {/*Filter Buttons*/}
      <div className={classes.filterButtons}>
        <div className={classes.firstFilterOptions}>
          <div>
            <Paper className={classes.buttonFilter}>
              <Button className={classes.buttonInner}>
                Price
                <ExpandMoreIcon />
              </Button>
            </Paper>
          </div>
          <div>
            <Paper className={classes.buttonFilter}>
              <Button className={classes.buttonInner}>
                Beds
                <ExpandMoreIcon />
              </Button>
            </Paper>
          </div>
          <div>
            <Paper className={classes.buttonFilter}>
              <Button className={classes.buttonInner}>
                Baths
                <ExpandMoreIcon />
              </Button>
            </Paper>
          </div>
        </div>

        <div className={classes.moreFiltersSection}>
          <div>
            <Paper className={classes.buttonFilter}>
              <Button className={classes.buttonInner}>
                Property Type
                <ExpandMoreIcon />
              </Button>
            </Paper>
          </div>
          <div>
            <Paper className={classes.buttonFilter}>
              <Button className={classes.buttonInner}>
                More Filters
                <ExpandMoreIcon />
              </Button>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
