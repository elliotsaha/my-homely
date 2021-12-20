import React from "react";
import { FastField, Field, FieldArray } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button, Slider, IconButton } from "@material-ui/core";
import { ArrowForward, Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  biggerHeader: {
    fontFamily: "Gilroy, sans-serif",
    color: "#08184A",
    fontSize: "2rem",
    fontWeight: "bold",
    lineHeight: "2.5rem",
    [theme.breakpoints.down("580")]: {
      fontSize: "1.8rem",
      lineHeight: "2.2rem",
      marginBottom: "0.89rem",
    },
    [theme.breakpoints.down("400")]: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      marginBottom: "0.8rem",
    },
  },
  photosAndVideos: {
    width: "100%",
    marginBottom: "5rem",
  },
  photosCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "1rem",
    [theme.breakpoints.down("1045")]: {
      justifyContent: "start",
      alignItems: "start",
      marginLeft: "0.8rem",
    },
    [theme.breakpoints.down("800")]: {
      marginLeft: "0.5rem",
    },
  },
  photosAndVideosText: {
    textAlign: "center",
    maxWidth: "30rem",
    marginBottom: "3rem",
    [theme.breakpoints.down("1045")]: {
      textAlign: "left",
      maxWidth: "45rem",
      marginBottom: "1rem",
    },
  },
  photosAndVideosPicture: {
    width: "30rem",
    height: "20rem",
    objectFit: "cover",
    borderRadius: "0.35rem",
    [theme.breakpoints.down("1045")]: {
      width: "25rem",
    },
    [theme.breakpoints.down("900")]: {
      width: "100%",
    },
  },
  beforeAndAfterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    [theme.breakpoints.down("570")]: {
      flexDirection: "column",
    },
  },
  beforeAndAfterChild: {
    position: "relative",
  },
  photosTag: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "white",
    borderRadius: "0.1rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    padding: "0.5rem",
  },
  photosSelectContainer: {
    marginLeft: "1.1rem",
    maxWidth: "45rem",
    [theme.breakpoints.down("800")]: {
      marginLeft: "0.5rem",
    },
  },
  photosSelectText: {},
  photoSelectButtonContainer: {
    marginTop: "1rem",
    marginBottom: "1rem",
    position: "relative",
  },
  buttonRecommended: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "0.6rem",
    marginLeft: "0.5rem",
    marginTop: "0.25rem",
    color: "#08184A",
    fontFamily: "Gilroy, sans-serif",
  },
  photoPrice: {
    color: "#249FFB",
  },

  para: {
    marginTop: "0.5rem",
    fontFamily: "Gilroy, sans-serif",
    fontSize: "1.1rem",
  },

  medButtonGroup: {
    marginTop: "1.2rem",
    height: "2.75rem",
  },
  buttonActive: {
    height: "100%",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#08184A",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#08184A",
    },
  },
  buttonInactive: {
    height: "100%",
    fontWeight: "bold",
    width: "6rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "#08184A",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },
  recomended: {
    textTransform: "uppercase",
    marginLeft: "0.75rem",
    fontSize: "0.65rem",
    fontWeight: "bold",
    color: "#08184A",
  },
  formControlLabel: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("400")]: {
      fontSize: "0.8rem",
    },
  },
  quotesContainer: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
  },
  inputProps: {
    width: "12rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },

  longInputProps: {
    width: "25.25rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
    [theme.breakpoints.down("425")]: {
      fontSize: "0.8rem",
    },
  },
  paymentSecondaryFlex: {
    display: "flex",
    gap: "1.25rem",
    marginTop: "1rem",
  },
  cardNumberHeader: {
    marginTop: "1.25rem",
  },
  paymentContainer: {
    marginTop: "2rem",
  },

  uploadImage: {
    width: "17.5rem",
    height: "17.5rem",
    objectFit: "cover",
  },
  uploadImageContainer: {
    position: "relative",
    width: "17.5rem",
    height: "17.5rem",
  },
  uploadRemoveButtonContainer: {
    zIndex: 100,
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
  },
  uploadRemove: {
    zIndex: 100,
    background: "white",
    "&:hover": {
      background: "white",
    },
    outline: "linear-gradient(to left, #6f0000, #ff6a00)",
    boxShadow:
      "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12),0 4px 4px rgba(0,0,0,0.12),0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
  },
  uploadImageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "0.25rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  uploadImageRoot: {
    marginTop: "3.5rem",
  },
  greenOutlineButton: {
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    border: "0.15rem solid #249FFB",
    padding: "1rem",
    color: "#249FFB",
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
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    },
  },

  subSelectHeader: {
    color: "grey",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "#08184A",
    fontSize: "1.2rem",
    marginBottom: "0.75rem",
  },
  error: {
    color: "#f44336",
    opacity: "80%",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  buttonGroupContainer: {
    display: "flex",
  },
  buttonGroup: {
    height: "3.45rem",
    marginLeft: "1rem",
  },
  professionalServicesContainer: {
    marginLeft: "1rem",
  },
  buttonActiveServices: {
    height: "100%",
    fontWeight: "bold",
    width: "15rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#08184A",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#08184A",
    },
  },
  buttonInactiveServices: {
    height: "100%",
    fontWeight: "bold",
    width: "15rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "#08184A",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },

  buttonActive: {
    height: "100%",
    fontWeight: "bold",
    width: "10rem",
    fontFamily: "Gilroy, sans-serif",
    color: "#FDFDFD",
    background: "#08184A",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#08184A",
    },
  },
  buttonInactive: {
    height: "100%",
    fontWeight: "bold",
    width: "10rem",
    fontFamily: "Gilroy, sans-serif",
    background: "red",
    color: "#08184A",
    background: "#f2f0f0",
    lineHeight: "1.1rem",
    "&:hover": {
      background: "#f2f0f0",
    },
  },

  greenButton: {
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    background: "#249FFB",
    padding: "1rem",
    color: "white",
    fontWeight: "bolder",
    "&:hover": {
      background: "#249FFB",
    },
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
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    },
  },
  greenButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  professionalServicesContainer: {
    marginTop: "2rem",
    marginLeft: "1rem",
    display: "flex",
    gap: "0.5rem",
  },
  cardContainer: {
    borderRadius: "0.25rem",
    width: "20rem",
    padding: "1rem",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 6px 12px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
    cursor: "pointer",
  },
  cardContainerActive: {
    borderRadius: "0.25rem",
    width: "20rem",
    padding: "1rem",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 6px 12px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
    border: "solid 0.15rem #249FFB",
  },
  cardContainerBlue: {
    borderRadius: "0.25rem",
    boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 6px 12px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
    width: "20rem",
    padding: "1rem",
    background: "#249FFB",
    color: "white",
    paddingTop: "3rem",
    paddingBottom: "3.5rem",
    cursor: "pointer",
  },
  cardContainerBlueActive: {
    borderRadius: "0.25rem",
    boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 6px 12px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
    width: "20rem",
    padding: "1rem",
    background: "#249FFB",
    color: "white",
    paddingTop: "3rem",
    paddingBottom: "3.5rem",
    border: "solid 0.15rem #E8219C",
  },
  cardTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "0.15rem",
    color: "grey",
    fontSize: "0.95rem",
  },
  cardTitleBlue: {
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "0.15rem",
    fontSize: "0.95rem",
    color: "white",
  },
  cardPrice: {
    fontWeight: "bold",
    fontSize: "2.7rem",
  },
  cardDescription: {
    marginTop: "-0.2rem",
    fontWeight: "bold",
    color: "grey",
    marginBottom: "0.35rem",
  },
  cardDescriptionBlue: {
    marginTop: "-0.2rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "0.35rem",
  },
  hr: {
    color: "grey",
    background: "grey",
  },
  blueBar: {
    width: "100%",
    background: "white",
    height: "0.05rem",
    marginBottom: "1rem",
  },
  moreFilesError: {
    marginTop: "0.5rem",
    fontWeight: "bold",
    color: "grey",
  },
}));

export default function PhotosAndVideos({
  touched,
  errors,
  setFieldValue,
  values,
  handleAccordionNext,
}) {
  const classes = useStyles();

  // Photography Services

  const photographyCards = [
    {
      title: "Starter",
      description: "Just the Basics to Get You Started",
    },
    {
      title: "Premium",
      description:
        "Add immersive experience for potential buyer and potential higher asking price",
    },
    {
      title: "Premium Plus",
      description: "Add HDR video for finer details and clarity",
    },
    {
      title: "Ultimate",
      description: "For Those who want their home sold in no time",
    },
  ];

  const getSqftDollar = () => {
    if (values.HouseSize.width !== "" && values.HouseSize.length !== "") {
      let area = values.HouseSize.width * values.HouseSize.length;
      if (values.HouseSize.unit === "Square Meter") {
        area = values.HouseSize.width * values.HouseSize.length * 10.7639;
      }
      if (area < 1000) {
        return [150, 250, 350, 500];
      } else if (area <= 2500 && area >= 1000) {
        return [170, 300, 400, 550];
      } else if (area <= 3500 && area > 2500) {
        return [190, 400, 550, 700];
      } else if (area <= 5000 && area > 3500) {
        return [210, 450, 650, 800];
      } else {
        return [290, 600, 850, 1000];
      }
    } else {
      return [150, 200, 250, 450];
    }
  };

  const [fileTooBig, setFileTooBig] = React.useState(false);

  React.useEffect(() => {
    setFieldValue("PhotographyPackage", {
      type: "Starter",
      price: getSqftDollar()[0],
    });
  }, [values.HouseSize]);

  const professionalServices = [
    ["Unlimated HDR Photos"],
    [
      "Unlimated HDR Photos",
      "Immersive 360 / 3D Virtual Tour",
      "Full Floor Plan",
    ],
    [
      "Unlimated HDR Photos",
      "Immersive 360 / 3D Virtual Tour",
      "Full Floor Plan",
      "Premium Video Tour",
    ],
    [
      "Unlimated FLASH Magazine Quality Photos",
      "Immersive 360 / 3D Virtual Tour",
      "Full Floor Plan",
      "Premium Video Tour",
      "Cinematic Video Tour",
      "Drone Ariel HDR Photos and Videos",
    ],
  ];
  return (
    <div className={classes.root}>
      <div className={classes.photosAndVideos}>
        <div className={classes.photosCenter}>
          <div className={classes.photosAndVideosText}>
            <div className={classes.biggerHeader}>Did you know?</div>
            <div className={classes.para}>
              Listings with professional quality photos attract <b>6 times</b>{" "}
              more buyer inquiries, sell <b>32% faster,</b> and sell for{" "}
              <b>$3,000 to $11,000</b> more
            </div>
          </div>
          <div className={classes.beforeAndAfterContainer}>
            <div className={classes.beforeAndAfterChild}>
              <div className={classes.photosTag}>Amateur Enthusiast</div>
              <img
                src="/Sellproperty/before.jpg"
                alt="Amateur Enthusiast"
                className={classes.photosAndVideosPicture}
              />
            </div>
            <div className={classes.beforeAndAfterChild}>
              <div className={classes.photosTag}>Professional</div>
              <img
                src="/Sellproperty/after.jpg"
                alt="Professional"
                className={classes.photosAndVideosPicture}
              />
            </div>
          </div>
        </div>

        {/* BUTTON TO SWITCH PHOTOGRAPHY SERVICES*/}
        <div className={classes.buttonGroupContainer}>
          <ButtonGroup
            disableElevation
            variant="contained"
            color="inherit"
            className={classes.buttonGroup}
          >
            <Button
              className={
                values.PhotographyServices
                  ? classes.buttonInactive
                  : classes.buttonActive
              }
              onClick={() => {
                setFieldValue("PhotographyServices", false);
              }}
            >
              Own Photos
            </Button>
            <Button
              className={
                values.PhotographyServices
                  ? classes.buttonActiveServices
                  : classes.buttonInactiveServices
              }
              onClick={() => {
                setFieldValue("PhotographyServices", true);
              }}
            >
              Professional Services
            </Button>
          </ButtonGroup>
        </div>
        {values.PhotographyServices ? (
          <div className={classes.professionalServicesContainer}>
            {photographyCards.map((i, index) => {
              if (index !== 3) {
                return (
                  <div
                    className={
                      values.PhotographyPackage.type === i.title
                        ? classes.cardContainerActive
                        : classes.cardContainer
                    }
                    onClick={() => {
                      setFieldValue("PhotographyPackage", {
                        type: i.title,
                        price: getSqftDollar()[index],
                      });
                    }}
                  >
                    <div className={classes.cardTitle}>{i.title}</div>
                    <div className={classes.cardPrice}>
                      ${getSqftDollar()[index]}
                    </div>
                    <div className={classes.cardDescription}>
                      {i.description}
                    </div>
                    <hr className={classes.hr} />
                    <div className={classes.cardDetails}>
                      {professionalServices[index].map((i) => (
                        <div>{i}</div>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className={
                    values.PhotographyPackage.type === i.title
                      ? classes.cardContainerBlueActive
                      : classes.cardContainerBlue
                  }
                  onClick={() => {
                    setFieldValue("PhotographyPackage", {
                      type: i.title,
                      price: getSqftDollar()[index],
                    });
                  }}
                >
                  <div className={classes.cardTitleBlue}>{i.title}</div>
                  <div className={classes.cardPrice}>
                    ${getSqftDollar()[index]}
                  </div>
                  <div className={classes.cardDescriptionBlue}>
                    {i.description}
                  </div>
                  <div className={classes.blueBar} />
                  <div className={classes.cardDetails}>
                    {professionalServices[index].map((i) => (
                      <div>{i}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={classes.photosSelectContainer}>
            <div className={classes.photosSelectText}>
              <div>
                <div className={classes.uploadImageRoot}>
                  <div className={classes.biggerHeader}>
                    Please Post Your Own Images
                  </div>
                  <div className={classes.subSelectHeader}>
                    Select 16-25 Images
                  </div>
                  <FieldArray
                    name="HouseImages"
                    render={(arrayHelpers) => (
                      <div>
                        <div className={classes.uploadImageGrid}>
                          {values.HouseImages.map((i, index) => (
                            <div className={classes.uploadImageContainer}>
                              <div>
                                <img
                                  src={i.image}
                                  alt="building"
                                  className={classes.uploadImage}
                                />
                              </div>

                              <div
                                className={classes.uploadRemoveButtonContainer}
                              >
                                <IconButton
                                  size="small"
                                  className={classes.uploadRemove}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <Remove />
                                </IconButton>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            name="property"
                            disabled={
                              values.HouseImages.length >= 25 ? true : false
                            }
                            onChange={(event) => {
                              const files = event.target.files;
                              for (var i = 0, f; (f = files[i]); i++) {
                                // Only process image files.
                                if (files[i].size >= 2097152) {
                                  setFileTooBig(true);
                                  return;
                                } else {
                                  setFileTooBig(false);
                                }

                                if (!f.type.match("image.*")) {
                                  continue;
                                }

                                var reader = new FileReader();

                                // Closure to capture the file information.
                                reader.onload = (function (theFile) {
                                  return function (e) {
                                    console.log(e.target.result);
                                    arrayHelpers.push({
                                      image: e.target.result,
                                    });
                                  };
                                })(f);
                                reader.readAsDataURL(f);
                              }
                            }}
                          />
                          <label htmlFor="raised-button-file">
                            <Button
                              variant="raised"
                              component="span"
                              disabled={
                                values.HouseImages.length >= 25 ? true : false
                              }
                              className={classes.greenOutlineButton}
                              startIcon={<Add />}
                            >
                              Upload
                            </Button>
                          </label>
                        </div>
                        {fileTooBig && (
                          <div className={classes.moreFilesError}>
                            Error: One Or More Files You Have Selected Is Over 2
                            MB
                          </div>
                        )}
                        <div className={classes.error}>
                          {errors.HouseImages ? errors.HouseImages : null}
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={classes.greenButtonContainer}>
        <Button
          className={classes.greenButton}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleAccordionNext(6);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
