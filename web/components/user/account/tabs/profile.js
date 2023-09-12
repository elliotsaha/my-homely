import React, { useState } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../components/states";
import WarningIcon from "@material-ui/icons/Warning";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  InputAdornment,
  ButtonGroup,
  Dialog,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { ArrowForward, Add, Remove } from "@material-ui/icons";
import dynamic from "next/dynamic";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
import * as Yup from "yup";
import EmailIcon from "@material-ui/icons/Email";

const MuiPhoneNumber = dynamic(import("material-ui-phone-number"), {
  ssr: false,
});
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "rgba(8, 24, 74, 0.69)",
      [theme.breakpoints.down("425")]: {
        fontSize: "0.8rem",
      },
    },
    formRoot: {
      display: "flex",
      gap: "5rem",
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    textField: {
      width: "22.5rem",
    },
    rightPanel: {},
    submitButton: {
      width: "9.5rem",
      height: "3rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      background: "#249FFB",
      color: "white",
      "&:hover": {
        background: "#249FFB",
      },
    },
    imageContainer: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
    },
    uploadButton: {
      position: "absolute",
      bottom: "0.5rem",
      left: "0.5rem",
      background: "white",
      "&:hover": {
        background: "#FAFAFA",
      },
      width: "2rem",
      height: "2rem",
    },
    editIcon: {
      fontSize: "1.1rem",
    },
    image: {
      width: "10rem",
      height: "10rem",
      objectFit: "cover",
      borderRadius: "0.85rem",
    },
    sub: {
      marginTop: "0.5rem",
      color: "grey",
      width: "22.5rem",
    },
    profileHeader: {
      fontWeight: "bold",
      fontSize: "1rem",
      marginBottom: "0.75rem",
      marginLeft: "0.3rem",
      color: "rgba(8, 24, 74, 0.69)",
    },
    uploadIDButton: {
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #249FFB",
      fontWeight: "bold",
      paddingTop: "0.8rem",
      paddingBottom: "0.8rem",
      textTransform: "none",
    },
    id: {
      width: "25rem",
      height: "15rem",
      objectFit: "cover",
      borderRadius: "0.25rem",
    },
    muiAlert: {
      fontFamily: "Gilroy",
      fontWeight: "bold",
    },
    verified: {
      color: "grey",
      fontWeight: "bold",
      marginTop: "-1.5rem",
    },
    idNote: {
      fontWeight: "bold",
      marginTop: "0.5rem",
      maxWidth: "25rem",
      marginBottom: "0.25rem",
    },
    shortSpacer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    verifiedOrNot: {
      fontWeight: "bold",
      color: "grey",
    },

    requestData: {
      paddingTop: "3rem",
      borderRadius: "1.1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      paddingBottom: "5rem",
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
      paddingTop: "3rem",
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

export default function Profile() {
  const initialValues = {
    changeName: "",
    changeEmail: "",
    changePhone: "",
    changeImage: "",
    changeID: "",
  };

  const iconArr = [
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/user/man.svg",
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/user/woman.svg",
  ];

  const [openSnackbar, setOpenSnackbar] = useState(null);
  const [errorSnackbar, setErrorSnackbar] = useState(null);

  const [openSelectIcon, setOpenSelectIcon] = useState(false);

  const router = useRouter();

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const deleteAccount = () => {
    setOpenDeleteConfirm(true);
  };

  const requestAccountData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/requestAccountData`,
        { withCredentials: true }
      )
      .then((res) => {
        router.push("/?success=true");
      })
      .catch((err) => {
        router.push("/?success=false");
      });
  };

  const onConfirmDeletion = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/user/deleteAccount`, {
        withCredentials: true,
      })
      .then((res) => {
        router.push("/?success=true");
      })
      .catch((err) => {
        console.log(err);
        //        setErrorSnackbar(err.response.data);
      });
  };

  const handleFormSubmit = (values, functions) => {
    console.log(values);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/changeProfile`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        router.push("/?success=true");
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data) {
          setOpenSnackbar(err.response.data);
          functions.setFieldValue("changeImage", authLocalState.user.icon);
          functions.setFieldValue("changeEmail", authLocalState.user.email);
          functions.setFieldValue("changePhone", authLocalState.user.phone);
          functions.setFieldValue("changeName", authLocalState.user.name);
          functions.setFieldValue("changeID", authLocalState.user.ID);

          functions.setSubmitting(false);
        }
      });
  };

  const validator = Yup.object().shape({
    changeName: Yup.string(),
    changeEmail: Yup.string().email("Invalid Email"),
    changePhone: Yup.string(),
    changeImage: Yup.string(),
    changeID: Yup.string(),
  });

  const authLocalState = useRecoilValue(authState);
  const classes = useStyles();

  if (authLocalState?.auth === true) {
    return (
      <div className={classes.root}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            setFieldValue,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            enableReinitialize,
          }) => {
            React.useEffect(() => {
              setFieldValue("changeImage", authLocalState.user.icon);
              setFieldValue("changeEmail", authLocalState.user.email);
              setFieldValue("changePhone", authLocalState.user.phone);
              setFieldValue("changeName", authLocalState.user.name);
              setFieldValue("changeID", authLocalState.user.ID);
            }, []);

            const uploadID = (evt) => {
              var reader = new FileReader();
              var file = evt.target.files[0];
              reader.onload = function (upload) {
                setFieldValue("changeID", upload.target.result);
              };
              reader.readAsDataURL(file);
            };

            return (
              <div>
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
                            setFieldValue("changeImage", i);
                            setOpenSelectIcon(false);
                          }}
                        >
                          <img src={i} alt="Icon" className={classes.icon} />
                        </Button>
                      ))}
                    </div>
                  </div>
                </Dialog>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={2000}
                  onClose={() => setOpenSnackbar(null)}
                >
                  <MuiAlert
                    onClose={() => setOpenSnackbar(null)}
                    severity="error"
                    variant="filled"
                    className={classes.muiAlert}
                  >
                    {openSnackbar}
                  </MuiAlert>
                </Snackbar>
                <form onSubmit={handleSubmit} className={classes.formRoot}>
                  <div className={classes.leftPanel}>
                    <div>
                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        name={"changeName"}
                        label={"Change Name"}
                        placeholder={"Full Name"}
                        InputProps={{
                          className: classes.inputProps,
                        }}
                        InputLabelProps={{
                          className: classes.inputProps,
                        }}
                        variant="outlined"
                      />
                      <div className={classes.sub}>
                        This is Your Full Legal Name, Please Get in Touch if you
                        Have Legally Changed Your Name.
                      </div>
                    </div>

                    <div className={classes.shortSpacer}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        name={"changeEmail"}
                        label={"Change Email Address"}
                        placeholder={"Full Email"}
                        InputProps={{
                          className: classes.inputProps,
                        }}
                        InputLabelProps={{
                          className: classes.inputProps,
                        }}
                        variant="outlined"
                      />
                      <div className={classes.verifiedOrNot}>
                        Your Email is{" "}
                        {authLocalState?.user?.emailVerified
                          ? "Verified"
                          : "Not Verified"}
                      </div>
                    </div>

                    <div className={classes.shortSpacer}>
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
                          setFieldValue("changePhone", val);
                        }}
                        value={values.changePhone}
                      />
                      <div className={classes.verifiedOrNot}>
                        Your Phone Number is{" "}
                        {authLocalState?.user?.phoneVerified
                          ? "Verified"
                          : "Not Verified"}
                      </div>
                    </div>
                    <div>
                      {values.changeID && values.changeID !== "" && (
                        <img
                          src={values.changeID}
                          alt="ID"
                          className={classes.id}
                        />
                      )}
                    </div>
                    <div>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        name="property"
                        onChange={uploadID}
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="raised"
                          component="span"
                          className={classes.uploadIDButton}
                          startIcon={<Add />}
                        >
                          Upload ID
                        </Button>
                        <div className={classes.idNote}>
                          Please upload Govt. Issued Photo ID for verification,
                          e.g., Driving License, Passport, PR card, etc
                        </div>
                      </label>
                    </div>
                    <div className={classes.verified}>
                      {authLocalState?.user?.IDVerified}
                    </div>
                    <Button type="submit" className={classes.submitButton}>
                      Update Profile
                    </Button>
                  </div>
                  <div className={classes.rightPanel}>
                    <div className={classes.imageContainer}>
                      <div className={classes.profileHeader}>
                        Profile Picture
                      </div>
                      <img
                        src={values.changeImage}
                        alt="icon"
                        className={classes.image}
                      />
                      <IconButton
                        className={classes.uploadButton}
                        onClick={() => setOpenSelectIcon(true)}
                      >
                        <EditIcon className={classes.editIcon} />
                      </IconButton>
                    </div>
                  </div>
                </form>
                <div className={classes.deleteAccount}>
                  <div className={classes.deleteAccount__header}>
                    Delete Account
                  </div>
                  <div className={classes.deleteAccount__sub}>
                    <WarningIcon
                      className={classes.deleteAccount__warningIcon}
                    />{" "}
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

                <div className={classes.requestData}>
                  <div className={classes.requestData__header}>
                    Request Account Data
                  </div>
                  <div className={classes.requestData__sub}>
                    If requested, we will email you in the next 3-5 business
                    days with all your account information
                  </div>
                  <div className={classes.requestData__buttonContainer}>
                    <Button
                      startIcon={<EmailIcon />}
                      className={classes.requestData__button}
                      onClick={requestAccountData}
                    >
                      Request Account Data
                    </Button>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
        <div>
          <Dialog
            open={openDeleteConfirm}
            onClose={() => setOpenDeleteConfirm(false)}
            classes={{ paper: classes.paper }}
          >
            <div>
              <div className={classes.deleteHeader}>Are you sure?</div>
              <div className={classes.deleteSub}>
                This will erase all of your account data including any listings
                you have
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

          <Snackbar
            open={errorSnackbar}
            autoHideDuration={1000}
            onClose={() => setErrorSnackbar(null)}
          >
            <MuiAlert
              onClose={() => setErrorSnackbar(null)}
              severity="error"
              variant="filled"
              className={classes.muiAlert}
            >
              {errorSnackbar}
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    );
  }
  return null;
}
