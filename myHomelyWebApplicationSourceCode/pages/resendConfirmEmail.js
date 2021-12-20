import React from "react";
import Router from "next/router";
import axios from "axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { authState } from "../components/states";
import { useRecoilValue } from "recoil";
import Layout from "../components/layout";

const useStyles = makeStyles((theme) =>
  createStyles({
    hidden: {
      display: "none",
    },
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
      maxWidth: "37.5rem",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
      position: "relative",
      paddingRight: "6rem",
      paddingLeft: "6rem",
      paddingBottom: "2rem",
      paddingTop: "2rem",
      borderRadius: "0.75rem",
      "& > div:nth-child(1)": {
        fontSize: "2rem",
        lineHeight: "2.35rem",
      },
      "& > div:nth-child(2)": {},
    },
    link: {
      marginTop: "0.25rem",
      fontSize: "1.75rem",
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

export default function emailValidation() {
  const classes = useStyles();

  const router = useRouter();

  const [success, setSuccess] = React.useState(null);

  const authLocalState = useRecoilValue(authState);
  console.log(authLocalState);

  React.useEffect(() => {
    if (authLocalState?.user) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/resendConfirmEmail`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err.response);
          setSuccess(false);
        });
    }
  }, [authLocalState]);

  React.useEffect(() => {
    if (success) {
      router.push("/?success=true");
    }
  }, [success]);

  React.useEffect(() => {
    if (success === false) {
      router.push("/?success=false");
    }
  }, [success]);

  return (
    <div className={classes.hidden}>
      <Layout></Layout>
    </div>
  );
}
