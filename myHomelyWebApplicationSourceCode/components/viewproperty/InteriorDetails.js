import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      color: "#08184A",
      marginTop: "2.5rem",
      marginBottom: "2.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "3.5rem",
    },
    header: {
      fontWeight: "bold",
      fontFamily: "inherit",
      fontSize: "2.5rem",
    },
    subHeader: {
      fontWeight: "bold",
      fontFamily: "inherit",
      color: "#464646",
      fontSize: "1.7rem",
    },
    factsAndFeaturesGrid: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      width: "100%",
      maxWidth: "64rem",
      gap: "0.5rem",
    },
    factsAndFeaturesGridChild: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.25rem",
      "& > :nth-child(1)": {
        fontSize: "1.75rem",
        color: "#08184A",
      },
      "& > div": {
        color: "#464646",
        fontWeight: "bold",
      },
      "& > div:nth-child(2)": {
        padding: "1rem",
        paddingLeft: " 0.45rem",
        fontWeight: "bold",
        color: "#08184A",
      },
    },
    interiorFeaturedGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "0.5fr 0.5fr",
      width: "100%",
      maxWidth: "62.5rem",
      gap: "0.5rem",
      marginLeft: "-1.5rem",
    },
    interiorFeaturesGridChild: {
      fontSize: "1.1rem",
      maxWidth: "17rem",
      marginRight: "0.5rem",
      marginBottom: "0.5rem",
      marginTop: "0.5rem",
      color: "#464646",
      fontWeight: "bold",
      display: "flex",
      alignItems: "start",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      "& > div": {
        marginTop: "0.4rem",
      },
    },
    moreDetailsParagraph: {
      marginTop: "0.75rem",
      maxWidth: "50rem",
      fontSize: "1.1rem",
      color: "black",
    },
    indicator: {
      backgroundColor: "#08184A",
    },
    tabs: {},
    tabLabel: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      paddingRight: "2rem",
      paddingLeft: "2rem",
      fontSize: "0.9rem",
    },
  })
);

// TODO: Replace these tabs with dynamic data from MongoDB
const tabs = [
  {
    label: "Kitchen",
    options: [
      "Butlers Kitchen",
      "Extended Pantry",
      "Granite Countertop",
      "Premium Rangehood",
      "Premium Kitchen Cabines",
      "Stainless Steel Multi-door Refrigerator ",
      "Stainless Steel Dishwasher ",
      "Wine Refrigerator",
      "Wall Mount Oven",
      "Wall Mount Microwave",
      "Water Purifier",
      "Sink Drain Cleaner Motor",
      "Others",
    ],
  },
  {
    label: "Flooring",
    options: [
      "Hardwood Flooring",
      "Laminate Flooring ",
      "Carpet Flooring",
      "Vinyl",
      "Tiles",
      "Ceramic",
      "Others",
    ],
  },
  {
    label: "Electicity & Heating",
    options: [
      "200 Amps Electric Wiring",
      "Smart Home Lightings",
      "Premium Fixers",
      "Chandelier",
      "Interior Pot Lights",
      "Premium Switches",
      "Sump Pump",
      "Others",
    ],
  },
  {
    label: "Heating & Cooling",
    options: [
      "Central Air Conditioner",
      "Reverse Ceiling Fans",
      "Central Heating",
      "Zonal Heating",
      "Electric/Natural Gas Fireplace",
      "Others",
    ],
  },
  {
    label: "Doors & Windows",
    options: [
      "Custom Interior Doors",
      "Custom Main Door",
      "Drapery or Curtains",
      "Roman Shades",
      "Californian Shutters",
      "Wood Blinds or Shades",
      "Roller or Skate Shades",
      "Sheer Shades",
      "Others",
    ],
  },
  {
    label: "Exterior features",
    options: [
      "Wood Walls",
      "Exterior Pot Lights",
      "Frontyard Garden",
      "Balcony",
      "Boat Slip",
      "Backyard Garden",
      "Backyard Playground",
      "Backyard Swimming Pool",
      "Backyard Jacuzzi or Spa",
      "BBQ or Firepit or Campfire",
      "Fountain or Water features",
      "Outdoor Kitchen",
      "Outdoor Mudroom",
      "Canopy or Pergola",
      "Swing or Hammock",
      "Dining Area",
      "Outdoor Bar",
      "Outdoor Clubhouse",
      "Garden Shed or Storage",
      "Others",
    ],
  },
  {
    label: "Roof & Foundation",
    options: ["Shingle", "Concrete", "Slate", "Tiles", "Others"],
  },
  {
    label: "Other Features",
    options: [
      "High Ceilings (10 – 12 feet)",
      "Bar Area",
      "Recreational or Entertainment Area",
      "Movie Theater or Media Room",
      "Home Gym or Exercise Room",
      "Solar Tiles",
      "Back/front Gas and Water Connection",
      "Tennis or Squash or Basketball Court",
      "Detached Garage",
      "Guest Suite or Detached Guestroom",
      "Visitors Parking",
      "Smart Home System",
      "Smart Thermostat",
      "Smart Door",
      "Smart Garage Door",
      "Smart Lighting Exterior",
      "Smart Sound System",
      "Others",
    ],
  },
];

export default function InteriorDetails({ data }) {
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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/*TODO: REPLACE WITH DYNAMIC DATA*/}

      {/*TODO: REPLACE ICONS*/}
      <div>
        <Typography variant="h4" component="h4" className={classes.header}>
          Key Highlights
        </Typography>
        <div className={classes.factsAndFeaturesGrid}>
          <div className={classes.factsAndFeaturesGridChild}>
            <DomainIcon />
            <div>Property Type:</div>
            <div>Single Family</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <CalendarTodayIcon />
            <div>Year Built:</div>
            <div>1920</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <MoneyIcon />
            <div>Property Tax:</div>
            <div>$12k Monthly</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <WhatshotIcon />
            <div>Heating:</div>
            <div>Forced Air</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <AcUnitIcon />
            <div>Cooling:</div>
            <div>Central</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <LocalParkingIcon />
            <div>Parking:</div>
            <div>Garage</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <LocalParkingIcon />
            <div>Parking Spaces:</div>
            <div>3</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <LocationCityIcon />
            <div>Property Stories:</div>
            <div>2</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <TrafficIcon />
            <div>Lot Size:</div>
            <div>7,139 sqft</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <StoreMallDirectoryIcon />
            <div>House Build Size:</div>
            <div>12,623 sqft</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <VerticalAlignBottomIcon />
            <div>Basement:</div>
            <div>Unfinished</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <CreditCardIcon />
            <div>Renovation Fees:</div>
            <div>$15k</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <KingBedIcon />
            <div>Bedrooms:</div>
            <div>3</div>
          </div>

          <div className={classes.factsAndFeaturesGridChild}>
            <BathtubIcon />
            <div>Bathrooms:</div>
            <div>2</div>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h4" component="h4" className={classes.header}>
          Interior Features
        </Typography>
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
        {tabs.map((i, index) => {
          return (
            <TabPanel value={value} index={index}>
              <div className={classes.interiorFeaturedGrid}>
                {i.options.map((i) => {
                  return (
                    <div className={classes.interiorFeaturesGridChild}>
                      <Checkbox checked={true} color="primary" />
                      <div>{i}</div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          );
        })}
      </div>
      <div>
        <Typography variant="h4" component="h4" className={classes.header}>
          More Details
        </Typography>
        <Typography variant="h5" component="h4" className={classes.subHeader}>
          A Cozy Home in {data.city}
        </Typography>
        <p className={classes.moreDetailsParagraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non
          lectus velit. Etiam dictum mollis purus, eu euismod mi facilisis
          vitae. Donec velit nunc, consectetur egestas pretium in, venenatis vel
          tortor. Sed lectus odio, sollicitudin sed purus quis, suscipit varius
          risus. Nam vitae odio cursus, accumsan lectus ac, mollis neque.
          Quisque malesuada risus quis justo tincidunt rutrum. Nunc est mauris,
          tincidunt vel interdum id, dictum non massa.
        </p>
      </div>
    </div>
  );
}
