import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../components/layout";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../components/states";
import axios from "axios";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import IconButton from "@material-ui/core/IconButton";
import Remove from "@material-ui/icons/Remove";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { TextField } from "formik-material-ui";
import ConfirmSellerListing from "../components/sellproperty/ConfirmSellerListing";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    display: "flex",
  },
  activeTab: {
    textAlign: "center",
    cursor: "pointer",
    background: "#E8F0FE",
    color: "#1A73E8",
    fontSize: "1rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    borderTopRightRadius: "7rem",
    borderBottomRightRadius: "7rem",
    paddingLeft: "2rem",
    transition: "all 0.25s ease",
  },
  icon: {
    marginTop: "0.4rem",
  },
  title: {},
  inactiveTab: {
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    color: "#848B94",
    "&:hover": {
      transition: "all 0.25s ease",
      backgroundColor: "#F1F1F1",
    },
    "&:active": {
      transition: "all 0.25s ease",
      backgroundColor: "#E4E4E4",
    },
    fontSize: "1rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    borderTopRightRadius: "7rem",
    borderBottomRightRadius: "7rem",
    paddingLeft: "2rem",
  },
  tabs: {
    width: "12.5rem",
    marginBottom: "auto",
    marginTop: "20rem",
  },
  photographerRoot: {
    display: "flex",
    marginLeft: "3rem",
    flexDirection: "column",
    marginTop: "10rem",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
  },
  cardRoot: {
    background: "white",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    padding: "2rem",
    borderRadius: "1rem",
  },
  address: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  description: {
    color: "grey",
    fontWeight: "bold",
  },
  button: {
    background: "black",
    color: "white",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    textTransform: "none",
    marginTop: "0.5rem",
    marginBottom: "0.25rem",
    "&:hover": {
      background: "black",
    },
  },
  seeAllButton: {
    background: "#1A73E8",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
    marginBottom: "0.25rem",
    marginTop: "0.25rem",
    textTransform: "none",
    "&:hover": {
      background: "#1A73E8",
    },
  },
  inputProps: {
    fontFamily: "Gilroy, sans-serif",
    width: "23rem",
  },
  typeVirtualTourContainer: {
    marginTop: "0.7rem",
    marginBottom: "0.7rem",
  },
  videoButton: {
    background: "#249FFB",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
    marginBottom: "0.25rem",
    marginTop: "0.5rem",
    textTransform: "none",
    "&:hover": {
      background: "#1A73E8",
    },
  },
  markButton: {
    marginTop: "0.25rem",
    background: "#39d688",
    color: "white",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    textTransform: "none",
    marginBottom: "0.5rem",
    "&:hover": {
      background: "#39d688",
    },
  },
  uploadImageContainer: {
    position: "relative",
    width: "20rem",
  },
  dialog: {
    padding: "2rem",
    borderRadius: "0.25rem",
    maxWidth: "70rem",
  },
  uploadImageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "0.25rem",
    marginBottom: "1rem",
  },
  uploadImage: {
    width: "20rem",
    height: "15rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  uploadRemoveButtonContainer: {
    position: "absolute",
    bottom: "0.85rem",
    right: "0.75rem",
  },
  uploadRemove: {
    background: "white",
    "&:hover": {
      background: "white",
    },
    color: "black",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
  },
  approvalRoot: {
    display: "flex",
    marginTop: "10rem",
    flexDirection: "column",
  },
  virtualTourContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    fontFamily: "Gilroy, sans-serif",
  },
  virtualTourHeader: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  firstThreeButtons: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  planContainer: {
    marginTop: "0.25rem",
  },
  planHeader: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "black",
  },
  approveCard: {
    fontFamily: "Gilroy, sans-serif",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    borderRadius: "0.75rem",
    overflow: "hidden",
  },
  house: {
    width: "25rem",
    height: "17rem",
    objectFit: "cover",
  },
  askingPrice: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  approveCardText: {
    padding: "1.15rem",
  },
  flexIcons: {
    display: "flex",
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
  },
  filterIcon: {
    width: "1.5rem",
  },
  filterText: {
    marginLeft: "0.25rem",
    marginRight: "1rem",
    marginTop: "0.1rem",
    color: "grey",
    fontSize: "0.9rem",
  },
  inDetailButton: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    padding: "1rem",
  },
  approveGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
  },
}));

export default function PhotographerPanel() {
  const classes = useStyles();
  const router = useRouter();
  const authLocalState = useRecoilValue(authState);

  const [activeTab, setActiveTab] = useState("Photographer");

  const [approvalTab, setApprovalTab] = useState(0);

  const [inDetail, setInDetail] = useState(false);

  useEffect(() => {
    if (
      authLocalState !== null &&
      authLocalState?.user?.email !== "verify@myhomely.io"
    ) {
      router.push("/photographerlogin");
    }
  }, [authLocalState]);

  const tabs = ["Photographer", "Approval"];

  const [NeedPhotography, setNeedPhotography] = useState([]);

  const [photographyCounter, setPhotographyCounter] = useState([]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const getViewProperty = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewNeedPhotography`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setNeedPhotography(res.data))
      .catch((err) => console.log());
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewNeedPhotography`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setNeedPhotography(res.data))
      .catch((err) => console.log());
  }, [photographyCounter]);

  const [counterRefresh, setCounterRefresh] = useState([]);
  const [listings, setListings] = useState([]);
  const [virtualTourDialog, setVirtualTourDialog] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewUnapprovedListings`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, [counterRefresh]);

  const NeedPhotographyCard = ({ listing }) => {
    const classes = useStyles();

    const [inputValues, setInputValues] = useState({
      HouseImages: [],
      video: "",
      floorplan: "",
      virtualTour: "",
    });

    return (
      <Formik
        enableReinitialize
        initialValues={inputValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        isValidating
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
          isValidating,
        }) => {
          console.log(values);
          const onAdded = (i, values) => {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/submitPropertyPhotos`,
                {
                  listingID: i._id,
                  values: values,
                },
                { withCredentials: true }
              )
              .then((res) => {
                const rerenderVal = [...photographyCounter, 1];
                setPhotographyCounter(rerenderVal);
              })
              .catch((err) => {
                console.log(err.response);
              });

            const rerenderVal = [...photographyCounter, 1];
            setPhotographyCounter(rerenderVal);
          };

          const [openDialog, setOpenDialog] = useState(false);
          console.log(listing);
          return (
            <Form>
              <div className={classes.cardRoot}>
                <div className={classes.address}>
                  {listing.query.StreetAddress}
                </div>
                <div className={classes.description}>
                  Bedrooms: {listing.query.Bedrooms} &bull; Bathrooms:{" "}
                  {listing.query.Bathrooms} &bull; sqft:{" "}
                  {Math.ceil(listing.query.HouseSize.area).toLocaleString("en")}
                </div>
                <div className={classes.planContainer}>
                  <div className={classes.planHeader}>
                    {listing?.query?.PhotographyPackage.type} Pack
                  </div>
                </div>
                <div>
                  <FieldArray
                    name="HouseImages"
                    render={(arrayHelpers) => (
                      <div>
                        <div className={classes.firstThreeButtons}>
                          <div>
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="raised-button-file"
                              multiple
                              type="file"
                              name="property"
                              onChange={(event) => {
                                const files = event.target.files;
                                for (var i = 0, f; (f = files[i]); i++) {
                                  // Only process image files.
                                  if (!f.type.match("image.*")) {
                                    continue;
                                  }

                                  var reader = new FileReader();

                                  // Closure to capture the file information.
                                  reader.onload = (function (theFile) {
                                    return function (e) {
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
                                className={classes.button}
                              >
                                Add Pictures
                              </Button>
                            </label>
                          </div>

                          <div>
                            <input
                              accept="video/*"
                              style={{ display: "none" }}
                              id="raised-button-video"
                              type="file"
                              onChange={(event) => {
                                const f = event.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (function (theFile) {
                                  return function (e) {
                                    setFieldValue(
                                      "video",
                                      e.currentTarget.result
                                    );
                                  };
                                })(f);
                                reader.readAsDataURL(f);
                              }}
                            />
                            <label htmlFor="raised-button-video">
                              <Button
                                variant="raised"
                                component="span"
                                className={classes.videoButton}
                              >
                                Add Video
                              </Button>
                            </label>
                          </div>

                          <div>
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="raised-button-floorplan"
                              type="file"
                              onChange={(event) => {
                                const f = event.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (function (theFile) {
                                  return function (e) {
                                    setFieldValue("floorplan", e.target.result);
                                  };
                                })(f);
                                reader.readAsDataURL(f);
                              }}
                            />
                            <label htmlFor="raised-button-floorplan">
                              <Button
                                variant="raised"
                                component="span"
                                className={classes.videoButton}
                              >
                                Add Floorplan
                              </Button>
                            </label>
                          </div>
                        </div>

                        {values.HouseImages.length >= 1 && (
                          <div className={classes.seeAllContainer}>
                            <Button
                              onClick={() => setOpenDialog(true)}
                              className={classes.seeAllButton}
                            >
                              See All Images
                            </Button>
                          </div>
                        )}

                        <div className={classes.typeVirtualTourContainer}>
                          <Field
                            component={TextField}
                            name={"virtualTour"}
                            placeholder={"Type Virtual Tour Link"}
                            InputProps={{
                              className: classes.inputProps,
                            }}
                            InputLabelProps={{
                              className: classes.inputProps,
                            }}
                            variant="outlined"
                          />
                        </div>

                        <Dialog
                          open={openDialog}
                          onClose={() => setOpenDialog(false)}
                          classes={{ paper: classes.dialog }}
                        >
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
                                  className={
                                    classes.uploadRemoveButtonContainer
                                  }
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
                        </Dialog>
                        <div className={classes.error}>
                          {errors.HouseImages ? errors.HouseImages : null}
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                  <div>
                    <Button
                      onClick={() => onAdded(listing, values)}
                      className={classes.markButton}
                    >
                      Mark As Complete
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.tabs}>
          {tabs.map((i) => {
            if (i === activeTab) {
              return (
                <div className={classes.activeTab}>
                  <div className={classes.tilte}>{i}</div>
                </div>
              );
            } else {
              return (
                <div
                  className={classes.inactiveTab}
                  onClick={() => {
                    setActiveTab(i);
                  }}
                >
                  <div className={classes.title}>{i}</div>
                </div>
              );
            }
          })}
        </div>

        {activeTab === "Photographer" && (
          <div className={classes.photographerRoot}>
            <div className={classes.header}>
              House Listings With Photos Needed
            </div>
            <div className={classes.grid}>
              {NeedPhotography.map((i) => (
                <NeedPhotographyCard listing={i} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Approval" && (
          <div className={classes.approvalRoot}>
            <div className={classes.header}>Approval For Listings & ID's</div>
            <div>
              <Tabs
                value={approvalTab}
                onChange={(e, newVal) => {
                  setApprovalTab(newVal);
                }}
                aria-label="simple tabs example"
              >
                <Tab label="Listings" {...a11yProps(0)} />
                <Tab label="Identification" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={approvalTab} index={0}>
                <div className={classes.approveGrid}>
                  {listings.map((i) => (
                    <div className={classes.approveCard}>
                      <img
                        src={i.query.HouseImages[0]}
                        alt="house"
                        className={classes.house}
                      />
                      <div className={classes.approveCardText}>
                        <div className={classes.askingPrice}>
                          ${i.query.AskingPrice.toLocaleString("en")}
                        </div>
                        <div className={classes.flexIcons}>
                          <div className={classes.filter}>
                            <img
                              src="/Icons/bed.svg"
                              alt="bed"
                              className={classes.filterIcon}
                            />
                            <span className={classes.filterText}>
                              {i?.query?.Bedrooms} Beds
                            </span>
                          </div>
                          <div className={classes.filter}>
                            <img
                              src="/Icons/bath.svg"
                              alt="bath"
                              className={classes.filterIcon}
                            />
                            <span className={classes.filterText}>
                              {i?.query?.Bathrooms} Baths
                            </span>
                          </div>
                          <div className={classes.filter}>
                            <img
                              src="/Icons/sqft.svg"
                              alt="sqft"
                              className={classes.filterIcon}
                            />
                            <span className={classes.filterText}>
                              {i?.query?.HouseSize?.area.toLocaleString("en")}{" "}
                              sqft
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setInDetail(true);
                          }}
                          className={classes.inDetailButton}
                        >
                          View In Detail
                        </Button>
                      </div>
                      <div>
                        <ConfirmSellerListing
                          open={inDetail}
                          onClose={() => setInDetail(false)}
                          propertyData={i?.query}
                          callback={() => setInDetail(false)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={approvalTab} index={1}>
                Item Two
              </TabPanel>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
