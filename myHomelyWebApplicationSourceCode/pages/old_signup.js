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
import { TextField } from "formik-material-ui";
import { useRouter } from "next/router";

const cookies = new Cookies();

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: "10rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Gilroy, sans-serif",
      "& .Mui-error": {
        fontFamily: "Gilroy, sans-serif",
      },
      "& .MuiFormHelperText-root": {
        fontFamily: "Gilroy, sans-serif",
      },
    },
    inner: {
      background: "white",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
      padding: "3rem",
      borderRadius: "0.75rem",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      color: "#08184A",
      fontSize: "2.2rem",
      fontWeight: "bold",
    },
    sub: {
      color: "#08184A",
      fontSize: "0.95rem",
      marginBottom: "1.1rem",
      marginLeft: "0.1rem",
    },
    link: {
      fontWeight: "bold",
      color: "#249FFB",
    },
    facebookButton: {
      fontFamily: "Gilroy, sans-serif",
      marginBottom: "0.8rem",
      width: "16.4rem",
      background: "linear-gradient(to left, #337CA5, #3B5998)",
      padding: "1rem",
      color: "white",
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
      },
    },
    googleButton: {
      fontFamily: "Gilroy, sans-serif",
      marginBottom: "1.4rem",
      width: "16.4rem",
      background: "linear-gradient(to left, #4285F4, #175AC8)",
      padding: "1rem",
      color: "white",
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
      },
    },
    googleLogo: {
      width: "1rem",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "rgba(8, 24, 74, 0.69)",
    },
    textFieldContainer: {
      marginTop: "0.6rem",
      marginBottom: "0.6rem",
    },
    forgotPassContainer: {
      marginTop: "1.1rem",
      marginLeft: "0.1rem",
    },
    terms: {
      maxWidth: "16rem",
      color: "#08184A",
      marginLeft: "0.2rem",
    },
    passwordTextField: {
      fontFamily: "Gilroy, sans-serif",
      width: "16.4rem",
      "& .MuiInputBase-input": {
        fontFamily: "Gilroy, sans-serif",
        fontWeight: "bold",
      },
    },
    button: {
      maxWidth: "30px",
      maxHeight: "30px",
      minWidth: "30px",
      minHeight: "30px",
    },
    logInButton: {
      marginTop: "1rem",
      fontFamily: "Gilroy, sans-serif",
      marginBottom: "1.4rem",
      width: "16.4rem",
      background: "linear-gradient(270deg, #249FFB 4.5%, #15C7DB 94.6%)",
      padding: "1rem",
      color: "white",
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
      },
    },
    textField: {
      fontFamily: "Gilroy, sans-serif",
      width: "16.4rem",
    },
    error: {
      color: "#f44336",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      marginLeft: "0.25rem",
    },
  })
);

export default function login() {
  const classes = useStyles();

  // Google Login Request
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((result) => {
      console.log("Success", result.data.user);
      cookies.set("auth-token", result.data.token);
    });
  };

  // Error Function on Google Login Request
  const responseErrorGoogle = (response) => {
    console.log("Failure", response);
  };

  // Facebook Login Request
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "",
      data: { accessToken: response.accessToken, userID: response.userID },
    }).then((result) => {
      console.log("Facebook Login Access", result);
      cookies.set("auth-token", result.data.token);
    });
  };

  const [visibility, setVisibility] = useState(true);

  const inputForm = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const router = useRouter();

  const onSubmit = (values, functions) => {
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/register`,
      data: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        router.push("/user/confirmDetails");
      })
      .catch((err) => {
        functions.setErrors({
          [err.response.data.errType]: err.response.data.errorMsg,
        });
        console.log(err.response.data);
      });
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Formik
          enableReinitialize
          initialValues={inputForm}
          onSubmit={(values, functions) => {
            onSubmit(values, functions);
          }}
        >
          {({ values, errors, setErrors }) => {
            const confirmValidation = (val) => {
              let error;
              if (val !== values.password) {
                error = "Not Equal To Password";
              }
              return error;
            };
            return (
              <Form>
                <div className={classes.inner}>
                  <div className={classes.title}>Sign Up</div>
                  <div className={classes.sub}>
                    Have an account?{" "}
                    <span className={classes.link}>Sign In</span>
                  </div>
                  <div>
                    <FacebookLogin
                      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                      autoLoad={false}
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <Button
                          className={classes.facebookButton}
                          onClick={renderProps.onClick}
                          startIcon={<FacebookIcon />}
                        >
                          Sign Up With Facebook
                        </Button>
                      )}
                    />
                  </div>
                  <div>
                    <GoogleLogin
                      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                      buttonText="Sign Up With Google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseErrorGoogle}
                      render={(renderProps) => (
                        <Button
                          className={classes.googleButton}
                          onClick={renderProps.onClick}
                          startIcon={
                            <img
                              src="/googleLogo.svg"
                              alt="google logo"
                              className={classes.googleLogo}
                            />
                          }
                        >
                          Sign Up With Google
                        </Button>
                      )}
                      cookiePolicy="single_host_origin"
                    />
                  </div>
                  <div className={classes.textFieldContainer}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name={"name"}
                      label={"Full Name"}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      disabled={false}
                    />
                  </div>
                  <div className={classes.textFieldContainer}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name={"phone"}
                      label={"Phone Number"}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      disabled={false}
                    />
                  </div>
                  <div className={classes.textFieldContainer}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      name={"email"}
                      label={"Email Address"}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      disabled={false}
                    />
                  </div>
                  <div className={classes.textFieldContainer}>
                    <Field
                      className={classes.passwordTextField}
                      component={TextField}
                      name={"password"}
                      label={"Password"}
                      inputProps={{
                        type: visibility ? "password" : "text",
                      }}
                      InputProps={{
                        className: classes.inputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              fullWidth
                              className={classes.button}
                              onClick={() => {
                                setVisibility(!visibility);
                              }}
                            >
                              {visibility ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      disabled={false}
                    />
                  </div>
                  <div className={classes.textFieldContainer}>
                    <Field
                      className={classes.passwordTextField}
                      component={TextField}
                      name={"confirmPassword"}
                      label={"Confirm Password"}
                      inputProps={{
                        type: visibility ? "password" : "text",
                      }}
                      InputProps={{
                        className: classes.inputProps,
                      }}
                      InputLabelProps={{
                        className: classes.inputProps,
                      }}
                      variant="outlined"
                      disabled={false}
                      validate={confirmValidation}
                    />
                  </div>
                  {errors.all && (
                    <div className={classes.error}>
                      Email or Password is incorrect
                    </div>
                  )}
                  <div className={classes.terms}>
                    By signing in you agree to myHomely
                    <span className={classes.link}>
                      {" "}
                      Terms of Service
                    </span> and{" "}
                    <span className={classes.link}> Privacy Policy</span>
                  </div>{" "}
                  <div>
                    <Button type="submit" className={classes.logInButton}>
                      Sign Up
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
}
