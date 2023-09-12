import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import { IconButton } from "@material-ui/core";
import { ArrowForward, Add, Remove } from "@material-ui/icons";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      marginLeft: "2rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "1rem",
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
      marginTop: "0.5rem",
      "&:hover": {
        background: "#39d688",
      },
    },
    fileRoot: {
      display: "flex",
      marginTop: "-0.5rem",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "0.5rem",
    },
    fileContainer: {
      background: "black",
      color: "white",
      fontWeight: "bold",
      display: "flex",
      paddingTop: "0.5rem",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      borderRadius: "0.25rem",
      verticalAlign: "middle",
    },
    descriptionText: {
      marginTop: "0.15rem",
    },
    descriptionIcon: {
      marginBottom: "0.5rem",
      marginRight: "0.25rem",
      verticalAlign: "middle",
    },
  })
);

export default function Lawyer() {
  const classes = useStyles();
  const [listings, setListings] = useState([]);

  const [videoCounter, setVideoCounter] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/viewNeedLegals`, {
        withCredentials: true,
      })
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => console.log(err));
  }, [videoCounter]);

  const Card = ({ listing }) => {
    return (
      <Formik
        enableReinitialize
        initialValues={{
          ProvidedLegalDocuments: [],
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
          const onAdded = (i, ProvidedLegalDocuments) => {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/submitLegalDocuments`,
                {
                  listingID: i._id,
                  ProvidedLegalDocuments: ProvidedLegalDocuments,
                },
                { withCredentials: true }
              )
              .then((res) => {
                const rerenderVal = [...videoCounter, 1];
                setVideoCounter(rerenderVal);
              })
              .catch((err) => console.log(err));
          };
          return (
            <Form>
              <div className={classes.cardRoot}>
                <div className={classes.address}>
                  {listing?.query?.StreetAddress}
                </div>
                <div className={classes.description}>
                  Bedrooms: {listing?.query?.Bedrooms} &bull; Bathrooms:{" "}
                  {listing?.query?.Bathrooms} &bull; sqft:{" "}
                  {Math.ceil(listing?.query?.HouseSize?.area).toLocaleString(
                    "en"
                  )}
                </div>
                <div>
                  <FieldArray
                    name="ProvidedLegalDocuments"
                    render={(arrayHelpers) => (
                      <div>
                        <div>
                          <input
                            accept="application/pdf"
                            style={{ display: "none" }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            name="property"
                            onChange={(event) => {
                              const files = event.target.files;
                              for (var i = 0, f; (f = files[i]); i++) {
                                // Only process image files.
                                /*
                                  // TODO: Fix this security vuln
                                if (!f.type.match("image.*")) {
                                  continue;
                                }
                                  * */

                                var reader = new FileReader();

                                // Closure to capture the file information.
                                reader.onload = (function (theFile) {
                                  return function (e) {
                                    console.log(e.target.result);
                                    arrayHelpers.push({
                                      name: theFile.name,
                                      file: e.target.result,
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
                              Add Legal Documents
                            </Button>
                          </label>
                        </div>
                        <div className={classes.fileRoot}>
                          {values.ProvidedLegalDocuments.map((i, index) => (
                            <div className={classes.fileContainer}>
                              <DescriptionIcon
                                className={classes.descriptionIcon}
                              />
                              <div className={classes.descriptionText}>
                                {i.name}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <Button
                            onClick={() =>
                              onAdded(listing, values.ProvidedLegalDocuments)
                            }
                            className={classes.markButton}
                          >
                            Mark As Done
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };
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
