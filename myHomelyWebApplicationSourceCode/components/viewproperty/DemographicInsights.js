import React, { useCallback, useEffect, useState, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import NivoPieChart from "../nivoCharts";
import InsightMultiBar from "../sliders";
import formatCash from "../FormatCash";
// ICONS

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import MovieIcon from "@material-ui/icons/Movie";
import SchoolIcon from "@material-ui/icons/School";
import InfoIcon from "@material-ui/icons/Info";
import TollIcon from "@material-ui/icons/Toll";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import TimerIcon from "@material-ui/icons/Timer";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/BuildRounded";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import IconButton from "@material-ui/core/IconButton";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsTransitIcon from "@material-ui/icons/DirectionsTransit";
import DomainRoundedIcon from "@material-ui/icons/DomainRounded";
import WcRoundedIcon from "@material-ui/icons/WcRounded";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import TimerRoundedIcon from "@material-ui/icons/TimerRounded";
import DirectionsTransitRoundedIcon from "@material-ui/icons/DirectionsTransitRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
// MAP STYLES
import mapStyles from "../../components/mapStyles";

// GOOGLE MAPS

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
  MapContext,
  Polyline,
} from "@react-google-maps/api";
// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      marginTop: "5rem",
    },
    title: {
      color: "#08184A",
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.75rem",
    },
    tabLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      width: "12rem",
      fontSize: "1rem",
    },
    indicator: {
      backgroundColor: "#08184A",
    },
    twoLayout: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "-1.5rem",
    },
    twoLayoutGraph: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "-1.5rem",
      gap: "5rem",
      marginTop: "1.5rem",
    },
    typography: {
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
    },
    proximityGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    },
    proxGrid: {
      marginTop: "3rem",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      width: "100%",
      gap: "7.5rem",
      "& div": {
        fontFamily: "Gilroy, sans-serif",
        fontSize: "1.5rem",
        maxWidth: "15rem",
      },
      fontWeight: "bold",
    },
    proxIconSub: {
      fontSize: "3.1rem",
      color: "#08184A",
    },
    colorRed: {
      color: "#D13C3C",
      fontSize: "1.2rem",
    },
    colorGreen: {
      color: "#4DC298",
      fontSize: "1.2rem",
    },
    googleProxMap: {
      width: "65rem",
      height: "35rem",
      margin: 0,
    },
    proximityMapContainer: {
      position: "relative",
      marginLeft: "3.5rem",
    },
    proximityBox: {
      position: "absolute",
      width: "17.5rem",
      height: "19rem",
      background: "white",
      zIndex: 500,
      left: "0.75rem",
      bottom: "0.75rem",
      borderRadius: "1rem",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      fontFamily: "Gilroy, sans-serif",
      flexDirection: "column",
      padding: "0.75rem",
    },
    proxIcon: {
      color: "#08184A",
      fontSize: "4rem",
    },
    smallInput: {
      fontFamily: "Gilroy, sans-serif",
    },
    smallOutput: {
      overflow: "visible",
      position: "absolute",
      background: "white",
      boxShadow: "0px 2px 20px #ccc",
      borderRadius: "0.25rem",
      marginRight: "auto",
      padding: "0.25rem",
      top: "4rem",
    },
    proxContainer: {
      position: "relative",
    },
    outputButton: {
      justifyContent: "flex-start",
      textAlign: "left",
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
    },
    proxResults: {
      zIndex: 20,
      position: "absolute",
    },
    proximityTextInner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    commuteTitle: {
      fontWeight: "bold",
      fontSize: "1.4rem",
      color: "#08184A",
    },
    commuteTimeLabel: {
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      color: "#4DC298",
      fontWeight: "bold",
    },
    commuteTimeLabelNoRoutes: {
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      color: "#D13C3C",
      fontWeight: "bold",
    },
    inactiveEtaIcon: {
      fontSize: "2rem",
    },
    activeEtaIcon: {
      fontSize: "2rem",
      color: "#08184A",
    },
    proximityModeContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "0.25rem",
    },
    graphHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.2rem",
      marginBottom: "1rem",
    },
    graphHeaderIcon: {
      fontSize: "5rem",
      zIndex: -1,
    },
    graphHeaderIconSm: {
      fontSize: "3rem",
      zIndex: -1,
    },
    graphHeaderText: {
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      fontSize: "2rem",
      maxWidth: "20rem",
      lineHeight: "2.5rem",
    },
    nivoChart: {
      width: "45rem",
      height: "30rem",
      zIndex: 1,
    },
    nivoChartSingle: {
      width: "55rem",
      height: "30rem",
    },
    graphInner: {
      width: "45rem",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    responsivePieChartOverlay: {
      zIndex: -1,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      margin: "auto",
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.9rem",
      textAlign: "center",
      pointerEvents: "none",
    },
    singleLayoutColumn: {
      maxWidth: "35rem",
    },
    responsivePieChartMedian: {
      fontWeight: "bold",
      textAlign: "center",
    },
    responsivePieChartMedianSub: {
      fontSize: "0.9rem",
      letterSpacing: "0.1rem",
      textTransform: "uppercase",
      fontWeight: "medium",
      marginRight: "0.4rem",
    },
    singleLayoutGraph: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: "2rem",
    },
    singleGraphContainer: {
      display: "flex",
      marginLeft: "3.75rem",
      flexDirection: "column",
      gap: "2rem",
    },
    demographicParaTitle: {
      fontFamily: "Gilroy, sans-serif",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#08184A",
      lineHeight: "2.5rem",
      [theme.breakpoints.down("1400")]: {
        fontSize: "1.75rem",
      },
    },
    demographicPara: {
      fontFamily: "Gilroy, sans-serif",
      fontSize: "1.1rem",
      [theme.breakpoints.down("1400")]: {
        fontSize: "0.95rem",
      },
      color: "grey",
      marginTop: "1rem",
    },

    infoIcon: {
      verticalAlign: "middle",
      marginBottom: "0.2rem",
      color: "#08184A",
      marginLeft: "0.5rem",
    },

    demographicIcons: {
      fontSize: "5rem",
      color: "#08184A",
      [theme.breakpoints.down("1400")]: {
        fontSize: "3.5rem",
      },
    },
    employmentPercentageBlock: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: "3.75rem",
      marginBottom: "4rem",
    },
    employmentPercentageHeader: {
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      fontSize: "2rem",
      maxWidth: "30rem",
      lineHeight: "2.5rem",
      marginBottom: "1.5rem",
    },
    employmentIconContainer: {
      marginTop: "2rem",
    },
    incomeContainer: {
      marginLeft: "3.5rem",
    },
    incomeFlex: {
      display: "flex",
      gap: "8rem",
      flexDirection: "row",
      marginTop: "2.5rem",
    },

    demographicParaSubTitle: {
      fontFamily: "Gilroy, sans-serif",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#08184A",
      lineHeight: "2rem",
      [theme.breakpoints.down("1400")]: {
        fontSize: "1.2rem",
      },
    },
    demographicParaTitleGreen: {
      fontFamily: "Gilroy, sans-serif",
      marginTop: "1rem",
      marginBottom: "0.5rem",
      fontSize: "2.5rem",
      fontWeight: "bold",
      lineHeight: "2rem",
      color: "#85bb65",
      [theme.breakpoints.down("1400")]: {
        fontSize: "1.2rem",
      },
    },
    percentageOfFamiliesWithChildrenBar: {
      marginTop: "0.95rem",
      "& > div": {
        width: "25rem!important",
      },
    },
    incomeFlexInner: {
      display: "flex",
      flexDirection: "column",
      gap: "1.75rem",
    },
    nivoChartZIndex: {
      zIndex: 5,
    },

    graphInnerSm: {
      width: "31.5rem",
      display: "flex",
      flexDirection: "column",
      justifyItems: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    nivoChartSm: {
      width: "35rem",
      height: "25rem",
      zIndex: 1,
    },
    responsivePieChartMedianSubSm: {
      fontSize: "0.85rem",
      textTransform: "uppercase",
      fontWeight: "medium",
      marginRight: "0.4rem",
    },
    nivoChartLg: {
      width: "50rem",
      height: "30rem",
      zIndex: 1,
    },
  })
);

export default function DemographicInsights({ data, propertyData }) {
  const classes = useStyles();

  // Proximity Data Parent Setter
  const [proxData, setProxData] = useState();

  // Time Needed For Travel
  const [proxDuration, setProxDuration] = useState("");
  const ProxDataSetter = (e) => {
    setProxData(e);
  };

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
    "Convenience",
    "Dwelling",
    "Age & Marriage",
    "Education",
    "Employment",
    "Income",
    "Diversity",
  ];

  const mapRef = useRef();

  // Proximity Ref
  const onMapLoad = useCallback((map) => {
    const { google } = window;
    mapRef.current = map;
  }, []);

  // Proximity Map Container Styles
  const mapContainerStyles = {
    borderRadius: "0.75rem",
    width: "100%",
    height: "100%",
  };

  const [libraries] = useState(["places", "geometry", "directions"]);

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

  // Proximity Map Zoom State
  const [proxZoom, setProxZoom] = useState(10);

  // Directions for Proximity Map
  const [directions, setDirections] = useState("");

  // Proximity Mode of Travel
  const [proximityMode, setProximityMode] = useState("DRIVING");

  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();
    const locationOrigin = new google.maps.LatLng(
      propertyData.latitude,
      propertyData.longitude
    );

    DirectionsService.route(
      {
        origin: locationOrigin,
        destination: proxData,
        travelMode: google.maps.TravelMode[proximityMode],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setProxDuration(result.routes[0].legs[0].duration.text);
          setProxZoom(11);
          setDirections(result);
        } else {
          setDirections("");
          setProxDuration("No Routes Found");
        }
      }
    );
  }, [proxData, proximityMode]);

  // Proximity Mode of Travel Object Iteration
  const proximityModeList = [
    {
      mode: "DRIVING",
      icon: (
        <DriveEtaIcon
          className={
            proximityMode === "DRIVING"
              ? classes.activeEtaIcon
              : classes.inactiveEtaIcon
          }
        />
      ),
    },

    {
      mode: "BICYCLING",
      icon: (
        <DirectionsBikeIcon
          className={
            proximityMode === "BICYCLING"
              ? classes.activeEtaIcon
              : classes.inactiveEtaIcon
          }
        />
      ),
    },

    {
      mode: "TRANSIT",
      icon: (
        <DirectionsTransitIcon
          className={
            proximityMode === "TRANSIT"
              ? classes.activeEtaIcon
              : classes.inactiveEtaIcon
          }
        />
      ),
    },

    {
      mode: "WALKING",
      icon: (
        <DirectionsWalkIcon
          className={
            proximityMode === "WALKING"
              ? classes.activeEtaIcon
              : classes.inactiveEtaIcon
          }
        />
      ),
    },
  ];
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div>
          <div className={classes.title}>Neighborhood Highlights</div>
        </div>
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
                label={i}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>

        {/*TAB 1: PROXIMITY*/}

        <TabPanel value={value} index={0}>
          <div className={classes.twoLayout}>
            <div>
              <Typography
                component="h1"
                variant="h4"
                className={classes.typography}
              >
                Convenience
              </Typography>

              <div className={classes.proxGrid}>
                <div>
                  <div>
                    <MovieIcon className={classes.proxIconSub} />
                  </div>
                  Convenience to Entertainment:{" "}
                  <div
                    className={
                      data.proximity.avg[0] === "High"
                        ? classes.colorGreen
                        : classes.colorRed
                    }
                  >
                    {data.proximity.avg[0]}
                  </div>
                </div>
                <div>
                  <div>
                    <SchoolIcon className={classes.proxIconSub} />
                  </div>
                  Convenience to Education:{" "}
                  <div
                    className={
                      data.proximity.avg[1] === "High"
                        ? classes.colorGreen
                        : classes.colorRed
                    }
                  >
                    {data.proximity.avg[1]}
                  </div>
                </div>
                <div>
                  <div>
                    <AccountBalanceIcon className={classes.proxIconSub} />
                  </div>
                  Convenience to Commercial Services:{" "}
                  <div
                    className={
                      data.proximity.avg[2] === "High"
                        ? classes.colorGreen
                        : classes.colorRed
                    }
                  >
                    {data.proximity.avg[2]}
                  </div>
                </div>
                <div>
                  <div>
                    <FavoriteBorderIcon className={classes.proxIconSub} />
                  </div>
                  Convenience to Health Services:{" "}
                  <div
                    className={
                      data.proximity.avg[3] === "High"
                        ? classes.colorGreen
                        : classes.colorRed
                    }
                  >
                    {data.proximity.avg[3]}
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.proximityMapContainer}>
              <div className={classes.proximityBox}>
                <div className={classes.proximityTextInner}>
                  <div>
                    <HomeWorkRoundedIcon className={classes.proxIcon} />
                  </div>
                  <div className={classes.commuteTitle}>Calculate Commute</div>
                </div>
                {proxDuration !== "" && proxDuration !== "No Routes Found" ? (
                  <div className={classes.commuteTimeLabel}>{proxDuration}</div>
                ) : proxDuration === "No Routes Found" ? (
                  <div className={classes.commuteTimeLabelNoRoutes}>
                    No Routes Found
                  </div>
                ) : (
                  <div />
                )}
                <div className={classes.proximityModeContainer}>
                  {proximityModeList.map((i) => {
                    return (
                      <div>
                        <IconButton
                          onClick={() => {
                            if (proximityMode !== i.mode) {
                              setProximityMode(i.mode);
                            }
                          }}
                        >
                          {i.icon}
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Search ProxDataSetter={ProxDataSetter} classes={classes} />
                </div>
              </div>

              <div className={classes.googleProxMap}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyles}
                  zoom={proxZoom}
                  center={{
                    lat: propertyData.latitude,
                    lng: propertyData.longitude,
                  }}
                  options={options}
                  onLoad={onMapLoad}
                >
                  <Marker
                    position={{
                      lat: propertyData.latitude,
                      lng: propertyData.longitude,
                    }}
                    animation={window.google.maps.Animation.Qo}
                    icon={{
                      url: "/googleMapMarker.svg",
                      scaledSize: new window.google.maps.Size(60, 60),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(30, 30),
                    }}
                  />
                  {directions && (
                    <>
                      <Polyline
                        path={directions.routes[0].overview_path}
                        geodesic
                        options={{
                          strokeColor: "#249FFB",
                          strokeOpacity: 0.8,
                          strokeWeight: 5,
                          clickable: false,
                        }}
                      />
                      <Marker
                        position={proxData}
                        animation={window.google.maps.Animation.Qo}
                        icon={{
                          url: "/googleMapMarker.svg",
                          scaledSize: new window.google.maps.Size(60, 60),
                          origin: new window.google.maps.Point(0, 0),
                          anchor: new window.google.maps.Point(30, 30),
                        }}
                      />
                    </>
                  )}
                </GoogleMap>
              </div>
            </div>
          </div>
        </TabPanel>

        {/*TAB 2: DWELLING*/}
        <TabPanel value={value} index={1}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart
                  data={data.dwelling.privatelyOwned}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <HomeWorkRoundedIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>

            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart
                  data={data.dwelling.structuralType}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <DomainRoundedIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/*TAB 3: AGE & MARRIAGE*/}
        <TabPanel value={value} index={2}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart
                  data={data.marriageInsights.chart}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <WcRoundedIcon className={classes.graphHeaderIconSm} />
                  <div className={classes.responsivePieChartMedian}>
                    {data.marriageInsights.median}%
                  </div>
                  <div className={classes.responsivePieChartMedianSub}>
                    Married
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart
                  data={data.ageInsights.chart}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <DomainRoundedIcon className={classes.graphHeaderIconSm} />
                  <div className={classes.responsivePieChartMedian}>
                    {Math.ceil(data.ageInsights.median)}
                  </div>
                  <div className={classes.responsivePieChartMedianSub}>
                    Avg. Age
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/*TAB 4: EDUCATION*/}
        <TabPanel value={value} index={3}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart data={data.educationInsights} />

                <div className={classes.responsivePieChartOverlay}>
                  <SchoolRoundedIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>

            <div className={classes.graphInner}>
              <div className={classes.nivoChart}>
                <NivoPieChart data={data.occupationInsights} />

                <div className={classes.responsivePieChartOverlay}>
                  <BuildIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/*TAB 4: EMPLOYMENT*/}
        <TabPanel value={value} index={4}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInnerSm}>
              <div className={classes.nivoChartSm}>
                <NivoPieChart data={data.employmentInsights.employed} />
                <div className={classes.responsivePieChartOverlay}>
                  <WorkIcon className={classes.graphHeaderIconSm} />

                  <div className={classes.responsivePieChartMedianSub}>
                    Employed
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.graphInnerSm}>
              <div className={classes.nivoChartSm}>
                <NivoPieChart data={data.employmentInsights.commuteTimes} />

                <div className={classes.responsivePieChartOverlay}>
                  <TimerRoundedIcon className={classes.graphHeaderIconSm} />

                  <div className={classes.responsivePieChartMedianSub}>
                    Commute
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.graphInnerSm}>
              <div className={classes.nivoChartSm}>
                <NivoPieChart data={data.employmentInsights.transportation} />

                <div className={classes.responsivePieChartOverlay}>
                  <DirectionsTransitRoundedIcon
                    className={classes.graphHeaderIconSm}
                  />{" "}
                  <div className={classes.responsivePieChartMedianSub}>
                    Transit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/*TAB 5: INCOME*/}
        <TabPanel value={value} index={5}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInner}>
              <div className={classes.nivoChartLg}>
                <NivoPieChart
                  data={data.incomeInsights.chart}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <TollIcon className={classes.graphHeaderIconSm} />
                  <div className={classes.responsivePieChartMedian}>
                    ${formatCash(data.incomeInsights.avg)}
                  </div>
                  <div className={classes.responsivePieChartMedianSubSm}>
                    Avg. Family Income
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.graphInner}>
              <div className={classes.nivoChartLg}>
                <NivoPieChart
                  data={data.incomeInsights.familiesWithChildren}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <SupervisedUserCircleIcon
                    className={classes.graphHeaderIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/*TAB 6: DIVERSITY*/}
        <TabPanel value={value} index={6}>
          <div className={classes.twoLayoutGraph}>
            <div className={classes.graphInner}>
              <div className={classes.nivoChartLg}>
                <NivoPieChart
                  data={data.diversity.totalMinority}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <GroupRoundedIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>

            <div className={classes.graphInner}>
              <div className={classes.nivoChartLg}>
                <NivoPieChart
                  data={data.diversity.chart}
                  className={classes.nivoChartZIndex}
                />

                <div className={classes.responsivePieChartOverlay}>
                  <AccessibilityNewIcon className={classes.graphHeaderIcon} />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

function Search({ ProxDataSetter, classes }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const buttonOnClick = (description) => {
    clearSuggestions();
    getGeocode({ address: description })
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        const googleObject = new google.maps.LatLng(lat, lng);
        ProxDataSetter(googleObject);
      });
    setValue("");
  };
  return (
    <div className={classes.proxContainer}>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        label="Add Commute"
        className={classes.smallInput}
        InputLabelProps={{
          style: {
            fontFamily: "Gilroy, sans-serif",
          },
        }}
        variant="outlined"
      />

      <div className={classes.smallOutput}>
        {status === "OK" &&
          data.slice(0, 3).map((res) => (
            <Button
              className={classes.outputButton}
              onClick={() => {
                buttonOnClick(res.description);
              }}
            >
              {res.description}
            </Button>
          ))}
      </div>
    </div>
  );
}
