import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Formik, Form, FieldArray, Field } from "formik";
import { useRouter } from "next/router";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { Button, Dialog } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      height: "50rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
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
      marginBottom: "1rem",
    },
    signinButton: {
      background: "#3C5898",
      color: "white",
      padding: "1rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      "&:hover": {
        background: "#3C5898",
      },
    },
  })
);
export default function PhotographerLogin() {
  const classes = useStyles();
  const router = useRouter();

  const onSubmit = (values, functions) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/photographer/login`,
        values,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        router.push("/?switchToPhotography=true");
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data);
      });
  };

  const schema = Yup.object().shape({
    email: Yup.string("Required").required("Required").email("Invalid Email"),
    password: Yup.string("Required").required("Required"),
  });

  return (
    <Layout>
      <div className={classes.root}>
        <div>
          <div className={classes.header}>Login</div>
          <Formik
            enableReinitialize
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={(values, functions) => {
              onSubmit(values, functions);
            }}
          >
            {({ values, errors, setErrors }) => {
              return (
                <Form>
                  <div>
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
                  <div>
                    <Field
                      component={TextField}
                      label="Password"
                      name="password"
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
                  <div>
                    <Button type="submit" className={classes.signinButton}>
                      Sign In
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
