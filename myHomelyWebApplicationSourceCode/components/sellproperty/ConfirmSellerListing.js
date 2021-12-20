import React, { useState } from "react";
import { Dialog, Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import DomainIcon from "@material-ui/icons/Domain";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import TrafficIcon from "@material-ui/icons/Traffic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MoneyIcon from "@material-ui/icons/Money";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import KingBedIcon from "@material-ui/icons/KingBed";
import BathtubIcon from "@material-ui/icons/Bathtub";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: "0.5rem",
    padding: "1.25rem",
    fontFamily: "Gilroy, sans-serif",
    width: "60rem",
    maxWidth: "60rem",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  continueButton: {
    background: "#249FFB",
    color: "white",
    fontFamily: "Gilroy, sans-serif",
    textTransform: "none",
    fontWeight: "bold",
    padding: "1.1rem",
    "&:hover": {
      background: "#249FFB",
    },
  },
  goBackButton: {
    color: "grey",
    fontWeight: "bold",
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
  },
  belowFold__keyFeatures__grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    height: "100%",
    gridGap: "1.5rem",
    marginBottom: "0.5rem",
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
  askingPrice: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    "& span": {
      color: "#85bb65",
    },
  },
  propertyDesc: {
    "& > div:nth-child(1)": {
      color: "black",
      fontSize: "1.1rem",
    },
    color: "grey",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    maxWidth: "55rem",
  },
  imagesContainer: {
    marginTop: "1.75rem",
  },
  imagePreview: {
    width: "12.5rem",
    height: "10rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  imagePreviewContainer: {
    display: "flex",
    gap: "1.2rem",
  },
  imageDialog: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: "0.25rem",
    borderRadius: "0.5rem",
  },
  imageDialogImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  buttonContainer: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "1.5rem",
  },
  closeOutContainer: {
    marginBottom: "0.5rem",
  },
  closeOutFlexContainer: {
    display: "flex",
    marginTop: "-2.5rem",
    marginLeft: "-2.5rem",
  },
}));

export default function ConfirmSellerListing({
  open,
  onClose,
  callback,
  propertyData,
  disabled,
}) {
  const keyFeaturesData = [
    {
      icon: <DomainIcon />,
      title: "Property Type",
      res: propertyData?.PropertyType,
    },
    {
      icon: <CalendarTodayIcon />,
      title: "Year Built",
      res: propertyData?.YearBuilt,
    },
    {
      icon: <MoneyIcon />,
      title: "Property Tax",
      res:
        "$" +
        propertyData?.PropertyTax.toString().replace(
          /\d{1,3}(?=(\d{3})+(?!\d))/g,
          "$&,"
        ),
    },
    {
      icon: <LocalParkingIcon />,
      title: "Garage Spaces",
      res: propertyData?.GarageSpaces,
    },
    {
      icon: <LocationCityIcon />,
      title: "Property Stories",
      res: propertyData?.Stories,
    },
    {
      icon: <TrafficIcon />,
      title: "Lot Size",
      res: `${parseFloat(propertyData?.LotSize.width).toFixed(
        2
      )} x ${parseFloat(propertyData?.LotSize.length).toFixed(2)} ${
        propertyData?.LotSize.unit === "Square Meter" ? "sqm" : "sqft"
      }`,
    },
    {
      icon: <StoreMallDirectoryIcon />,
      title: "House Build Size",
      res: `${(propertyData?.HouseSize.width * propertyData?.HouseSize.length)
        .toString()
        .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")} ${
        propertyData?.HouseSize.unit === "Square Meter" ? "sqm" : "sqft"
      }`,
    },
    {
      icon: <VerticalAlignBottomIcon />,
      title: "Basement",
      res: propertyData?.Basement === false ? "None" : "Yes",
    },
    {
      icon: <KingBedIcon />,
      title: "Bedrooms",
      res: propertyData?.Bedrooms,
    },
    {
      icon: <BathtubIcon />,
      title: "Bathrooms",
      res: propertyData?.Bathrooms,
    },
  ];

  const classes = useStyles();

  const [openKeyFeatures, setOpenKeyFeatures] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const KeyFeaturesDialog = () => {
    const classes = useStyles();

    let optionalDataMap = [
      {
        title: "Electricity & Lighting",
        data: propertyData?.["Electricity & Lighting"]["Options"],
      },
      {
        title: "Heating & Cooling",
        data: propertyData?.["Heating & Cooling"]["Options"],
      },
      {
        title: "Doors & Windows",
        data: propertyData?.["Doors & Windows"]["Options"],
      },
      {
        title: "Exterior Features",
        data: propertyData?.["Exterior Features"]["Options"],
      },
      {
        title: "Roof & Foundation",
        data: propertyData?.["Roof & Foundation"]["Options"],
      },
      {
        title: "Kitchen",
        data: propertyData?.["Kitchen"]["Options"],
      },
      {
        title: "Flooring",
        data: propertyData?.["Kitchen"]["Options"],
      },
      {
        title: "Other Features",
        data: propertyData?.["Other Features"]["Options"],
      },
    ];

    const sizeData = [
      {
        title: "House Size",
        width: propertyData?.["HouseSize"]["width"],
        length: propertyData?.["HouseSize"]["length"],
        unit: propertyData?.["HouseSize"]["unit"],
      },
      {
        title: "Living Area",
        width: propertyData?.["LivingArea"]["width"],
        length: propertyData?.["LivingArea"]["length"],
        unit: propertyData?.["LivingArea"]["unit"],
      },
      {
        title: "Lot Size",
        width: propertyData?.["LotSize"]["width"],
        length: propertyData?.["LotSize"]["length"],
        unit: propertyData?.["LotSize"]["unit"],
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
      let APIData = propertyData[data];
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
        <div className={classes.closeOutFlexContainer}>
          <IconButton onClick={() => setOpenKeyFeatures(false)}>
            <CloseIcon />
          </IconButton>
        </div>
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
              ${propertyData?.PropertyTax}
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

  const ImagesDialog = () => {
    return (
      <Dialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        classes={{ paper: classes.dialog }}
      >
        <div className={classes.closeOutContainer}>
          <IconButton onClick={() => setOpenImageDialog(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.imageDialog}>
          {propertyData?.HouseImages.map((i) => {
            return (
              <div>
                <img
                  src={i.image}
                  alt="house"
                  className={classes.imageDialogImage}
                />
              </div>
            );
          })}
        </div>
      </Dialog>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <div className={classes.dialogInner}>
        <div className={classes.header}>{propertyData?.StreetAddress}</div>
        <div className={classes.askingPrice}>
          Your Asking Price Is{" "}
          <span>${propertyData?.AskingPrice.toLocaleString("en")}</span>
        </div>
        <div className={classes.propertyDesc}>
          <div>Property Description</div>
          <div>{propertyData?.PropertyDescription}</div>
        </div>
        <div>
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
            className={classes.continueButton}
          >
            Show All
          </Button>
          <KeyFeaturesDialog />
        </div>

        {!propertyData?.PhotographyServices && (
          <div>
            <div className={classes.imagesContainer}>
              <div className={classes.askingPrice}>Your Selected Photos</div>
            </div>
            <div className={classes.imagePreviewContainer}>
              {[1, 2, 3, 4].map((i) => (
                <div>
                  <img
                    src={propertyData?.HouseImages[i].image}
                    alt="house"
                    className={classes.imagePreview}
                  />
                </div>
              ))}
            </div>
            <div>
              <Button
                className={classes.continueButton}
                onClick={() => {
                  setOpenImageDialog(true);
                }}
              >
                Show All
              </Button>
              <ImagesDialog />
            </div>
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => {
              setOpenKeyFeatures(false);
              onClose();
            }}
            className={classes.goBackButton}
          >
            Go Back
          </Button>
          <Button
            onClick={callback}
            className={classes.continueButton}
            disabled={disabled}
          >
            Continue
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
