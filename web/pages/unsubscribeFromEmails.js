import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { authState } from "../components/states";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import axios from "axios";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "none",
    },
  })
);

export default function UnsubscribeFromEmails() {
  const classes = useStyles();
  const authLocalState = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (authLocalState) {
      if (!authLocalState.auth) {
        router.push("/login?needAuth=true");
      } else {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/api/business/unsubscribeFromEmails`,
            { withCredentials: true }
          )
          .then((res) => {
            router.push("/?success=true");
          })
          .catch((err) => {
            router.pust("/?success=false");
          });
      }
    }
  }, [authLocalState]);

  return (
    <div className={classes.root}>
      <Layout></Layout>
    </div>
  );
}
