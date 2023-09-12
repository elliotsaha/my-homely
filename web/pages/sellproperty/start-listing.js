import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ExpandMore } from "@material-ui/icons";
import { Formik, Form, FieldArray, FastField } from "formik";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import axios from "axios";

import { animateScroll as scroll } from "react-scroll";
// CUSTOM COMPONENTS
import formatCash from "../../components/FormatCash";
import Stepper from "../../components/sellproperty/stepper";

// FORM
import inputForm from "../../components/sellproperty/formik.json";
import formValidation from "../../components/sellproperty/formikValidation";
// ACCORDIONS
import BasicDetails from "../../components/sellproperty/accordions/basicDetails";
import MoreDetails from "../../components/sellproperty/accordions/moreDetails";
import OptionalDetails from "../../components/sellproperty/accordions/optionalDetails";
import AskingPrice from "../../components/sellproperty/accordions/askingPrice";
import PhotosAndVideos from "../../components/sellproperty/accordions/photosAndVideos";
import ExtraCare from "../../components/sellproperty/accordions/extraCare";
import Marketing from "../../components/sellproperty/accordions/marketing";
import Legal from "../../components/sellproperty/accordions/legal";
import ScheduleDates from "../../components/sellproperty/accordions/scheduleDates";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Axios from "axios";
import StripeCard from "../../components/sellproperty/stripeCard";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { authState } from "../../components/states";
import ConfirmSellerListing from "../../components/sellproperty/ConfirmSellerListing";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    marginTop: "8rem",
    position: "relative",
    "& .Mui-error": {
      fontFamily: "Gilroy, sans-serif",
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "Gilroy, sans-serif",
    },
  },

  inner: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    marginTop: "3rem",
  },

  accordionAllContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1.25rem",
    marginLeft: "1.25rem",
    flexDirection: "column",
  },

  accordion: {
    maxWidth: "65rem",
    width: "100%",
    minWidth: "60rem", // for testing purposes TODO: remove after
  },

  accordionRoot: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& > div": {
      margin: "1rem",
      marginBottom: "1.5rem",
    },
  },

  stripeError: {
    color: "red",
  },
  heading: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    fontSize: "1.25rem",
    flexBasis: "33.33%",
    color: "#08184A",
    flexShrink: 0,
  },

  flexCenterTitle: {
    display: "flex",
    alignItems: "center",
  },
  errorIcon: {
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  },
  buttonContainer: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  submitContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorNotice: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    marginTop: "0.25rem",
    maxWidth: "15rem",
    textAlign: "right",
    color: "#ff6961",
  },
  owedAmount: {
    maxWidth: "19rem",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "grey",
  },
  greenButton: {
    maxWidth: "5rem",
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
  dialogPaper: {
    borderRadius: "0.5rem",
    padding: "1.25rem",
    fontFamily: "Gilroy, sans-serif",
    width: "35rem",
  },
  stripeHeader: {
    fontWeight: "bold",
    fontSize: "1.6rem",
    marginBottom: "1rem",
  },
  confirmStripeButton: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  stripeOwedAmount: {
    marginBottom: "0.15rem",
    fontWeight: "bold",
    color: "grey",
  },
  stripeTotalAmount: {
    marginBottom: "0.15rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  stripeSubAmount: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "grey",
  },
}));

export default function StartListing() {
  const classes = useStyles();

  const router = useRouter();
  const { query } = router;
  // MUI Accordian State
  const [accordionExpanded, setAccordionExpanded] = useState(1);

  // MUI Accordian Handler
  const handleAccordionExpandChange = (panel) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? panel : false);
  };

  // Function that scrolls to top of the screen
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 450,
      delay: 10,
      smooth: "ease",
    });
  };

  // TODO: Replace with an alternative way of loading data from previous page
  // On render, set coordinates to state
  const [coordinates, setCoordinates] = useState({
    lat: query.lat,
    lng: query.lng,
  });

  // on coordinate change
  useEffect(() => {
    setCoordinates({
      lat: query.lat,
      lng: query.lng,
    });
  }, [query]);

  // Stepper Functionality on Accordian Switch
  const [stepperValue, setStepperValue] = useState(30);
  const [stepperMessage, setStepperMessage] = useState(
    "Let's Get The Important Details"
  );

  useEffect(() => {
    if (accordionExpanded === 1) {
      setStepperValue(30);
      setStepperMessage("Let's Get The Important Details");
    }
    if (accordionExpanded === 2) {
      setStepperValue(40);
      setStepperMessage("Your Doing a Great Job!");
    }
    if (accordionExpanded === 3) {
      setStepperValue(55);
      setStepperMessage("Keep Going!");
    }
    if (accordionExpanded === 4) {
      setStepperValue(70);
      setStepperMessage("Almost There!");
    }
    if (accordionExpanded === 5) {
      setStepperValue(75);
      setStepperMessage("Just A Little Left!");
    }
    if (accordionExpanded === 6) {
      setStepperValue(82);
      setStepperMessage("Market Your Home");
    }
    if (accordionExpanded === 7) {
      setStepperValue(90);
      setStepperMessage("Choosing Legal Services");
    }
    if (accordionExpanded === 8) {
      setStepperValue(95);
      setStepperMessage("Last Step!");
    }
  }, [accordionExpanded]);

  // Panel 1 Variables
  const panel1Vars = [
    "owners",
    "StreetAddress",
    "Unit",
    "PropertyType",
    "YearBuilt",
    "PropertyTax",
    "PropertyTaxPayment",
    "HouseSize",
    "LotSize",
    "Stories",
    "Bedrooms",
    "Bathrooms",
    "GarageSpaces",
    "ParkingSpaces",
    "Basement",
  ];

  // Panel 2 Variables
  const panel2Vars = [
    "Exterior Features",
    "Kitchen",
    "Flooring",
    "Electricity & Lighting",
    "Heating & Cooling",
    "Doors & Windows",
    "Other Features",
    "Roof & Foundation",
  ];

  const [formSubmitValues, setFormSubmitValues] = useState(null);

  const submit = (values) => {
    setFormSubmitValues(values);
    /*
    Axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/submitForm`,
      {
        query: values,
        location: coordinates,
      },
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      * */
  };

  const getPrice = (values) => {
    let sum = 0;
    let arr = [];
    if (values) {
      if (values?.PhotographyServices) {
        sum += values?.PhotographyPackage.price;
        arr.push(`${values?.PhotographyPackage.type} Photography Plan`);
      }
      if (values?.MarketYourHome.emailCampaign) {
        sum += 100;
        arr.push("Email Campaign");
      }
      if (values?.MarketYourHome?.socialMediaCampaign) {
        sum += 100;
        arr.push("Social Media Campaign");
      }
      if (values?.LegalServices?.representation) {
        sum += 1100;
        arr.push("Legal Representation");
      }

      if (values?.ExtraCareService?.Extra) {
        sum += 499;
        arr.push("Extra Care Service");
      }

      if (values?.ExtraCareService?.Basic) {
        sum += 249;
        arr.push("Basic Care Service");
      }

      return {
        sum: sum,
        arr: arr,
      };
    }
  };

  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (formSubmitValues !== null) {
      console.log(formSubmitValues);
      setConfirm(true);
    }
  }, [formSubmitValues]);
  console.log("SUBMIT VALUES", formSubmitValues);
  // STRIPE
  const stripe = useStripe();
  const elements = useElements();

  const authLocalState = useRecoilValue(authState);

  const [stripeError, setStripeError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmitNoPayment = async () => {
    setLoading(true);
    Axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/submitForm`,
      {
        query: formSubmitValues,
        location: coordinates,
      },
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        router.push("/propertyListingSuccess");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const amount =
      getPrice(formSubmitValues)?.sum +
      getPrice(formSubmitValues)?.sum * (taxPayment?.tax / 100);

    console.log(amount);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/stripePayment`,
      {
        amount: amount,
        email: authLocalState.user.email,
      }
    );

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: authLocalState.user.email,
        },
      },
    });

    if (result.error) {
      setStripeError(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/seller/submitForm`,
          {
            query: formSubmitValues,
            location: coordinates,
          },
          {
            withCredentials: true,
          }
        )
          .then((res) => {
            router.push("/propertyListingSuccess");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [location, setLocation] = useState({
    status: 300,
    data: null,
  });

  const [taxError, setTaxError] = useState(false);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((res) => {
        console.log(res.data);
        setLocation({
          status: 200,
          data: res.data.region_code,
        });
      })
      .catch((err) => {
        setLocation({
          status: 500,
          data: null,
        });
      });
  }, []);

  const [ipSnackbar, setIpSnackbar] = useState(false);

  useEffect(() => {
    if (location.status === 500) {
      setIpSnackbar(true);
    }
  }, [location]);

  const [taxPayment, setTaxPayment] = useState(0);
  useEffect(() => {
    const arr = [
      {
        location: "YT",
        tax: 5,
        type: "GST",
      },
      {
        location: "SK",
        tax: 11,
        type: "GST + PST",
      },
      {
        location: "QC",
        tax: 14.975,
        type: "GST + QST",
      },
      {
        location: "PE",
        tax: 15,
        type: "HST",
      },
      {
        location: "ON",
        tax: 13,
        type: "HST",
      },
      {
        location: "NU",
        tax: 5,
        type: "GST",
      },
      {
        location: "NS",
        tax: 15,
        type: "HST",
      },
      {
        location: "NT",
        tax: 5,
        type: "GST",
      },
      {
        location: "NL",
        tax: 15,
        type: "HST",
      },
      {
        location: "NB",
        tax: 15,
        type: "HST",
      },
      {
        location: "MB",
        tax: 12,
        type: "GST + PST",
      },
      {
        location: "BC",
        tax: 12,
        type: "GST + PST",
      },
      {
        location: "AB",
        tax: 5,
        type: "GST",
      },
    ];

    arr.map((i) => {
      if (location.data === i.location) {
        setTaxPayment(i);
        setTaxError(false);
      } else {
        setTaxError(true);
      }
    });
  }, [location]);

  return (
    <Layout>
      <div className={classes.root}>
        <Stepper value={stepperValue} message={stepperMessage} />
        <Snackbar open={ipSnackbar} onClose={() => setIpSnackbar(false)}>
          <MuiAlert
            onClose={() => setIpSnackbar(false)}
            severity="error"
            variant="filled"
            style={{ fontFamily: "Gilroy, sans-serif" }}
          >
            Was not able to detect your location. Please Disable any location
            blockers and try again.
          </MuiAlert>
        </Snackbar>
        <Formik
          enableReinitialize
          initialValues={inputForm}
          onSubmit={(values) => {
            submit(values);
          }}
          validationSchema={formValidation}
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
            isSubmitting,
            setSubmitting,
          }) => {
            useEffect(() => {
              if (isSubmitting) {
                setAttemptedSubmit(true);
              }
            }, [isSubmitting]);
            return (
              <Form>
                <div className={classes.inner}>
                  <div className={classes.accordionAllContainer}>
                    {/*ACCORDION 1*/}
                    <div className={classes.accordion}>
                      <Accordion
                        expanded={accordionExpanded === 1}
                        onChange={handleAccordionExpandChange(1)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>
                            Basic Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <BasicDetails
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            query={query}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>
                      {/*ACCORDION 2*/}

                      <Accordion
                        expanded={accordionExpanded === 2}
                        onChange={handleAccordionExpandChange(2)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography className={classes.heading}>
                            More Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <MoreDetails
                            values={values}
                            errors={errors}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                            touched={touched}
                          />
                        </AccordionDetails>
                      </Accordion>
                      {/*ACCORDION 3*/}

                      <Accordion
                        expanded={accordionExpanded === 3}
                        onChange={handleAccordionExpandChange(3)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel3bh-content"
                          id="panel3bh-header"
                        >
                          <Typography className={classes.heading}>
                            Property Description
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <OptionalDetails
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>

                      {/*ACCORDION 4*/}
                      <Accordion
                        expanded={accordionExpanded === 4}
                        onChange={handleAccordionExpandChange(4)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel4bh-content"
                          id="panel4bh-header"
                        >
                          <Typography className={classes.heading}>
                            Asking Price
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <AskingPrice
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>

                      {/*ACCORDION 5*/}
                      <Accordion
                        expanded={accordionExpanded === 5}
                        onChange={handleAccordionExpandChange(5)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel5bh-content"
                          id="panel5bh-header"
                        >
                          <Typography className={classes.heading}>
                            Photos And Videos
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <PhotosAndVideos
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>

                      {/*ACCORDION 6*/}
                      <Accordion
                        expanded={accordionExpanded === 6}
                        onChange={handleAccordionExpandChange(6)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel6bh-content"
                          id="panel6bh-header"
                        >
                          <Typography className={classes.heading}>
                            Advertise Your Property
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Marketing
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>

                      {/*ACCORDION 7*/}

                      {/*
<Accordion
                        expanded={accordionExpanded === 7}
                        onChange={handleAccordionExpandChange(7)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel7bh-content"
                          id="panel7bh-header"
                        >
                          <Typography className={classes.heading}>
                            Legal Services
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Legal
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>
                  */}

                      {/*ACCORDION 8*/}
                      <Accordion
                        expanded={accordionExpanded === 8}
                        onChange={handleAccordionExpandChange(8)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel8bh-content"
                          id="panel8bh-header"
                        >
                          <Typography className={classes.heading}>
                            myHomely Care Services
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ExtraCare
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            values={values}
                            handleAccordionNext={(i) => {
                              setAccordionExpanded(i);
                              scrollToTop();
                            }}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className={classes.buttonContainer}>
                      <div className={classes.owedAmount}>
                        In case of any error or if you require listing support,
                        reach out to our team on customer.success@myhomely.io or
                        call +1 888-900-7080
                      </div>
                      <div className={classes.submitContainer}>
                        <Button type="submit" className={classes.greenButton}>
                          Submit
                        </Button>
                        {Object.keys(errors).length > 0 && attemptedSubmit && (
                          <div className={classes.errorNotice}>
                            Please Fix All Errors on the Form Before Submitting!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <ConfirmSellerListing
                  open={confirm}
                  onClose={() => {
                    setConfirm(false);
                    setSubmitting(false);
                    setFormSubmitValues(null);
                  }}
                  callback={() => {
                    if (getPrice(formSubmitValues)?.sum === 0) {
                      handleSubmitNoPayment();
                    } else {
                      setStripeModalOpen(true);
                    }
                    setConfirm(false);
                  }}
                  disabled={taxError}
                  propertyData={formSubmitValues}
                />
                <Dialog
                  onClose={() => {
                    setStripeModalOpen(false);
                    setSubmitting(false);
                    setFormSubmitValues(null);
                  }}
                  open={stripeModalOpen}
                  classes={{ paper: classes.dialogPaper }}
                >
                  <div className={classes.stripeHeader}>Ready to Pay</div>
                  <form onSubmit={handleSubmit}>
                    <div className={classes.stripeTotalAmount}>
                      Total: $
                      {(
                        getPrice(formSubmitValues)?.sum +
                        getPrice(formSubmitValues)?.sum *
                          (taxPayment?.tax / 100)
                      ).toLocaleString("en")}
                    </div>
                    <div className={classes.stripeSubAmount}>
                      ${getPrice(formSubmitValues)?.sum.toLocaleString("en")} +{" "}
                      {taxPayment?.type}
                    </div>
                    <div className={classes.stripeOwedAmount}>
                      You Selected These Services:{" "}
                      {getPrice(formSubmitValues)?.arr.map((i, index) => {
                        if (
                          index ===
                          getPrice(formSubmitValues)?.arr.length - 1
                        ) {
                          return `and ${i}`;
                        } else {
                          return `${i}, `;
                        }
                      })}
                    </div>
                    <StripeCard />
                    {stripeError && (
                      <div className={classes.stripeError}>{stripeError}</div>
                    )}
                    <Button
                      disabled={!stripe || loading || taxPayment === 0}
                      className={classes.confirmStripeButton}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </Dialog>
              </Form>
            );
          }}
        </Formik>
      </div>
      {/*
      <form onSubmit={handleSubmit}>
        <StripeCard />
        <button disabled={!stripe}>Confirm order</button>
      </form>
      */}
    </Layout>
  );
}
