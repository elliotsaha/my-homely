import React, { useState, useRef, useEffect, useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { authState } from "../components/states";
import { useRecoilValue } from "recoil";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  href: {
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
    display: "inline",
  },
  alert: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
  },
}));

export default function SignInFirst({ open, handleClose, NeedsVerification }) {
  const classes = useStyles();

  const authLocalState = useRecoilValue(authState);

  // TODO: Link back to actual hrefs
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      {NeedsVerification ? (
        <MuiAlert severity="warning" variant="filled">
          Your account is not verified.{" "}
          <Link href="/resendConfirmEmail" className={classes.href}>
            <div className={classes.href}>Resend Verification Email</div>
          </Link>{" "}
          |{" "}
          <Link href="/resendConfirmationSMS" className={classes.href}>
            <div className={classes.href}>Resend SMS</div>
          </Link>
        </MuiAlert>
      ) : (
        <MuiAlert severity="error" variant="filled" className={classes.alert}>
          Please Sign In Before Completing This Action
        </MuiAlert>
      )}
    </Snackbar>
  );
}
