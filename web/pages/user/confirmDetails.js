import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import Link from "next/link";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      minHeight: "40rem",
    },
    inner: {
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      maxWidth: "42.5rem",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
      position: "relative",
      paddingRight: "6rem",
      paddingLeft: "6rem",
      paddingBottom: "3rem",
      paddingTop: "2rem",
      borderRadius: "0.75rem",

      "& > div:nth-child(1)": {
        fontSize: "2rem",
        lineHeight: "2.35rem",
        marginBottom: "0.75rem",
      },
      "& > div:nth-child(2)": {},
    },
    link: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      color: "#249FFB",
      cursor: "pointer",
      fontWeight: "bold",
    },
    linkEmail: {
      color: "#249FFB",
      fontWeight: "bold",
    },
  })
);
export default function confirmDetails() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.inner}>
          <div>
            Please Verify Your Email Address and Phone Number Before{" "}
            <span className={classes.link}>
              <Link href="/login" className={classes.link}>
                Logging In
              </Link>
            </span>
          </div>
          <div>
            Didn't Get The Email?{" "}
            <span className={classes.linkEmail}>
              <Link href="/user/resendemail">Click Here</Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
