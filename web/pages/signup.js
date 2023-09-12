import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Cookies from "universal-cookie";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Layout from "../components/layout";
import { Formik, Form, FieldArray, Field } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import dynamic from "next/dynamic";
import TOSModel from "../components/legals/TOSModel";
import Dialog from "@material-ui/core/Dialog";

const MuiPhoneNumber = dynamic(import("material-ui-phone-number"), {
  ssr: false,
});

const cookies = new Cookies();

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
    },
    inner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "62rem",
      gap: "9rem",
      marginBottom: "-6rem",
    },
    signupImage: {
      width: "46rem",

      [theme.breakpoints.down("1600")]: {
        width: "38rem",
        marginRight: "2rem",
      },
    },
    title: {
      fontWeight: "bold",
      fontSize: "2.5rem",
    },
    sub: {
      fontWeight: "bold",
      color: "grey",
      fontSize: "1.1rem",
      "& span": {
        color: "#249FFB",
      },
    },
    signupPanelContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      [theme.breakpoints.down("1600")]: {
        width: "200%",
      },
    },
    signupImageContainer: {
      justifyContent: "center",
      width: "110%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("1600")]: {
        width: "50%",
      },
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
    },
    inputContainer: {
      display: "flex",
      marginTop: "0.75rem",
      gap: "1.25rem",
      flexDirection: "column",
    },
    inputField: {
      width: "17rem",
    },
    googleIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
    signupWithGoogle: {
      width: "100%",
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      fontWeight: "bold",
      color: "grey",
      fontSize: "0.85rem",
      paddingRight: "1.2rem",
      paddingLeft: "1.2rem",
      borderRadius: "0.25rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      border: "solid 0.12rem #CDCDCD",
    },
    facebookIcon: {},
    signupWithFacebook: {
      width: "100%",
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "0.85rem",
      color: "white",
      background: "#3C5898",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      paddingRight: "1.2rem",
      paddingLeft: "1.2rem",
      borderRadius: "0.25rem",
      border: "solid 0.12rem #3C5898",
      "&:hover": {
        background: "#3C5898",
      },
    },
    socialLoginContainer: {
      marginTop: "1rem",
      marginBottom: "1.25rem",
      display: "flex",
      gap: "1rem",
    },
    signupButton: {
      marginTop: "1.5rem",
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      fontWeight: "bold",
      color: "grey",
      fontSize: "0.95rem",
      paddingRight: "1.2rem",
      paddingLeft: "1.2rem",
      borderRadius: "0.25rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      border: "solid 0.12rem #CDCDCD",
      color: "grey",
    },
    visibilityButton: {
      color: "grey",
      width: "0.2rem",
    },
    visibilityContainer: {
      marginLeft: "0.5rem",
    },
    loadingSpinner: {
      color: "grey",
      marginBottom: "0.2rem",
      marginLeft: "0.2rem",
    },
    errorContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "bold",
      color: "#ff0033",
    },
    errorIcon: {
      marginTop: "0.25rem",
    },
    inputGroup: {
      display: "flex",
      gap: "1rem",
    },
    dialog: {
      borderRadius: "0.75rem",
      padding: "3rem",
      fontFamily: "Gilroy, sans-serif",
    },
    selectIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    selectIconHeader: {
      fontWeight: "bold",
      fontSize: "1.75rem",
    },
    selectIconFlex: {
      display: "flex",
      gap: "1.25rem",
      marginTop: "0.5rem",
    },
    icon: {
      width: "10rem",
      height: "10rem",
    },
    addPersonality: {
      color: "grey",
      fontWeight: "600",
      marginBottom: "0.75rem",
    },
  })
);

export default function SignUp() {
  const classes = useStyles();
  const [visibility, setVisibility] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [openTOS, setOpenTOS] = useState(false);
  const [openSelectIcon, setOpenSelectIcon] = useState(false);

  const [facebookResponse, setFacebookResponse] = useState(null);
  const [googleResponse, setGoogleResponse] = useState(null);

  const iconArr = [
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/user/man.svg",
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/user/woman.svg",
  ];

  const registerCheck = (values, setSubmitting) => {
    setSubmitting(true);
    setSignupLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/registerCheck`,
        {
          name: values.name,
          phone: values.phoneNumber,
          email: values.email,
          password: values.password,
          confirmPassword: values.passwordConfirm,
          icon: "blank_register_check",
        },
        { withCredentials: true }
      )
      .then((res) => {
        setOpenTOS(true);
        setSignupLoading(false);
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data);
        setSignupLoading(false);
        setSubmitting(false);
      });
  };

  const onSubmit = ({ i, values, setSubmitting }) => {
    setSubmitting(true);
    setSignupLoading(true);

    if (facebookResponse) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/facebookSignup`,
          {
            userID: facebookResponse.userID,
            accessToken: facebookResponse.accessToken,
            icon: i,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setSignupLoading(false);
          return router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          setSignupLoading(false);
          setError(err.response.data);
        });
    }

    if (googleResponse) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/googleSignup`,
          {
            tokenId: googleResponse.tokenId,
            icon: i,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setSignupLoading(false);
          router.push("/");
        })
        .catch((err) => {
          setSignupLoading(false);
          setError(err.response.data);
        });
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/register`,
        {
          name: values.name,
          phone: values.phoneNumber,
          email: values.email,
          password: values.password,
          confirmPassword: values.passwordConfirm,
          icon: i,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSignupLoading(false);
        setSubmitting(false);
        router.push("/?success=true");
      })
      .catch((err) => {
        setError(err.response.data);
        setSignupLoading(false);
        setSubmitting(false);
      });
  };

  const inputForm = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  };

  const responseSuccessGoogle = ({ response, setSubmitting }) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/googleCheck`,
        {
          tokenId: response.tokenId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setSignupLoading(false);
        setGoogleResponse(response);
        setOpenTOS(true);
      })
      .catch((err) => {
        console.log(err.response);
        setSignupLoading(false);
        setError(err.response.data);
        setSubmitting(false);
      });
  };

  React.useEffect(() => {
    if (error === "User Already Exists, Redirecting To Sign In Page...") {
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
  }, [error]);

  const responseFailureGoogle = (error) => {
    setSignupLoading(false);
    setError("An Unexpected Error Has Occured");
  };

  const responseFacebook = (response, values, setSubmitting) => {
    setSubmitting(true);
    setSignupLoading(true);
    if (!response.userID || !response.accessToken) {
      setSignupLoading(false);
      setError("An Unexpected Error Has Occured");
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/facebookCheck`,
          {
            userID: response.userID,
            accessToken: response.accessToken,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setOpenTOS(true);
          setSignupLoading(false);
          setFacebookResponse(response);
        })
        .catch((err) => {
          console.log(err);
          setSignupLoading(false);
          setError(err.response.data);
          setSubmitting(false);
        });

      /*
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/facebookSignup`,
          {
            userID: response.userID,
            accessToken: response.accessToken,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setSignupLoading(false);
          router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          setSignupLoading(false);
          setError(err.response.data);
        });
        * */
    }
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.signupPanelContainer}>
            <div>
              <div className={classes.title}>Sign Up</div>
              <div className={classes.sub}>
                Already have an account?{" "}
                <span>
                  <Link href="/login">Sign in</Link>
                </span>
              </div>
              <div>
                <Formik
                  enableReinitialize
                  initialValues={inputForm}
                  onSubmit={(values, { setSubmitting }) => {
                    registerCheck(values, setSubmitting);
                  }}
                >
                  {({
                    values,
                    errors,
                    setErrors,
                    setFieldValue,
                    setSubmitting,
                  }) => {
                    return (
                      <Form>
                        <div className={classes.socialLoginContainer}>
                          <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                            onSuccess={(response) =>
                              responseSuccessGoogle({ response, setSubmitting })
                            }
                            onFailure={responseFailureGoogle}
                            render={(renderProps) => (
                              <Button
                                className={classes.googleButton}
                                onClick={renderProps.onClick}
                                className={classes.signupWithGoogle}
                                startIcon={
                                  <img
                                    src="/googleIcon.png"
                                    alt="Google"
                                    className={classes.googleIcon}
                                  />
                                }
                              >
                                Sign Up With Google
                              </Button>
                            )}
                          />

                          <FacebookLogin
                            status={false}
                            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                            autoLoad={false}
                            callback={(response) => {
                              responseFacebook(response, values, setSubmitting);
                            }}
                            render={(renderProps) => (
                              <Button
                                className={classes.signupWithFacebook}
                                onClick={renderProps.onClick}
                                startIcon={
                                  <FacebookIcon
                                    className={classes.facebookIcon}
                                  />
                                }
                              >
                                Sign Up With Facebook
                              </Button>
                            )}
                          />
                        </div>
                        <div className={classes.inputContainer}>
                          <div className={classes.inputGroup}>
                            <Field
                              component={TextField}
                              label="Full Name"
                              name="name"
                              variant="outlined"
                              InputProps={{
                                className: classes.inputProps,
                              }}
                              InputLabelProps={{
                                className: classes.inputProps,
                              }}
                              className={classes.inputField}
                            />
                            <Field
                              component={TextField}
                              label="Email Address"
                              name="email"
                              variant="outlined"
                              InputProps={{
                                className: classes.inputProps,
                              }}
                              InputLabelProps={{
                                className: classes.inputProps,
                              }}
                              className={classes.inputField}
                            />
                          </div>
                          <div className={classes.inputGroup}>
                            <Field
                              component={TextField}
                              label="Password"
                              name="password"
                              variant="outlined"
                              inputProps={{
                                type: visibility ? "text" : "password",
                              }}
                              InputProps={{
                                className: classes.inputProps,
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    className={classes.visibilityContainer}
                                  >
                                    <Button
                                      className={classes.visibilityButton}
                                      onClick={() => {
                                        setVisibility(!visibility);
                                      }}
                                    >
                                      {visibility ? (
                                        <VisibilityIcon />
                                      ) : (
                                        <VisibilityOffIcon />
                                      )}
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                className: classes.inputProps,
                              }}
                              className={classes.inputField}
                            />
                            <Field
                              component={TextField}
                              label="Confirm Password"
                              name="passwordConfirm"
                              variant="outlined"
                              inputProps={{
                                type: visibility ? "text" : "password",
                              }}
                              InputProps={{
                                className: classes.inputProps,
                              }}
                              InputLabelProps={{
                                className: classes.inputProps,
                              }}
                              className={classes.inputField}
                            />
                          </div>
                          <MuiPhoneNumber
                            defaultCountry={"ca"}
                            variant="outlined"
                            InputProps={{
                              className: classes.inputProps,
                            }}
                            InputLabelProps={{
                              className: classes.inputProps,
                            }}
                            onChange={(val) => {
                              setFieldValue("phoneNumber", val);
                            }}
                          />
                          {error && (
                            <div className={classes.errorContainer}>
                              <div>
                                <ErrorIcon className={classes.errorIcon} />
                              </div>
                              <div>{error}</div>
                            </div>
                          )}
                        </div>
                        <div>
                          <Button
                            type="submit"
                            className={classes.signupButton}
                            disabled={signupLoading}
                            endIcon={
                              signupLoading ? (
                                <CircularProgress
                                  className={classes.loadingSpinner}
                                  size="1rem"
                                />
                              ) : (
                                <ArrowForwardIcon />
                              )
                            }
                          >
                            Sign Up
                          </Button>
                          <Dialog
                            open={openSelectIcon}
                            onClose={() => setOpenSelectIcon(false)}
                            classes={{ paper: classes.dialog }}
                          >
                            <div className={classes.selectIconContainer}>
                              <div className={classes.selectIconHeader}>
                                Select An Icon
                              </div>
                              <div className={classes.addPersonality}>
                                Add Some Personality To Your Profile
                              </div>
                              <div className={classes.selectIconFlex}>
                                {iconArr.map((i) => (
                                  <Button
                                    onClick={() => {
                                      onSubmit({ i, values, setSubmitting });
                                    }}
                                  >
                                    <img
                                      src={i}
                                      alt="Icon"
                                      className={classes.icon}
                                    />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </Dialog>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <TOSModel
              open={openTOS}
              setOpen={setOpenTOS}
              onClose={() => setOpenTOS(false)}
              callback={() => {
                setOpenTOS(false);
                setOpenSelectIcon(true);
              }}
            />
          </div>
          <div className={classes.signupImageContainer}>
            <img
              src="/login.svg"
              alt="Sign Up"
              className={classes.signupImage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
