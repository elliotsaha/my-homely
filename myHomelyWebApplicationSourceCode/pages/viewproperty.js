import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import Axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "../components/mapStyles";
import getData from "../components/viewproperty/getData";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Link from "next/link";
import { Button, Tabs, Tab, Box, Typography } from "@material-ui/core";
// MUI Icons
import DomainIcon from "@material-ui/icons/Domain";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import TrafficIcon from "@material-ui/icons/Traffic";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MoneyIcon from "@material-ui/icons/Money";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import KingBedIcon from "@material-ui/icons/KingBed";
import BathtubIcon from "@material-ui/icons/Bathtub";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsTransitIcon from "@material-ui/icons/DirectionsTransit";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreateIcon from "@material-ui/icons/Create";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";
import StarIcon from "@material-ui/icons/Star";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import { Dialog } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import { isMobile, isTablet } from "react-device-detect";
import CloseIcon from "@material-ui/icons/Close";
import NivoPieChart from "../components/nivoCharts";
import { useRecoilValue } from "recoil";
import { authState } from "../components/states";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import EContractModalComponent from "../components/econtract/modal";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ConfirmDialog from "../components/viewproperty/ConfirmDialog";
import RequestTimeDialog from "../components/viewproperty/RequestOwnTimeDialog";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import moment from "moment";
import ChatIcon from "@material-ui/icons/Chat";
import ChatDialog from "../components/viewproperty/chatDialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import RoomIcon from "@material-ui/icons/Room";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import GetMortgagePreapproval from "../components/viewproperty/getMortgagePreapproval";
import FlagIcon from "@material-ui/icons/Flag";
import EmailIcon from "@material-ui/icons/Email";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import SignInSnackbar from "../components/signin";
import Covid19Notice from "../components/legals/covid19";
import TOSModal from "../components/legals/TOSModel";
import PrivacyPolicyModal from "../components/legals/PrivacyPolicyModel";

export default function ViewProperty() {
  // GOOGLE MAPS
  const mapRef = useRef();

  // All School States
  const [primarySchool, setPrimarySchool] = useState([]);
  const [secondarySchool, setSecoundarySchool] = useState([]);
  const [university, setUniversity] = useState([]);

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

  // MUI Vertical Tabs
  const [neighborHoodHighlightsTabs, setNeighborHoodHighlightsTabs] = useState(
    0
  );

  function VerticalTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
  function VerticalA11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  // Array that holds the tab labels and the google map type for catchment zones
  const schoolCatchmentTabs = [
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
  // Getting Object Property Data from ID Query
  const [propertyData, setPropertyData] = useState();
  // Proximity Ref
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fakeElt = document.createElement("div");
    const { google } = window;

    const service = new google.maps.places.PlacesService(fakeElt);

    const nearbySearch = (type, location) => {
      service.nearbySearch(
        {
          location,
          rankBy: google.maps.places.RankBy.DISTANCE,
          type: type,
        },
        (res) => {
          const pushArray = [];
          if (
            res !== "ZERO_RESULTS" &&
            res !== "OVER_QUERY_LIMIT" &&
            res !== "REQUEST_DENIED" &&
            res !== "INVALID_REQUEST" &&
            res !== "UNKNOWN_ERROR" &&
            res !== null
          ) {
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
        }
      );
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: propertyData?.query?.StreetAddress },
      function (results, status) {
        if (status == "OK") {
          schoolCatchmentTabs.map((i) => {
            nearbySearch(i.type, results[0].geometry.location);
          });
        }
      }
    );
  }, [mapRef, propertyData]);

  // Proximity Map Container Styles
  const mapContainerStyles = {
    borderRadius: "0.75rem",
    width: "100%",
    height: "100%",
  };

  const offerList = [
    {
      icon: <AccountBalanceIcon />,
      title: "Custom Offer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      href: "/learn",
    },
    {
      icon: <CreateIcon />,
      title: "E-Sign Offer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      href: "/learn",
    },
  ];
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
  console.log("propertydata", propertyData?._id);

  // Nextjs router declaration
  const { query, push, asPath } = useRouter();
  // Material UI Styles Declaration
  const classes = useStyles();

  // Loading State
  const [loading, setLoading] = useState(true);

  // Get Property Data Call
  useEffect(() => {
    if (query.id) {
      Axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/getFormByID`,
        {
          id: query.id,
        }
      )
        .then((res) => {
          setPropertyData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setPropertyData(null);
        });
    }
  }, [query]);

  // Geometry
  const [coordinates, setCoordinates] = useState({});

  // Get Field Data
  const [postalCode, setPostalCode] = useState("");
  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: propertyData?.query?.StreetAddress },
      function (results, status) {
        if (status == "OK") {
          setCoordinates(results[0].geometry.location);
          results[0].address_components.map((i) => {
            i.types.map((j) => {
              if (j === "postal_code") {
                if (i.short_name) {
                  let postalCode = i.short_name.replace(/ /g, "");
                  setPostalCode(postalCode);
                } else {
                  let postalCode = i.long_name.replace(/ /g, "");
                  setPostalCode(postalCode);
                }
              }
            });
          });
        } else {
          setLoading(true);
        }
      }
    );
  }, [propertyData]);
  // Demographic Data
  const demographicData = getData(postalCode);
  // Proximity Map Zoom State
  const [proximityZoom, setProximityZoom] = useState(10);

  // Directions for Proximity Map
  const [directions, setDirections] = useState("");

  // Proximity Mode of Travel
  const [proximityMode, setProximityMode] = useState("DRIVING");

  // Proximity Data Parent Setter
  const [proxData, setProxData] = useState();

  // Time Needed For Travel
  const [proxDuration, setProxDuration] = useState("");

  const ProxDataSetter = (e) => {
    setProxData(e);
  };
  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: coordinates,
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
  }, [proxData, proximityMode, coordinates]);

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

  // Commute Time Input
  const [commuteAddress, setCommuteAddress] = useState("");
  const [commuteSelected, setCommuteSelected] = useState("");
  const [clickAway, setClickAway] = useState(false);
  const [commuteTimes, setCommuteTimes] = useState({
    propertyDetails: "",
    directions: [],
  });
  const [preapprovalOpen, setPreapprovalOpen] = useState(false);

  const [matterportDialog, setMatterportDialog] = useState(false);
  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();

    const arr = ["DRIVING", "TRANSIT", "BICYCLING", "WALKING"];

    setCommuteTimes({
      propertyDetails: "",
      directions: [],
    });

    arr.map((i) => {
      DirectionsService.route(
        {
          origin: propertyData?.query?.StreetAddress,
          destination: commuteSelected,
          travelMode: google.maps.TravelMode[i],
        },
        (result, status) => {
          let copy = { ...commuteTimes };
          if (status === google.maps.DirectionsStatus.OK) {
            copy.propertyDetails = commuteSelected;
            copy.directions.push({
              status: "OK",
              method: i,
              duration: result.routes[0].legs[0].duration.text,
            });
            setCommuteTimes(copy);
          } else {
            let copy = { ...commuteTimes };

            copy.propertyDetails = commuteSelected;
            copy.directions.push({
              status: "NULL",
              method: i,
              duration: null,
            });

            setCommuteTimes(copy);
          }
        }
      );
    });
  }, [commuteSelected]);

  const getCommuteTimes = async (address) => {};

  const ListPropertySearch = ({
    suggestions,
    getSuggestionItemProps,
    clickAway,
  }) => {
    if (commuteAddress === "") {
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
                setCommuteSelected(i.description);
                setCommuteTimes({ propertyDetails: "", directions: [] });
                getCommuteTimes(i.description);
                setCommuteAddress("");
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

  // School Tab
  const [sliceVal, setSliceVal] = useState(5);

  // Seller Profile
  const [sellerProfile, setSellerProfile] = useState({});

  useEffect(() => {
    // Getting Seller Information from email
    if (propertyData?.sentBy) {
      Axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/getSeller`, {
        email: propertyData?.sentBy,
      })
        .then((res) => {
          setSellerProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [propertyData]);

  // School Catchment
  const [schoolCatchmentTab, setSchoolCatchmentTab] = useState(0);
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const [openKeyFeatures, setOpenKeyFeatures] = useState(false);

  const [openPhotos, setOpenPhotos] = useState(false);

  const authLocalState = useRecoilValue(authState);
  // Loading
  useEffect(() => {
    // TODO: Have better handler for loadError (Google Maps)
    if (propertyData === null) {
      push("/buyproperty");
    } else {
      setLoading(false);
    }
  }, [propertyData]);

  useEffect(() => {
    if (loading) {
      return <Loading />;
    }
  }, [loading]);

  const [inPerson, setInPerson] = useState(true);

  const keyFeaturesData = [
    {
      icon: <DomainIcon />,
      title: "Property Type",
      res: propertyData?.query?.PropertyType,
    },
    {
      icon: <CalendarTodayIcon />,
      title: "Year Built",
      res: propertyData?.query?.YearBuilt,
    },
    {
      icon: <MoneyIcon />,
      title: "Property Tax",
      res:
        "$" +
        propertyData?.query?.PropertyTax.toString().replace(
          /\d{1,3}(?=(\d{3})+(?!\d))/g,
          "$&,"
        ),
    },
    {
      icon: <LocalParkingIcon />,
      title: "Garage Spaces",
      res: propertyData?.query?.GarageSpaces,
    },
    {
      icon: <LocationCityIcon />,
      title: "Property Stories",
      res: propertyData?.query?.Stories,
    },
    {
      icon: <TrafficIcon />,
      title: "Lot Size",
      res: `${parseFloat(propertyData?.query?.LotSize.width).toFixed(
        2
      )} x ${parseFloat(propertyData?.query?.LotSize.length).toFixed(2)} ${
        propertyData?.query.LotSize.unit === "Square Meter" ? "sqm" : "sqft"
      }`,
    },
    {
      icon: <StoreMallDirectoryIcon />,
      title: "House Build Size",
      res: `${(
        propertyData?.query.HouseSize.width *
        propertyData?.query.HouseSize.length
      )
        .toString()
        .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")} ${
        propertyData?.query.HouseSize.unit === "Square Meter" ? "sqm" : "sqft"
      }`,
    },
    {
      icon: <VerticalAlignBottomIcon />,
      title: "Basement",
      res: propertyData?.query?.Basement === false ? "None" : "Yes",
    },
    {
      icon: <KingBedIcon />,
      title: "Bedrooms",
      res: propertyData?.query?.Bedrooms,
    },
    {
      icon: <BathtubIcon />,
      title: "Bathrooms",
      res: propertyData?.query?.Bathrooms,
    },
  ];

  const SchoolTab = ({ index, catchmentZone }) => {
    const kmOut = (m) => {
      if (m < 1000) {
        return `${m.toFixed(1)}m`;
      } else {
        return `${(m / 1000).toFixed(1)}km`;
      }
    };

    return (
      <TabPanel value={schoolCatchmentTab} index={index}>
        <div className={classes.schoolCatchment__container}>
          {catchmentZone.slice(0, sliceVal).map((i, index) => {
            return (
              <>
                <div className={classes.schoolCatchment__itemContainer}>
                  <div className={classes.schoolCatchment__name}>{i.name}</div>
                  <div
                    className={classes.schoolCatchment__distanceRatingContainer}
                  >
                    <div className={classes.schoolCatchment__distanceAway}>
                      {kmOut(i.distanceAway)}
                    </div>
                    <div className={classes.schoolCatchment__rating}>
                      {i.rating ? i.rating : "N/A"}
                    </div>
                  </div>
                </div>
                {index + 1 === sliceVal ? null : (
                  <div className={classes.schoolCatchment__divider} />
                )}
              </>
            );
          })}
          {catchmentZone.length <= 5 ? null : (
            <Button
              className={classes.schoolCatchment__button}
              onClick={() => {
                if (sliceVal === 5) {
                  setSliceVal(20);
                } else {
                  setSliceVal(5);
                }
              }}
            >
              {sliceVal === 5 ? (
                <div className={classes.schoolCatchment__buttonInner}>
                  <KeyboardArrowDownIcon /> <div>Show More</div>
                </div>
              ) : (
                <div className={classes.schoolCatchment__buttonInner}>
                  <KeyboardArrowUpIcon /> <div>Show Less</div>
                </div>
              )}
            </Button>
          )}
        </div>
      </TabPanel>
    );
  };

  const KeyFeaturesDialog = () => {
    const classes = useStyles();

    let optionalDataMap = [
      {
        title: "Electricity & Lighting",
        data: propertyData?.query["Electricity & Lighting"]["Options"],
      },
      {
        title: "Heating & Cooling",
        data: propertyData?.query["Heating & Cooling"]["Options"],
      },
      {
        title: "Doors & Windows",
        data: propertyData?.query["Doors & Windows"]["Options"],
      },
      {
        title: "Exterior Features",
        data: propertyData?.query["Exterior Features"]["Options"],
      },
      {
        title: "Roof & Foundation",
        data: propertyData?.query["Roof & Foundation"]["Options"],
      },
      {
        title: "Kitchen",
        data: propertyData?.query["Kitchen"]["Options"],
      },
      {
        title: "Flooring",
        data: propertyData?.query["Kitchen"]["Options"],
      },
      {
        title: "Other Features",
        data: propertyData?.query["Other Features"]["Options"],
      },
    ];

    const sizeData = [
      {
        title: "House Size",
        width: propertyData?.query["HouseSize"]["width"],
        length: propertyData?.query["HouseSize"]["length"],
        unit: propertyData?.query["HouseSize"]["unit"],
      },
      {
        title: "Living Area",
        width: propertyData?.query["LivingArea"]["width"],
        length: propertyData?.query["LivingArea"]["length"],
        unit: propertyData?.query["LivingArea"]["unit"],
      },
      {
        title: "Lot Size",
        width: propertyData?.query["LotSize"]["width"],
        length: propertyData?.query["LotSize"]["length"],
        unit: propertyData?.query["LotSize"]["unit"],
      },
    ];

    const singleData = [
      {
        title: "Property Type",
        data: "PropertyType",
      },
      {
        title: "Year Built",
        data: "YearBuilt",
      },
      {
        title: "Bedrooms",
        data: "Bedrooms",
      },
      {
        title: "Bathrooms",
        data: "Bathrooms",
      },
      {
        title: "Garage Spaces",
        data: "GarageSpaces",
      },
      {
        title: "Parking Spaces",
        data: "ParkingSpaces",
      },
      {
        title: "Basement",
        data: "Basement",
      },
    ];
    const SingleTemplate = ({ title, data }) => {
      let APIData = propertyData?.query[data];
      return (
        <div>
          {APIData ? (
            <>
              <div className={classes.keyFeaturesDialog__subHeader}>
                {title}
              </div>
              <div className={classes.keyFeaturesDialog__text}>{APIData}</div>

              <div>
                <hr />
              </div>
            </>
          ) : null}
        </div>
      );
    };

    return (
      <Dialog
        onClose={() => setOpenKeyFeatures(false)}
        open={openKeyFeatures}
        classes={{ paper: classes.keyFeaturesDialog }}
      >
        <div className={classes.keyFeaturesDialog__header}>Amenities</div>
        {propertyData ? (
          <div>
            {singleData.map((i) => (
              <SingleTemplate title={i.title} data={i.data} />
            ))}
            <div className={classes.keyFeaturesDialog__subHeader}>
              Property Tax
            </div>
            <div className={classes.keyFeaturesDialog__text}>
              ${propertyData?.query?.PropertyTax}
            </div>
            <div>
              <hr />
            </div>
            <div className={classes.keyFeaturesDialog__spacer} />
            {sizeData.map((i) => (
              <div>
                <div className={classes.keyFeaturesDialog__subHeader}>
                  {i.title}
                </div>
                <div className={classes.keyFeaturesDialog__text}>
                  {parseFloat(i.width).toFixed(2)} x{" "}
                  {parseFloat(i.length).toFixed(2)} {i.unit}
                </div>
                <hr />
              </div>
            ))}
            <div className={classes.keyFeaturesDialog__spacer} />
            {optionalDataMap.map((i) => (
              <div>
                <div className={classes.keyFeaturesDialog__subHeader}>
                  {i.title}
                </div>
                {Object.entries(i.data).map((entry) => {
                  if (entry[1]) {
                    return (
                      <div>
                        <div className={classes.keyFeaturesDialog__text}>
                          {entry[0]}
                        </div>
                        <div>
                          <hr />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        ) : null}
      </Dialog>
    );
  };

  const SeeAllPhotosDialog = () => {
    const classes = useStyles();

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 5000, min: 1500 },
        items: 4,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 600 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
      },
    };

    return (
      <Dialog
        onClose={() => setOpenPhotos(false)}
        open={openPhotos}
        fullWidth
        classes={{ paper: classes.seeAllPhotos }}
      >
        <div className={classes.seeAllPhotos__grid}>
          {propertyData
            ? propertyData?.query?.HouseImages.map((i) => (
                <img
                  src={i}
                  alt="Property"
                  className={classes.seeAllPhotos__image}
                />
              ))
            : null}
        </div>
      </Dialog>
    );
  };

  const [favouriteActive, setFavouriteActive] = useState(false);
  const [disabledFavourite, setDisabledFavourite] = useState(true);

  useEffect(() => {
    Axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/getFavourites`, {
      withCredentials: true,
    })
      .then((res) => {
        res.data.map((i) => {
          if ((query.id = i._id)) {
            return setFavouriteActive(true);
          }
        });
      })
      .catch((err) => console.log(err));

    setDisabledFavourite(false);
  }, [query]);

  const [openVerifySnackbar, setOpenVerifySnackbar] = useState(false);
  const [openAuthSnackbar, setOpenAuthSnackbar] = useState(false);

  const [covidOpen, setCovidOpen] = useState(false);
  const [reqTOSModalOpen, setReqTOSModalOpen] = useState(false);
  const [reqPrivacyModalOpen, setReqPrivacyModalOpen] = useState(false);
  const onStar = () => {
    if (
      authLocalState.auth &&
      authLocalState.emailVerified &&
      authLocalState.phoneVerified
    ) {
      if (favouriteActive) {
        Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/removeFavourite`,
          {
            id: query.id,
          },
          { withCredentials: true }
        )
          .then((res) => setFavouriteActive(false))
          .catch((err) => console.log(err));
      } else {
        Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/setFavourite`,
          {
            id: query.id,
          },
          { withCredentials: true }
        )
          .then((res) => setFavouriteActive(true))
          .catch((err) => console.log(err));
      }
    } else {
      if (authLocalState.auth) {
        setOpenVerifySnackbar(true);
      } else {
        setOpenVerifySnackbar(false);
      }
      setOpenAuthSnackbar(true);
    }
  };

  const [shareOpen, setShareOpen] = useState(false);
  const onShare = () => {
    setShareOpen(true);
  };

  const [homeShowing, setHomeShowing] = useState(false);
  const onHomeShowing = () => {
    setHomeShowing(true);
  };

  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [requestTimeDialog, setRequestTimeDialog] = useState(false);

  const [reqTourSnackBar, setReqTourSnackBar] = useState(false);
  const [tourDateDate, setTourDateDate] = useState(
    moment().add(1, "days").format("dddd, MMMM Do YYYY")
  );

  const [tourDateTime, setTourDateTime] = useState(
    `${moment("2000-01-01")
      .add(40 * 15, "minutes")
      .format("h:mm a")} - ${moment("2000-01-01")
      .add(40 * 15 + 30, "minutes")
      .format("h:mm a")}`
  );

  const eContractRedirect = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getInitialForm`,
        {
          buyerEmail: authLocalState?.user?.email,
          sellerEmail: propertyData?.sentBy,
          propertyId: propertyData?._id,
        },
        { withCredentials: true }
      )
      .then((res) => push(res.data))
      .catch((err) => console.log(err));
  };

  const [chatDialog, setChatDialog] = useState(false);

  const [EContractModal, setEContractModal] = useState(false);

  const [NeedEmailVerified, setNeedEmailVerified] = useState(false);
  const [NeedPhoneVerified, setNeedPhoneVerified] = useState(false);
  if (loadError) return "Error 500";
  if (!isLoaded) return <Loading />;

  const requestTour = (inPerson, tourDateDate, tourDateTime) => {
    if (
      authLocalState.auth &&
      authLocalState.emailVerified &&
      authLocalState.phoneVerified
    ) {
      setReqTourSnackBar(true);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/sendShowingTime`,
          {
            string: tourDateTime,
            owner: propertyData?.sentBy,
            address: propertyData?.query?.StreetAddress,
            day: tourDateDate,
            type: inPerson ? "In Person Inspection" : "Live Video Inspection",
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } else {
      if (authLocalState.auth) {
        setOpenVerifySnackbar(true);
      } else {
        setOpenVerifySnackbar(false);
      }
      setOpenAuthSnackbar(true);
    }
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Snackbar
          open={NeedEmailVerified}
          autoHideDuration={2000}
          onClose={() => setNeedEmailVerified(false)}
        >
          <MuiAlert
            onClose={() => setNeedEmailVerified(false)}
            severity="warning"
            variant="filled"
          >
            Please Verify Your Email Before Using This Feature
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={NeedPhoneVerified}
          autoHideDuration={2000}
          onClose={() => setNeedPhoneVerified(false)}
        >
          <MuiAlert
            onClose={() => setNeedPhoneVerified(false)}
            severity="warning"
            variant="filled"
          >
            Please Verify Your Phone Number Before Using This Feature
          </MuiAlert>
        </Snackbar>
        <div className={classes.aboveFold}>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${propertyData?.query?.StreetAddress}`
            )}`}
          >
            <div className={classes.aboveFold__header}>
              <span className={classes.aboveFold__externalLink}>
                {propertyData?.query?.StreetAddress}
              </span>
            </div>
          </Link>
          <div className={classes.aboveFold__subHeader}>
            {propertyData?.query.PropertyType} &bull;{" "}
            {propertyData?.query.Bedrooms} Bedrooms &bull;{" "}
            {propertyData?.query.Bathrooms} Bathrooms
          </div>

          <div className={classes.aboveFold__control}>
            <div></div>
            <Dialog
              onClose={() => setHomeShowing(false)}
              open={homeShowing}
              classes={{ paper: classes.homeShowing__dialog }}
            >
              <div className={classes.homeShowing}>
                {propertyData?.query?.HomeShowingDates?.map((i) => (
                  <Button
                    className={classes.homeShowing__overlayButton}
                    onClick={() => {
                      setHomeShowing(false);
                      setConfirmationDialog(i);
                    }}
                  >
                    <div className={classes.homeShowing__dateContainer}>
                      <div className={classes.homeShowing__day}>
                        {moment(i.day).format("MMM DD, YYYY")}
                      </div>
                      <div className={classes.homeShowing__start}>
                        {moment(i.start).format("h:mm A")} -{" "}
                      </div>
                      <div className={classes.homeShowing__end}>
                        {moment(i.end).format("h:mm A")}
                      </div>
                      <div className={classes.homeShowing__arrow}>
                        <ArrowRightAltIcon />
                      </div>
                    </div>
                  </Button>
                ))}

                <Button
                  className={classes.homeShowing__requestOwnTime}
                  onClick={() => {
                    setHomeShowing(false);
                    setRequestTimeDialog(true);
                  }}
                >
                  Request Own Time
                </Button>
              </div>
            </Dialog>
            <ConfirmDialog
              open={confirmationDialog}
              onClose={() => setConfirmationDialog(false)}
              sentBy={propertyData?.sentBy}
              address={propertyData?.query?.StreetAddress}
            />
            <RequestTimeDialog
              open={requestTimeDialog}
              onClose={() => setRequestTimeDialog(false)}
            />
            <Dialog
              open={matterportDialog}
              onClose={() => setMatterportDialog(false)}
              classes={{ paper: classes.matterportDialog }}
            >
              <iframe
                className={classes.matterportIframe}
                src="https://my.matterport.com/show/?m=Fekh9xW92wd"
                frameborder="0"
                allowfullscreen
                allow="xr-spatial-tracking"
              ></iframe>
            </Dialog>
            <div className={classes.aboveFold__control__shareStar}>
              <Button
                onClick={() => {
                  setMatterportDialog(true);
                }}
              >
                Live
              </Button>
              <Button
                className={classes.aboveFold__control__button}
                startIcon={<ShareIcon />}
                onClick={() => onShare()}
              >
                <div>Share</div>
              </Button>
              {/*SHARE DIALOG*/}
              <Dialog
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                classes={{ paper: classes.share__dialog }}
              >
                <div className={classes.share__root}>
                  <TwitterShareButton
                    title={`${propertyData?.query?.StreetAddress} on myHomely.`}
                    caption={`${process.env.NEXT_PUBLIC_CLIENT_URL}/viewproperty?id=${propertyData?._id}`}
                    url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/viewproperty?id=${propertyData?._id}`}
                  >
                    <TwitterIcon className={classes.share__twitter} />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/viewproperty?id=${propertyData?._id}`}
                  >
                    <FacebookIcon className={classes.share__facebook} />
                  </FacebookShareButton>
                </div>
              </Dialog>
              <Button
                className={classes.aboveFold__control__button}
                onClick={() => onStar()}
                disabled={disabledFavourite}
                startIcon={
                  favouriteActive ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
              >
                <div>Favourite</div>
              </Button>
            </div>
          </div>
          <div className={classes.aboveFold__grid}>
            {[...Array(5).keys()].map((i) => {
              if (i === 0) {
                return (
                  <img
                    src={propertyData?.query?.HouseImages[i]}
                    alt="House"
                    className={classes.aboveFold__largeImage}
                  />
                );
              } else {
                return (
                  <img
                    src={propertyData?.query?.HouseImages[i]}
                    alt="House"
                    className={classes.aboveFold__smallImage}
                  />
                );
              }
            })}
            <div className={classes.aboveFold__grid__buttonContainer}>
              <Button
                startIcon={<InsertPhotoIcon />}
                onClick={() => setOpenPhotos(true)}
              >
                See All
              </Button>
              <SeeAllPhotosDialog />
            </div>
          </div>
        </div>

        <div className={classes.belowFold}>
          <div>
            <div className={classes.belowFold__header}>
              $
              {propertyData?.query?.AskingPrice.toString().replace(
                /\d{1,3}(?=(\d{3})+(?!\d))/g,
                "$&,"
              )}
            </div>
            <div className={classes.belowFold__subHeader}>
              {propertyData?.query.PropertyType} &bull;{" "}
              {propertyData?.query.Bedrooms} Bedrooms &bull;{" "}
              {propertyData?.query.Bathrooms} Bathrooms
            </div>
            <div className={classes.belowFold__keyFeatures}>
              <div className={classes.belowFold__keyFeatures__header}>
                Key Features
              </div>
              <div className={classes.belowFold__keyFeatures__grid}>
                {keyFeaturesData.map((i) => {
                  return (
                    <div className={classes.belowFold__keyFeatures__gridChild}>
                      <div>{i.icon}</div>
                      <div>
                        {i.title}: {i.res}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                onClick={() => setOpenKeyFeatures(true)}
                className={classes.belowFold__keyFeatures__showAll}
              >
                Show All
              </Button>
              <KeyFeaturesDialog />
            </div>

            <div>
              <div className={classes.commuteTime}>
                <div className={classes.commuteTimeHeader}>Commute Times</div>
                <div>
                  <>
                    <div
                      className={
                        commuteTimes.directions.length === 0
                          ? classes.displayNone
                          : null
                      }
                    >
                      <span className={classes.to}>To: </span>
                      {commuteTimes.propertyDetails}
                    </div>
                    <div className={classes.commuteTimeBlock}>
                      {commuteTimes.directions.map((j) => (
                        <div className={classes.transportFlex}>
                          {j.status === "OK" ? (
                            <div>
                              {j.method === "DRIVING" && (
                                <div className={classes.transportPill}>
                                  <DriveEtaIcon
                                    className={classes.transportPillIcon}
                                  />{" "}
                                  {j.duration}
                                </div>
                              )}

                              {j.method === "TRANSIT" && (
                                <div className={classes.transportPill}>
                                  <DirectionsTransitIcon
                                    className={classes.transportPillIcon}
                                  />{" "}
                                  {j.duration}
                                </div>
                              )}

                              {j.method === "BICYCLING" && (
                                <div className={classes.transportPill}>
                                  <DirectionsBikeIcon
                                    className={classes.transportPillIcon}
                                  />{" "}
                                  {j.duration}
                                </div>
                              )}

                              {j.method === "WALKING" && (
                                <div className={classes.transportPill}>
                                  <DirectionsWalkIcon
                                    className={classes.transportPillIcon}
                                  />{" "}
                                  {j.duration}
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className={classes.hr} />
                  </>
                </div>
                <div className={classes.commuteTimeFlexContainer}>
                  <div className={classes.commuteTimeAddress}>
                    {propertyData?.query?.StreetAddress}
                  </div>
                  <div>
                    <PlacesAutoComplete
                      value={commuteAddress}
                      searchOptions={{
                        componentRestrictions: { country: ["ca"] },
                      }}
                      onChange={(address) => {
                        setClickAway(false);
                        setCommuteAddress(address);
                      }}
                      ref={(c) => {
                        if (!c) return;
                        c.handleInputOnBlur = () => {};
                      }}
                      onSelect={() => {
                        setCommuteAddress("");
                      }}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        loading,
                        getSuggestionItemProps,
                      }) => (
                        <>
                          <Paper
                            elevation={0}
                            className={classes.commuteTimeInput}
                          >
                            <IconButton disableRipple>
                              <SearchIcon />
                            </IconButton>
                            <InputBase
                              value={commuteAddress}
                              onChange={(e) => {
                                setCommuteAddress(e.target.value);
                                setClickAway(false);
                              }}
                              placeholder="Enter a location to view travel times"
                              className={classes.commuteField}
                              {...getInputProps()}
                            />
                          </Paper>

                          <ClickAwayListener
                            onClickAway={() => setClickAway(true)}
                          >
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
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.belowFold__keyFeatures__description}>
              {propertyData?.query.PropertyDescription}
            </div>

            <div className={classes.belowFold__schoolCatchment}>
              <div className={classes.belowFold__schoolCatchment__header}>
                School Catchment Zones
              </div>
              <Tabs
                value={schoolCatchmentTab}
                onChange={(event, newVal) => {
                  setSchoolCatchmentTab(newVal);
                }}
                variant="fullWidth"
                className={classes.belowFold__schoolCatchment__tabs}
                classes={{
                  indicator: classes.belowFold__schoolCatchment__tabIndicator,
                }}
              >
                {schoolCatchmentTabs.map((i, index) => {
                  return (
                    <Tab
                      className={classes.belowFold__schoolCatchment__tabLabel}
                      label={i.label}
                      {...a11yProps(index)}
                    />
                  );
                })}
              </Tabs>
              <GoogleMap zoom={10} onLoad={onMapLoad}></GoogleMap>{" "}
              {/*TODO: Remove later*/}
              {/*All Tabs showing each catchment zone*/}
              <SchoolTab index={0} catchmentZone={primarySchool} />
              <SchoolTab index={1} catchmentZone={secondarySchool} />
              <SchoolTab index={2} catchmentZone={university} />
            </div>

            <div className={classes.neighborHoodHighlights}>
              <div className={classes.neighborHoodHighlights__header}>
                Neighborhood Highlights
              </div>
              <div className={classes.neighborHoodHighlights__tabsContainer}>
                <Tabs
                  value={neighborHoodHighlightsTabs}
                  onChange={(event, newVal) => {
                    setNeighborHoodHighlightsTabs(newVal);
                  }}
                  variant="scrollable"
                  orientation="vertical"
                  className={classes.neighborHoodHighlights__tabs}
                  A
                  classes={{
                    indicator: classes.neighborHoodHighlights__tabIndicator,
                  }}
                >
                  <Tab
                    label="Convenience"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(0)}
                  />
                  <Tab
                    label="Neighborhood"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(1)}
                  />
                  <Tab
                    label="Ownership"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(2)}
                  />
                  <Tab
                    label="Age"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(3)}
                  />
                  <Tab
                    label="Marrital Status"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(4)}
                  />
                  <Tab
                    label="Education"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(5)}
                  />
                  <Tab
                    label="Employment"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(6)}
                  />
                  <Tab
                    label="Transit"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(7)}
                  />
                  <Tab
                    label="Income"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(8)}
                  />
                  <Tab
                    label="Diversity"
                    className={classes.neighborHoodHighlights__tab}
                    {...VerticalA11yProps(9)}
                  />
                </Tabs>
                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={0}>
                  <div className={classes.verticalTab}>
                    <div className={classes.neighborHoodHighlights__tabsRoot}>
                      <div
                        className={classes.neighborHoodHighlights__rpsHeader}
                      >
                        Entertainment:{" "}
                        <span
                          className={
                            demographicData.proximity
                              ? demographicData.proximity.avg[0] === "High"
                                ? classes.neighborHoodHighlights__HIGH
                                : demographicData.proximity.avg[0] === "Medium"
                                ? classes.neighborHoodHighlights__MED
                                : demographicData.proximity.avg[0] === "Low"
                                ? classes.neighborHoodHighlights__LOW
                                : classes.neighborHoodHighlights__NA
                              : classes.neighborHoodHighlights__NA
                          }
                        >
                          {demographicData.proximity
                            ? demographicData?.proximity?.avg[0]
                            : "N/A"}
                        </span>
                      </div>

                      <div
                        className={classes.neighborHoodHighlights__rpsHeader}
                      >
                        Education:{" "}
                        <span
                          className={
                            demographicData.proximity
                              ? demographicData.proximity.avg[1] === "High"
                                ? classes.neighborHoodHighlights__HIGH
                                : demographicData.proximity.avg[1] === "Medium"
                                ? classes.neighborHoodHighlights__MED
                                : demographicData.proximity.avg[1] === "Low"
                                ? classes.neighborHoodHighlights__LOW
                                : classes.neighborHoodHighlights__NA
                              : classes.neighborHoodHighlights__NA
                          }
                        >
                          {demographicData.proximity
                            ? demographicData?.proximity?.avg[1]
                            : "N/A"}
                        </span>
                      </div>

                      <div
                        className={classes.neighborHoodHighlights__rpsHeader}
                      >
                        Commerical Services:{" "}
                        <span
                          className={
                            demographicData.proximity
                              ? demographicData.proximity.avg[2] === "High"
                                ? classes.neighborHoodHighlights__HIGH
                                : demographicData.proximity.avg[2] === "Medium"
                                ? classes.neighborHoodHighlights__MED
                                : demographicData.proximity.avg[2] === "Low"
                                ? classes.neighborHoodHighlights__LOW
                                : classes.neighborHoodHighlights__NA
                              : classes.neighborHoodHighlights__NA
                          }
                        >
                          {demographicData.proximity
                            ? demographicData?.proximity?.avg[2]
                            : "N/A"}
                        </span>
                      </div>

                      <div
                        className={classes.neighborHoodHighlights__rpsHeader}
                      >
                        Health Services:{" "}
                        <span
                          className={
                            demographicData.proximity
                              ? demographicData.proximity.avg[3] === "High"
                                ? classes.neighborHoodHighlights__HIGH
                                : demographicData.proximity.avg[3] === "Medium"
                                ? classes.neighborHoodHighlights__MED
                                : demographicData.proximity.avg[3] === "Low"
                                ? classes.neighborHoodHighlights__LOW
                                : classes.neighborHoodHighlights__NA
                              : classes.neighborHoodHighlights__NA
                          }
                        >
                          {demographicData.proximity
                            ? demographicData?.proximity?.avg[3]
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className={classes.neighborHoodHighlights__GoogleMaps}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyles}
                        zoom={proximityZoom}
                        center={coordinates}
                        options={options}
                        onLoad={onMapLoad}
                      >
                        <Marker
                          position={coordinates}
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
                </VerticalTabPanel>
                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={1}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData.dwelling?.structuralType && (
                        <NivoPieChart
                          data={demographicData?.dwelling?.structuralType}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={2}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.dwelling?.privatelyOwned && (
                        <NivoPieChart
                          data={demographicData?.dwelling?.privatelyOwned}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={3}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.ageInsights?.chart && (
                        <NivoPieChart
                          data={demographicData?.ageInsights?.chart}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={4}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.marriageInsights?.chart && (
                        <NivoPieChart
                          data={demographicData?.marriageInsights?.chart}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={5}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.educationInsights && (
                        <NivoPieChart
                          data={demographicData?.educationInsights}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={6}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.employmentInsights?.employed && (
                        <NivoPieChart
                          data={demographicData?.employmentInsights?.employed}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={7}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.employmentInsights?.commuteTimes && (
                        <NivoPieChart
                          data={
                            demographicData?.employmentInsights?.commuteTimes
                          }
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={8}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.incomeInsights?.chart && (
                        <NivoPieChart
                          data={demographicData?.incomeInsights?.chart}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>

                <VerticalTabPanel value={neighborHoodHighlightsTabs} index={9}>
                  <div className={classes.nivoChart__container}>
                    <div className={classes.nivoChart}>
                      {demographicData?.diversity?.chart && (
                        <NivoPieChart
                          data={demographicData?.diversity?.chart}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTabPanel>
              </div>
            </div>
          </div>
          <div className={classes.cards}>
            {/*
            <div className={classes.cards__activityCard}>
              <div className={classes.tourRoot}>
                <div className={classes.tourHeader}>Tour This Home</div>

                <div>
                  <TextField
                    className={classes.select}
                    select
                    variant="outlined"
                    MenuProps={{ disableScrollLock: true }}
                    value={dateSelected}
                    defaultValue={propertyData?.query?.HomeShowingDates[0].day}
                    InputLabelProps={{
                      className: classes.inputProps,
                    }}
                    InputProps={{
                      className: classes.inputProps,
                    }}
                  >
                    {propertyData?.query?.HomeShowingDates.map((i) => (
                      <MenuItem className={classes.menuItem} value={i.day}>
                        {i.day}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            */}
            <div className={classes.cards__activityCard}>
              <div className={classes.buttonCardTour}>
                <IconButton
                  size="small"
                  className={classes.reportButton}
                  onClick={() => {
                    if (
                      authLocalState.auth &&
                      authLocalState.emailVerified &&
                      authLocalState.phoneVerified
                    ) {
                      axios
                        .post(
                          `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/reportListing`,
                          {
                            address: propertyData?.query?.StreetAddress,
                          },
                          { withCredentials: true }
                        )
                        .then((res) => setReqTourSnackBar(true))
                        .catch((err) => console.log(err));
                    } else {
                      if (authLocalState.auth) {
                        setOpenVerifySnackbar(true);
                      } else {
                        setOpenVerifySnackbar(false);
                      }
                      setOpenAuthSnackbar(true);
                    }
                  }}
                >
                  <FlagIcon />
                </IconButton>
                <div className={classes.tourHeader}>Tour This Home</div>
                <div className={classes.buttonsContainerTour}>
                  <Button
                    startIcon={<HomeIcon />}
                    onClick={() => setInPerson(true)}
                    className={
                      inPerson ? classes.activeButton : classes.inactiveButton
                    }
                  >
                    In Person
                  </Button>
                  <Button
                    startIcon={<PhoneIphoneIcon />}
                    onClick={() => setInPerson(false)}
                    className={
                      inPerson ? classes.inactiveButton : classes.activeButton
                    }
                  >
                    Live Video
                  </Button>
                </div>
                <div>
                  <TextField
                    size="small"
                    select
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.inputProps,
                    }}
                    InputProps={{
                      className: classes.inputProps,
                    }}
                    className={classes.select}
                    value={tourDateDate}
                    onChange={(e) => setTourDateDate(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <MenuItem
                        value={moment()
                          .add(i, "days")
                          .format("dddd, MMMM Do YYYY")}
                        className={classes.menuItem}
                      >
                        <div className={classes.menuItem}>
                          {moment().add(i, "days").format("dddd, MMMM Do YYYY")}
                        </div>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    size="small"
                    select
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.inputProps,
                    }}
                    InputProps={{
                      className: classes.inputProps,
                    }}
                    className={classes.select}
                    value={tourDateTime}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTourDateTime(e.target.value);
                    }}
                  >
                    {[...Array(85).keys()].map((i) => (
                      <MenuItem
                        value={`${moment("2000-01-01")
                          .add(i * 15, "minutes")
                          .format("h:mm a")} - ${moment("2000-01-01")
                          .add(i * 15 + 30, "minutes")
                          .format("h:mm a")}`}
                        className={classes.menuItem}
                      >
                        <div className={classes.menuItem}>
                          {moment("2000-01-01")
                            .add(i * 15, "minutes")
                            .format("h:mm a")}{" "}
                          -{" "}
                          {moment("2000-01-01")
                            .add(i * 15 + 30, "minutes")
                            .format("h:mm a")}
                        </div>
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <Button
                    className={classes.belowFold__keyFeatures__button}
                    onClick={() => {
                      setCovidOpen(true);
                      // requestTour(inPerson, tourDateDate, tourDateTime);
                    }}
                  >
                    Request Tour
                  </Button>
                  <Covid19Notice
                    open={covidOpen}
                    setOpen={setCovidOpen}
                    callback={() => {
                      setCovidOpen(false);
                      setReqTOSModalOpen(true);
                      // requestTour(inPerson, tourDateDate, tourDateTime);
                    }}
                  />
                  <TOSModal
                    open={reqTOSModalOpen}
                    setOpen={setReqTOSModalOpen}
                    callback={() => {
                      setReqTOSModalOpen(false);
                      setReqPrivacyModalOpen(true);
                    }}
                  />
                  <PrivacyPolicyModal
                    open={reqPrivacyModalOpen}
                    setOpen={setReqPrivacyModalOpen}
                    callback={() => {
                      setReqPrivacyModalOpen(false);

                      requestTour(inPerson, tourDateDate, tourDateTime);
                    }}
                  />
                  <Snackbar
                    open={reqTourSnackBar}
                    autoHideDuration={2000}
                    onClose={() => setReqTourSnackBar(false)}
                  >
                    <MuiAlert
                      onClose={() => setReqTourSnackBar(false)}
                      severity="success"
                      variant="filled"
                    >
                      Success
                    </MuiAlert>
                  </Snackbar>
                </div>
              </div>
              {/*

              <div className={classes.buttonCardTour}>
                <div>
                  <Button
                    className={
                      classes.belowFold__keyFeatures__buttonMainMortgage
                    }
                    onClick={() => {
                      if (
                        authLocalState.auth &&
                        authLocalState.emailVerified &&
                        authLocalState.phoneVerified
                      ) {
                        setPreapprovalOpen(true);
                      } else {
                        if (authLocalState.auth) {
                          setOpenVerifySnackbar(true);
                        } else {
                          setOpenVerifySnackbar(false);
                        }
                        setOpenAuthSnackbar(true);
                      }
                    }}
                    startIcon={<DomainIcon />}
                  >
                    Qualify For Mortgage Preapproval
                  </Button>
                </div>
                <GetMortgagePreapproval
                  open={preapprovalOpen}
                  onClose={() => setPreapprovalOpen(false)}
                  classes={{ paper: classes.keyFeaturesDialog }}
                  address={propertyData?.query?.StreetAddress}
                  price={propertyData?.query?.AskingPrice}
                />
              </div>
                */}
              <div className={classes.buttonCard}>
                <div className={classes.sellerProfileFlex}>
                  <img
                    src={sellerProfile.icon}
                    alt="icon"
                    className={classes.sellerProfileImage}
                  />

                  <div className={classes.verifiedFlex}>
                    <div className={classes.sellerName}>
                      {sellerProfile.name}
                    </div>
                    {sellerProfile.IDVerified === "Validated" &&
                    sellerProfile.emailVerified &&
                    sellerProfile.phoneVerified ? (
                      <div className={classes.verifiedUser}>
                        <VerifiedUserIcon
                          className={classes.verifiedUserIcon}
                        />
                        <div>Verified User</div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={classes.belowFold__keyFeatures__buttonContainer}
                >
                  {/*
                  <Button
                    startIcon={<CalendarTodayIcon />}
                    className={classes.belowFold__keyFeatures__buttonMain}
                    onClick={() => setHomeShowing(true)}
                  >
                    Book Showing Time
                  </Button>
                  */}

                  <Button
                    startIcon={<ChatIcon />}
                    className={classes.belowFold__keyFeatures__buttonMain}
                    onClick={() => {
                      if (
                        authLocalState.auth &&
                        authLocalState.emailVerified &&
                        authLocalState.phoneVerified
                      ) {
                        setChatDialog(true);
                      } else {
                        if (authLocalState.auth) {
                          setOpenVerifySnackbar(true);
                        } else {
                          setOpenVerifySnackbar(false);
                        }
                        setOpenAuthSnackbar(true);
                      }
                    }}
                  >
                    Chat to Seller
                  </Button>
                  <Button
                    startIcon={<CreateIcon />}
                    className={classes.belowFold__keyFeatures__buttonMain}
                    onClick={() => {
                      if (
                        authLocalState.auth &&
                        authLocalState.emailVerified &&
                        authLocalState.phoneVerified
                      ) {
                        setEContractModal(true);
                      } else {
                        if (authLocalState.auth) {
                          setOpenVerifySnackbar(true);
                        } else {
                          setOpenVerifySnackbar(false);
                        }
                        setOpenAuthSnackbar(true);
                      }
                    }}
                  >
                    Submit Your Offer
                  </Button>
                  <EContractModalComponent
                    buyerEmail={authLocalState?.user?.email}
                    sellerEmail={propertyData?.sentBy}
                    state={EContractModal}
                    setState={setEContractModal}
                    propertyData={propertyData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignInSnackbar
        NeedsVerification={openVerifySnackbar}
        open={openAuthSnackbar}
        handleClose={() => setOpenAuthSnackbar(false)}
      />
      <ChatDialog
        senderEmail={authLocalState?.user?.email}
        buyerEmail={propertyData?.sentBy}
        propertyId={propertyData?._id}
        state={chatDialog}
        setState={setChatDialog}
      />
    </Layout>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      marginTop: "11rem",
      maxWidth: "80rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    aboveFold: {},
    aboveFold__control: {
      display: "flex",
      marginTop: "-1rem",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    aboveFold__control__shareStar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    aboveFold__control__item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    aboveFold__control__button: {
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      fontWeight: "bold",
    },
    aboveFold__header: {
      fontSize: "2.3rem",
      fontWeight: "bold",
      marginBottom: "-0.2rem",
      maxWidth: "80rem",
    },
    aboveFold__externalLink: {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    aboveFold__subHeader: {
      fontWeight: "bold",
      color: "grey",
    },
    aboveFold__grid: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridTemplateRows: "repeat(2, 1fr)",
      width: "102%",
      gridGap: "0.5rem",
      borderRadius: "0.75rem",
      overflow: "hidden",
      height: "35rem",
    },
    aboveFold__grid__buttonContainer: {
      position: "absolute",
      right: "1.5rem",
      bottom: "1.5rem",
      background: "white",
      borderRadius: "0.2rem",
      "& > *": {
        fontWeight: "bold",
        textTransform: "none",
        fontFamily: "Gilroy, sans-serif",
      },
    },
    aboveFold__largeImage: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
      gridRowStart: 1,
      gridRowEnd: 3,
    },
    aboveFold__smallImage: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
    belowFold: {
      marginTop: "2rem",
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gridTemplateRows: "1fr",
      position: "relative",
    },
    belowFold__header: {
      fontSize: "3.5em",
      fontWeight: "bold",
    },
    belowFold__subHeader: {
      color: "#222222",
      fontSize: "1.2rem",
    },
    belowFold__keyFeatures: {
      marginTop: "0.5rem",
    },
    belowFold__keyFeatures__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      marginBottom: "1.2rem",
    },
    belowFold__keyFeatures__grid: {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
      height: "100%",
      gridGap: "1.5rem",
    },
    belowFold__keyFeatures__gridChild: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& > div:nth-child(1)": {
        marginRight: "0.5rem",
      },
      "& > div:nth-child(2)": {
        marginBottom: "0.15rem",
        fontWeight: "bold",
      },
    },
    belowFold__keyFeatures__buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.1rem",
      marginTop: "1rem",
      flexDirection: "column",
    },
    belowFold__keyFeatures__showAll: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      paddingRight: "1.5rem",
      paddingLeft: "1.5rem",
      marginTop: "2rem",
      marginBottom: "2rem",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },

    belowFold__keyFeatures__button: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "#249FFB",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      width: "10rem",
      borderRadius: "0.5rem",
      background: "white",

      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      "&:hover": {
        background: "white",
      },
    },
    belowFold__keyFeatures__buttonSub: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      width: "20rem",
      borderRadius: "0.5rem",
      background: "#E8219C",

      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      "&:hover": {
        background: "#E8219C",
      },
    },

    belowFold__keyFeatures__buttonMainShort: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      borderRadius: "0.5rem",
      background: "#249FFB",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      "&:hover": {
        background: "#249FFB",
      },
    },

    belowFold__keyFeatures__buttonMainMortgage: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      borderRadius: "0.5rem",
      width: "25rem",
      background: "#249FFB",

      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      "&:hover": {
        background: "#249FFB",
      },
    },
    belowFold__keyFeatures__buttonMain: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      borderRadius: "0.5rem",
      width: "12rem",
      background: "#249FFB",

      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      "&:hover": {
        background: "#249FFB",
      },
    },
    belowFold__keyFeatures__description: {
      marginRight: "5rem",
      fontSize: "1rem",
    },
    cards: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      position: "relative",
    },
    cards__offerCard: {
      position: "relative",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      width: "100%",
      height: "15rem",
      gap: "1.15rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "1.5rem",
    },
    cards__activityCard: {
      position: "sticky",
      width: "25rem",
      height: "35rem",
      top: "7rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
      flexDirection: "column",
      marginBottom: "1.3rem",
      marginLeft: "auto",
    },
    buttonCard: {
      borderRadius: "0.75rem",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      padding: "1.5rem",
      paddingTop: "0.5rem",
      marginTop: "0.5rem",
      display: "flex",
      width: "28rem",
      justifyContent: "center",
      gap: "2rem",
    },
    buttonCardTour: {
      width: "28rem",
      borderRadius: "0.75rem",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      padding: "1.5rem",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      marginTop: "0.5rem",
      display: "flex",
      gap: "1.1rem",
      flexDirection: "column",
    },
    cards__activityCard__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      textAlign: "center",
      maxWidth: "18rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1rem",
    },
    select: {
      width: "19.5rem",
    },
    menuItem: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    cards__activityCard__subheader: {
      marginTop: "0.75rem",
      textAlign: "center",
      color: "grey",
      fontSize: "0.95rem",
      maxWidth: "27.5rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    belowFold__schoolCatchment: {
      marginTop: "3rem",
      maxWidth: "45rem",
    },

    belowFold__schoolCatchment__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      marginBottom: "1.2rem",
    },
    belowFold__schoolCatchment__tabs: {
      marginBottom: "0.25rem",
    },
    belowFold__schoolCatchment__tabIndicator: {
      backgroundColor: "#1EC2E5",
      opacity: "30%",
      borderRadius: "0.25rem",
    },
    belowFold__schoolCatchment__tabLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    schoolCatchment__container: {
      marginLeft: "-1.5rem",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Gilroy, sans-serif",
      gap: "1rem",
      position: "relative",
      height: "100%",
      marginBottom: "2rem",
    },
    schoolCatchment__itemContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    schoolCatchment__name: {
      maxWidth: "20rem",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    schoolCatchment__distanceAway: {
      color: "white",
      fontWeight: "bold",
      fontSize: "0.9rem",
      width: "5rem",
      borderRadius: "0.25rem",
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
      textAlign: "center",
      height: "100%",
      background: "#E8219C",
    },
    schoolCatchment__rating: {
      color: "white",
      fontWeight: "bold",
      fontSize: "0.9rem",
      width: "2.9rem",
      borderRadius: "0.25rem",
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
      textAlign: "center",
      height: "100%",
      background: "#249FFB",
    },
    schoolCatchment__distanceRatingContainer: {
      display: "flex",
      alignItems: "flex-start",
      height: "100%",
      justifyContent: "space-between",
      width: "9.5rem",
      gap: "1rem",
    },
    schoolCatchment__button: {
      width: "8.5rem",
      fontFamily: "Gilroy",
      color: "white",
      fontWeight: "bold",
      paddingTop: "0.7rem",
      paddingBottom: "0.7rem",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },
    schoolCatchment__buttonInner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    schoolCatchment__divider: {
      width: "100%",
      height: "1px",
      background: "#bdbdbd",
    },
    neighborHoodHighlights: {},
    neighborHoodHighlights__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    neighborHoodHighlights__tabs: {
      marginTop: "2rem",
      maxHeight: "25rem",
      maxWidth: "12rem",
      marginRight: "0.5rem",
    },
    neighborHoodHighlights__tabsContainer: {
      marginLeft: "-1.5rem",
      marginTop: "0.25rem",
      display: "flex",
    },
    neighborHoodHighlights__tab: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    neighborHoodHighlights__tabIndicator: {
      backgroundColor: "#1EC2E5",
      opacity: "30%",
      borderRadius: "0.25rem",
    },
    neighborHoodHighlights__rpsHeader: {
      fontWeight: "bold",
      color: "#181A18",
    },
    verticalTab: {
      fontFamily: "Gilroy, sans-serif",
    },
    neighborHoodHighlights__tabsRoot: {
      display: "grid",
      gridTemplateRows: "1fr 1fr",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      width: "35rem",
    },
    neighborHoodHighlights__NA: {
      color: "white",
      padding: "0.3rem",
      borderRadius: "0.15rem",
      background: "#249FFB",
    },
    neighborHoodHighlights__LOW: {
      color: "white",
      padding: "0.3rem",
      borderRadius: "0.15rem",
      background: "#249FFB",
    },
    neighborHoodHighlights__MED: {
      color: "white",
      padding: "0.3rem",
      borderRadius: "0.15rem",
      background: "#249FFB",
    },
    neighborHoodHighlights__HIGH: {
      color: "white",
      padding: "0.3rem",
      borderRadius: "0.15rem",
      background: "#249FFB",
    },
    neighborHoodHighlights__GoogleMaps: {
      marginTop: "1.5rem",
      width: "100%",
      height: "20rem",
    },
    offers: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "5rem",
      marginTop: "5rem",
      marginBottom: "5rem",
    },
    offerChild: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
    },
    offerChild__icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "4.5rem",
      height: "4.5rem",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "3rem",
      padding: "1rem",
      borderRadius: "50%",
      background: "#249FFB",
      "& > *": {
        fontSize: "2.3rem",
        color: "white",
      },
    },
    offerChild__title: {
      fontWeight: "bold",
      fontSize: "1.4rem",
    },
    offerChild__description: {
      fontSize: "0.92rem",
      maxWidth: "14rem",
    },
    offerChild__learnMore: {
      fontWeight: "bold",
      fontSize: "0.93rem",
      color: "#1EC2E5",
    },
    keyFeaturesDialog: {
      fontFamily: "Gilroy, sans-serif",
      width: "50rem",
      padding: "3.5rem",
      borderRadius: "0.5rem",
    },
    keyFeaturesDialog__header: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    keyFeaturesDialog__subHeader: {
      marginTop: "1.25rem",
      marginBottom: "0.45rem",
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    keyFeaturesDialog__text: {
      fontWeight: 700,
      color: "grey",
    },
    keyFeaturesDialog__spacer: {
      marginTop: "5rem",
      marginBottom: "5rem",
    },
    seeAllPhotos: {
      minWidth: "85rem",
      width: "100%",
    },
    seeAllPhotos__grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gridGap: "0.5rem",
      padding: "2rem",
    },
    seeAllPhotos__image: {
      width: "100%",
      height: "25rem",
      objectFit: "cover",
      borderRadius: "0.3rem",
    },
    nivoChart__container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      marginTop: "2rem",
    },

    nivoChart: {
      width: "40rem",
      height: "21rem",
    },
    share__dialog: {
      borderRadius: "0.75rem",
      padding: "3rem",
    },
    share__root: {
      display: "flex",
      gap: "1.5rem",
    },
    share__email: {
      background: "#E56A6A",
      color: "white",
      fontSize: "5rem",
      padding: "1rem",
      borderRadius: "50%",
    },
    share__instagram: {
      background: "#f48fb1",
      color: "white",
      fontSize: "5rem",
      padding: "1rem",
      borderRadius: "50%",
    },
    share__twitter: {
      background: "#89CFF0",
      color: "white",
      fontSize: "5rem",
      padding: "1rem",
      borderRadius: "50%",
    },
    share__facebook: {
      background: "#4267B2",
      color: "white",
      fontSize: "5rem",
      padding: "1rem",
      borderRadius: "50%",
    },
    homeShowing__dialog: {
      fontFamily: "Gilroy, sans-serif",
      borderRadius: "0.75rem",
      padding: "3rem",
    },
    homeShowing: {
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem",
    },
    homeShowing__dateContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    homeShowing__day: {
      marginRight: "1rem",
      color: "white",
      background: "#249FFB",
      padding: "0.25rem",
      borderRadius: "0.25rem",
      width: "7.5rem",
      textAlign: "center",
      fontSize: "0.95rem",
    },
    homeShowing__start: {
      fontSize: "1rem",
    },
    homeShowing__end: {
      fontSize: "1rem",
    },
    homeShowing__arrow: {
      marginTop: "0.3rem",
      marginLeft: "1rem",
      color: "grey",
    },
    homeShowing__requestOwnTime: {
      marginTop: "1rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "#249FFB",
      border: "0.15rem solid #249FFB",
      padding: "1rem",
      width: "19rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    homeShowing__overlayButton: {
      fontFamily: "Gilroy, sans-serif",
    },
    tourRoot: {},
    tourHeader: {
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    mortgageCardHeader: {
      fontSize: "1.45rem",
      fontWeight: "bold",
    },
    commuteTime: {
      position: "relative",
      marginTop: "1rem",
      marginBottom: "3rem",
    },
    commuteTimeHeader: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    commuteField: {
      width: "27.5rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    commuteTimeFlexContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    commuteTimeAddress: {
      fontSize: "1rem",
    },
    commuteTimeInput: {
      position: "relative",
      zIndex: 500,
      marginLeft: "-0.25rem",
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "29rem",
      borderRadius: "0.25rem",
      borderTopLeftRadius: 0,
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "1rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    },
    displayNone: {
      display: "none",
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
    transportFlex: {
      display: "flex",
      flexDirection: "row",
    },
    transportPill: {
      background: "rgb(243, 243, 243)",
      fontWeight: "bold",
      color: "rgb(55, 61, 60)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.25rem",
      paddingBottom: "0.15rem",
      paddingRight: "1.1rem",
      paddingLeft: " 1.1rem",
      borderRadius: "1.2rem",
      width: "100%",
      fontSize: "0.8rem",
    },
    transportPillIcon: {
      fontSize: "1.3rem",
      marginBottom: "0.22rem",
    },
    commuteTimeBlock: {
      marginTop: "0.25rem",
      display: "flex",
      flexDirection: "row",
      gap: "0.5rem",
      marginLeft: "-0.5rem",
      marginBottom: "0.5rem",
    },
    hr: {
      width: "100%",
      marginTop: "1rem",
      borderBottom: "3px solid rgb(243, 243, 243)",
      marginBottom: "1rem",
    },
    activeButton: {
      background: "#249FFB",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      borderRadius: "2rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
    inactiveButton: {
      color: "grey",
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      borderRadius: "2rem",
    },
    buttonsContainerTour: {
      display: "flex",
      gap: "0.5rem",
    },
    mortgageText: {
      color: "grey",
      fontWeight: 600,
      marginTop: "-1rem",
    },
    mortgagePreapprovalHeader: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    preapprovalTextFieldContainer: {
      display: "flex",
      gap: "1rem",
      flexDirection: "column",
      marginTop: "1.2rem",
    },
    to: {
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    sellerProfileImage: {
      width: "6rem",
      heigth: "6rem",
      objectFit: "cover",
      borderRadius: "0.5rem",
    },
    sellerProfileFlex: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "1.2rem",
      marginTop: "1.1rem",
      marginBottom: "0.9rem",
      flexDirection: "column",
      textAlign: "center",
    },
    verifiedFlex: {
      display: "flex",
      flexDirection: "column",
      marginTop: "-0.5rem",
    },
    verifiedUser: {
      fontWeight: "700",
      display: "flex",
      gap: "0.15rem",
      fontSize: "1rem",
      alignItems: "center",
      color: "grey",

      marginLeft: "-0.2rem",
    },
    verifiedUserIcon: {
      fontSize: "1.2rem",
      marginBottom: "0.15rem",
      color: "#249FFB",
    },
    sellerName: {
      fontSize: "1.3rem",
    },
    reportButton: {
      color: "#ff6961",
      position: "absolute",
      right: "0",
      top: "0.7rem",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      padding: "0.5rem",
    },
    matterportDialog: {
      maxWidth: "80rem",
    },
    matterportIframe: {
      width: "60rem",
      height: "35rem",
    },
  })
);
