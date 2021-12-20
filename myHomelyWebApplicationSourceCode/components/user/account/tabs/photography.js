import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import { IconButton } from "@material-ui/core";
import { ArrowForward, Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      marginLeft: "2rem",
    },
    grid: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      width: "67.5rem",
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
      marginBottom: "1.25rem",
      "&:hover": {
        background: "black",
      },
    },
    markButton: {
      background: "#39d688",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      marginBottom: "1.25rem",
      marginTop: "-0.5rem",
      "&:hover": {
        background: "#39d688",
      },
    },
    uploadImageContainer: {
      position: "relative",
      width: "20rem",
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
  })
);
const Card = ({ listing }) => {
  const classes = useStyles();
  const [photographyCounter, setPhotographyCounter] = useState([]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        HouseImages: [],
      }}
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
        const onAdded = (i, HouseImages) => {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/submitPropertyPhotos`,
              {
                listingID: i._id,
                HouseImages: HouseImages,
              },
              { withCredentials: true }
            )
            .then((res) => {
              const rerenderVal = [...photographyCounter, 1];
              setPhotographyCounter(rerenderVal);
            })
            .catch((err) => console.log(err));
        };
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
              <div>
                <FieldArray
                  name="HouseImages"
                  render={(arrayHelpers) => (
                    <div>
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
                            className={classes.button}
                          >
                            Add Pictures
                          </Button>
                        </label>
                      </div>
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

                      <div className={classes.error}>
                        {errors.HouseImages ? errors.HouseImages : null}
                      </div>
                    </div>
                  )}
                ></FieldArray>
                <div>
                  <Button
                    onClick={() => onAdded(listing, values.HouseImages)}
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

export default function Photography() {
  const classes = useStyles();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewNeedPhotography`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(listings);
  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        {listings.map((i) => (
          <Card listing={i} />
        ))}
      </div>
    </div>
  );
}
