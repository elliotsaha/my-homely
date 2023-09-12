import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import { Button, Dialog } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    inner: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    requestData: {
      borderRadius: "1.1rem",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
      padding: "3rem",
      paddingRight: "10rem",
      paddingLeft: "10rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    },
    requestData__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      color: "#08184A",
    },
    requestData__sub: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "grey",
      fontWeight: "bold",
      maxWidth: "20rem",
    },
    requestData__buttonContainer: {
      marginTop: "0.8rem",
    },
    requestData__button: {
      background: "#08184A",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      padding: "0.75rem",
      "&:hover": {
        background: "#08184A",
      },
    },
    deleteAccount: {
      borderRadius: "1.1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      padding: "3rem",
      paddingRight: "10rem",
      paddingLeft: "10rem",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
    },
    deleteAccount__header: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      color: "#f85149",
    },
    deleteAccount__sub: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "grey",
      fontWeight: "bold",
    },
    deleteAccount__buttonContainer: {
      marginTop: "0.8rem",
    },
    deleteAccount__button: {
      background: "#f85149",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      padding: "0.75rem",
      "&:hover": {
        background: "#f85149",
      },
    },
    deleteAccount__warningIcon: {
      color: "#F0CB06",
    },
    paper: {
      padding: "2rem",
      borderRadius: "0.5rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textAlign: "center",
    },
    deleteHeader: {
      fontSize: "2.5rem",
    },
    deleteSub: {
      color: "grey",
      fontSize: "0.85rem",
      maxWidth: "20rem",
    },
    deleteButton: {
      background: "#f85149",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      paddingTop: "1.1rem",
      paddingBottom: "1.1rem",
      paddingRight: "0.95rem",
      paddingLeft: "0.95rem",
      "&:hover": {
        background: "#f85149",
      },
    },
    cancelDeleteButton: {
      background: "black",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      paddingTop: "1.1rem",
      paddingBottom: "1.1rem",
      paddingRight: "0.95rem",
      paddingLeft: "0.95rem",
      "&:hover": {
        background: "black",
      },
    },
    deleteButtonContainer: {
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1rem",
    },
    muiAlert: {
      fontFamily: "Gilroy",
      fontWeight: "bold",
    },
  })
);

export default function Account() {
  const classes = useStyles();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(null);
  const router = useRouter();

  const deleteAccount = () => {
    setOpenDeleteConfirm(true);
  };

  const onConfirmDeletion = () => {
    axios
      .get(`${process.env.SERVER_API}/api/user/deleteAccount`, {
        withCredentials: true,
      })
      .then((res) => {
        router.push("/?success=true");
      })
      .catch((err) => {
        setErrorSnackbar(err.response.data);
      });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(null)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(null)}
          severity="error"
          variant="filled"
          className={classes.muiAlert}
        >
          {errorSnackbar}
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        classes={{ paper: classes.paper }}
      >
        <div>
          <div className={classes.deleteHeader}>Are you sure?</div>
          <div className={classes.deleteSub}>
            This will erase all of your account data including any listings you
            have
          </div>
          <div className={classes.deleteButtonContainer}>
            <Button
              className={classes.deleteButton}
              onClick={onConfirmDeletion}
            >
              Delete
            </Button>
            <Button
              className={classes.cancelDeleteButton}
              onClick={() => setOpenDeleteConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
      <div className={classes.inner}>
        <div className={classes.requestData}>
          <div className={classes.requestData__header}>
            Request Account Data
          </div>
          <div className={classes.requestData__sub}>
            If requested, we will email you in the next 3-5 business days with
            all your account information
          </div>
          <div className={classes.requestData__buttonContainer}>
            <Button
              startIcon={<EmailIcon />}
              className={classes.requestData__button}
            >
              Request Account Data
            </Button>
          </div>
        </div>

        <div className={classes.deleteAccount}>
          <div className={classes.deleteAccount__header}>Delete Account</div>
          <div className={classes.deleteAccount__sub}>
            <WarningIcon className={classes.deleteAccount__warningIcon} />{" "}
            Warning: This Action is Not Undoable
          </div>
          <div className={classes.deleteAccount__buttonContainer}>
            <Button
              startIcon={<DeleteIcon />}
              className={classes.deleteAccount__button}
              onClick={deleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
