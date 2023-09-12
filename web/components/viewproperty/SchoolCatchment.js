import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
  MapContext,
  Polyline,
} from "@react-google-maps/api";
import kmOut from "../../utils/kmOut";
// MUI Icons
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
    },
    inner: {},
    title: {
      color: "#08184A",
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.75rem",
    },
    tabLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      width: "20rem",
      fontSize: "1rem",
    },
    tabs: {
      marginBottom: "2rem",
    },
    indicator: {
      backgroundColor: "#08184A",
    },

    schoolCatchmentHeaders: {
      display: "grid",
      maxWidth: "80rem",
      gridTemplateColumns: "1.1fr 0.3fr 0.4fr",
      gridTemplateRows: "1fr",
      fontWeight: "bold",
      fontSize: "1.25rem",
      marginTop: "0.75rem",
      marginBottom: "0.25rem",
      color: "grey",
      "& > div:nth-child(2)": {},
      "& > div:nth-child(3)": {
        marginLeft: "1rem",
      },
    },
    schoolGridContainer: {
      display: "grid",
      gridTemplateColumns: "1.1fr 0.3fr 0.4fr",
      maxWidth: "80rem",
      marginLeft: "-1.5rem",
      fontFamily: "Gilroy, sans-serif",
      alignContent: "center",
      [theme.breakpoints.down("840")]: {
        gridTemplateColumns: "1fr",
        "& > div": {
          marginTop: "0.7rem",
          marginBottom: "0.7rem",
        },
      },
    },
    schoolDetails: {
      display: "flex",
      flexDirection: "row",
    },
    TableButton: {
      background: "#edf0f5",
      width: "8.5rem",
      height: "2.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      textTransform: "none",
      color: "#585a5c",
      fontFamily: "Gilroy, sans-serif",
      borderRadius: "0.3rem",
      fontWeight: "bold",

      filter: "drop-shadow(0 0.1rem 0.25rem rgba(0, 0, 0, 0.05))",
    },
    tableButtonContainer: {
      marginTop: "auto",
      marginBottom: "auto",
    },
    naContainer: {
      width: "5.5rem",

      marginRight: "0.5rem",

      height: "2.4rem",
      marginTop: "auto",
      marginBottom: "auto",
      textAlign: "center",
      color: "white",
      background: "linear-gradient(270deg, #D3D3D3 4.5%, #BDBDBD 94.6%)",
      filter: "drop-shadow(0 0.1rem 0.25rem rgba(0, 0, 0, 0.15))",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "1.1rem",
      padding: "0.25rem",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem",
      marginLeft: "0.17rem",
      borderRadius: "0.3rem",
    },
    tableHr: {
      marginLeft: "-1.55rem",
      maxWidth: "70rem",
      border: "1px solid rgba(0, 0, 0, 0.15)",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    schoolName: {
      fontWeight: "bold",
      fontSize: "1.6rem",
      lineHeight: "2.1rem",
      maxWidth: "35rem",
    },
    schoolRating: {
      width: "5.5rem",

      marginRight: "0.5rem",

      height: "2.4rem",
      marginTop: "auto",
      marginBottom: "auto",
      textAlign: "center",
      color: "white",
      background: "linear-gradient(270deg, #249FFB 4.5%, #15C7DB 94.6%)",
      filter: "drop-shadow(0 0.1rem 0.25rem rgba(0, 0, 0, 0.15))",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "1.1rem",
      padding: "0.25rem",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem",
      marginLeft: "0.17rem",
      borderRadius: "0.3rem",
    },
    tableShowMore: {
      marginLeft: "-2rem",
      fontFamily: "Gilroy, sans-serif",
      marginTop: "0.5rem",
      color: "#249FFB",
      fontSize: "1rem",
      marginTop: "2rem",
    },
  })
);

function SchoolCatchment({ data }) {
  // All School States
  const [schools, setSchools] = useState([]);
  const [primarySchool, setPrimarySchool] = useState([]);
  const [secondarySchool, setSecoundarySchool] = useState([]);
  const [university, setUniversity] = useState([]);
  console.log(schools);
  // Pagination (Show More Button)
  const [schoolCatchmentPagination, setSchoolCatchmentPagination] = useState(5);

  // MUI a11y Tab Props
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  // MUI Tab Value
  const [value, setValue] = useState(0);

  // MUI Tab onChange Handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // MUI TabPanel
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // Array that holds the tab labels and the google map type for catchment zones
  const tabs = [
    {
      label: "primary",
      type: "primary_school",
    },

    {
      label: "secondary",
      type: "secondary_school",
    },

    {
      label: "university",
      type: "university",
    },
  ];

  const [libraries] = useState(["places", "geometry", "directions"]);
  // Load Google Maps Script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries,
  });

  // Function to load a google map and return school data
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    // Fake element for google maps to load
    const fakeElt = document.createElement("div");
    const { google } = window;
    const service = new google.maps.places.PlacesService(fakeElt);
    const location = new google.maps.LatLng(30.694491, 76.665095); // TODO: Replace with dynamic variabels in prod
    const nearbySearch = (type) => {
      service.nearbySearch(
        {
          location,
          rankBy: google.maps.places.RankBy.DISTANCE,
          type: type,
        },
        (res) => {
          const pushArray = [];
          res.map((i) => {
            pushArray.push({
              name: i.name,
              distanceAway: google.maps.geometry.spherical.computeDistanceBetween(
                location,
                i.geometry.location
              ),
              rating: i.rating,
            });
          });
          if (type === "school") {
            setSchools(pushArray);
          }
          if (type === "primary_school") {
            setPrimarySchool(pushArray);
          }
          if (type === "secondary_school") {
            setSecoundarySchool(pushArray);
          }
          if (type === "university") {
            setUniversity(pushArray);
          }
        }
      );
    };

    // Looping through tabs array and performing function call
    tabs.map((i) => {
      nearbySearch(i.type);
    });

    mapRef.current = map;
  }, []);

  const classes = useStyles();

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
  // Function to return a type of catchment
  const SchoolTab = ({ index, catchmentZone }) => {
    return (
      <TabPanel value={value} index={index}>
        <div>
          {catchmentZone.slice(0, schoolCatchmentPagination).map((i, index) => (
            <div>
              <div className={classes.schoolGridContainer}>
                <div className={classes.schoolName}>{i.name}</div>
                <div className={classes.tableButtonContainer}>
                  <div className={classes.TableButton}>
                    {kmOut(i.distanceAway)} away
                  </div>
                </div>
                <div className={classes.schoolDetails}>
                  {" "}
                  {i.rating !== undefined ? (
                    <div className={classes.schoolRating}>
                      <div>{i.rating} / 5</div>
                    </div>
                  ) : (
                    <div className={classes.naContainer}>
                      <div>N/A</div>
                    </div>
                  )}
                </div>
              </div>
              {console.log(index, schoolCatchmentPagination)}
              {index + 1 !== schoolCatchmentPagination ? (
                <hr className={classes.tableHr} />
              ) : (
                <></>
              )}
            </div>
          ))}
          <Button
            className={classes.tableShowMore}
            startIcon={
              schoolCatchmentPagination === 5 ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )
            }
            onClick={() => {
              if (schoolCatchmentPagination === 5) {
                setSchoolCatchmentPagination(20);
              } else {
                setSchoolCatchmentPagination(5);
              }
            }}
          >
            {schoolCatchmentPagination === 5 ? "Show More" : "Show Less"}
          </Button>
        </div>
      </TabPanel>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.title}>
          School Catchment Zones for {data.address}
        </div>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="School Catchment Zones"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.tabs}
            classes={{ indicator: classes.indicator }}
          >
            {tabs.map((i, index) => {
              return (
                <Tab
                  className={classes.tabLabel}
                  label={i.label}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </div>
        <div className={classes.schoolCatchmentHeaders}>
          <div>Name</div>
          <div>Distance Away</div>
          <div>Rating</div>
        </div>
        {/*All Tabs showing each catchment zone*/}
        <SchoolTab index={1} catchmentZone={primarySchool} />
        <SchoolTab index={2} catchmentZone={secondarySchool} />
        <SchoolTab index={3} catchmentZone={university} />
      </div>

      <div className={classes.googleMapContainer}>
        <GoogleMap zoom={10} onLoad={onMapLoad}></GoogleMap>
      </div>
    </div>
  );
}

export default SchoolCatchment;
