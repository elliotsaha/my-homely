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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
    loginImage: {
      width: "46rem",

      [theme.breakpoints.down("1600")]: {
        width: "40rem",
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
    loginPanelContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",

      [theme.breakpoints.down("1600")]: {
        width: "120%",
      },
    },
    loginImageContainer: {
      justifyContent: "center",
      width: "150%",

      [theme.breakpoints.down("1600")]: {
        width: "100%",
      },
      height: "100%",
      display: "flex",
      alignItems: "center",
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
      width: "21rem",
    },
    googleIcon: {
      width: "1.25rem",
      height: "1.25rem",
    },
    loginWithGoogle: {
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
    loginWithFacebook: {
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
      flexDirection: "column",
      gap: "1rem",
    },
    loginButton: {
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
    forgotYourPass: {
      marginTop: "1.2rem",
      fontWeight: "bold",
      color: "grey",
      "& > span": {
        color: "#249FFB",
      },
    },
    snackBar: {
      fontFamily: "Gilroy, sans-serif",
    },
  })
);

export default function Login() {
  const classes = useStyles();
  const [visibility, setVisibility] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackBar, setSnackBar] = useState(false);
  const router = useRouter();
  const { query } = router;

  React.useEffect(() => {
    if (query.needAuth === "true") {
      setSnackBar(true);
    }
  }, [query]);

  const onSubmit = (values, functions) => {
    functions.setSubmitting(true);
    setLoginLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/login`,
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setLoginLoading(false);
        functions.setSubmitting(false);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Email or Password");
        setLoginLoading(false);
        functions.setSubmitting(false);
      });
  };

  const inputForm = {
    email: "",
    password: "",
  };

  const responseSuccessGoogle = (response) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/googleLogin`,
        {
          tokenId: response.tokenId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoginLoading(false);
        router.push("/");
      })
      .catch((err) => {
        setLoginLoading(false);
        if (err?.response?.data) {
          setError(err.response.data);
        }
      });
  };

  const responseFailureGoogle = (error) => {
    setLoginLoading(false);
    setError("An Unexpected Error Has Occured");
  };

  const responseFacebook = (response) => {
    setLoginLoading(true);
    if (!response.userID || !response.accessToken) {
      setLoginLoading(false);
      setError("An Unexpected Error Has Occured");
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/facebookLogin`,
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
          setLoginLoading(false);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoginLoading(false);
          setError("An Unexpected Error Has Occured");
        });
    }
  };

  return (
    <Layout>
      <Snackbar
        open={snackBar}
        autoHideDuration={6000}
        onClose={() => setSnackBar(false)}
      >
        <MuiAlert
          onClose={() => setSnackBar(false)}
          severity="error"
          variant="filled"
          className={classes.snackBar}
        >
          Please Login Before Using This Feature
        </MuiAlert>
      </Snackbar>

      <div className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.loginPanelContainer}>
            <div>
              <div className={classes.title}>Login</div>
              <div className={classes.sub}>
                Don't have an account?{" "}
                <span>
                  <Link href="/signup">Sign up</Link>
                </span>
              </div>
              <div>
                <Formik
                  enableReinitialize
                  initialValues={inputForm}
                  onSubmit={(values, functions) => {
                    onSubmit(values, functions);
                  }}
                >
                  {({ values, errors, setErrors }) => {
                    return (
                      <Form>
                        <div className={classes.socialLoginContainer}>
                          <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseFailureGoogle}
                            render={(renderProps) => (
                              <Button
                                className={classes.googleButton}
                                onClick={renderProps.onClick}
                                className={classes.loginWithGoogle}
                                startIcon={
                                  <img
                                    src="/googleIcon.png"
                                    alt="Google"
                                    className={classes.googleIcon}
                                  />
                                }
                              >
                                Login With Google
                              </Button>
                            )}
                          />

                          <FacebookLogin
                            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                            autoLoad={false}
                            callback={responseFacebook}
                            render={(renderProps) => (
                              <Button
                                className={classes.loginWithFacebook}
                                onClick={renderProps.onClick}
                                startIcon={
                                  <FacebookIcon
                                    className={classes.facebookIcon}
                                  />
                                }
                              >
                                Login With Facebook
                              </Button>
                            )}
                          />
                        </div>
                        <div className={classes.inputContainer}>
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
                            className={classes.loginButton}
                            disabled={loginLoading}
                            endIcon={
                              loginLoading ? (
                                <CircularProgress
                                  className={classes.loadingSpinner}
                                  size="1rem"
                                />
                              ) : (
                                <ArrowForwardIcon />
                              )
                            }
                          >
                            Login
                          </Button>
                        </div>
                        <div className={classes.forgotYourPass}>
                          Forgot Your Password?{" "}
                          <span>
                            <Link href="/resetPassword">Reset It Here</Link>
                          </span>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
          <div className={classes.loginImageContainer}>
            <img src="/login.svg" alt="Login" className={classes.loginImage} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
