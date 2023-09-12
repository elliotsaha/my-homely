import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import Stepper from "../../components/sellproperty/stepper";
import Search from "../../components/sellproperty/standAloneSearch";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import { InputBase, TextField, Dialog } from "@material-ui/core";
import NeedLogin from "../../components/NeedLogin";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "7rem",
    fontFamily: "Gilroy, sans-serif",
    marginBottom: "7rem",
  },
  main: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
    position: "relative",
    paddingRight: "6rem",
    paddingLeft: "6rem",
    paddingBottom: "3rem",
    paddingTop: "2rem",
    borderRadius: "0.75rem",
    maxWidth: "60rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginRight: "2rem",
    marginLeft: "2rem",
    [theme.breakpoints.down("750")]: {
      paddingRight: "2rem",
      paddingLeft: "2rem",
      paddingBottom: "2rem",
      paddingTop: "2rem",
      marginRight: "3rem",
      marginLeft: "3rem",
    },
  },
  textFieldProps: {
    fontFamily: "Gilroy, sans-serif",
  },
  textFieldMain: {
    width: "6rem",
  },
  flexBox: {
    display: "flex",
    marginBottom: "1.25rem",
    "& div": {
      marginRight: "0.1rem",
      marginLeft: "0.1rem",
      [theme.breakpoints.down("610")]: {
        marginRight: 0,
        marginLeft: 0,
        marginBottom: "0.25rem",
      },
    },
    [theme.breakpoints.down("610")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#08184A",
    textAlign: "center",
    [theme.breakpoints.down("640")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.down("410")]: {
      fontSize: "1.4rem",
    },
  },
  subheader: {
    color: "#36454F",
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "1.5rem",
    marginTop: "0.25rem",
    maxWidth: "30rem",
    [theme.breakpoints.down("640")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("410")]: {
      fontSize: "0.8rem",
    },
  },
  continueButton: {
    border: "0.15rem solid #249FFB",
    fontFamily: "Gilroy",
    color: "#249FFB",
    padding: "1rem",
    fontWeight: "bold",
    [theme.breakpoints.down("1258")]: {
      padding: "0.85rem",
    },
    [theme.breakpoints.down("930")]: {
      padding: "0.65rem",
      fontSize: "0.8rem",
    },
  },
}));

export default function SellPropertyIndex() {
  const router = useRouter();
  const { query } = router;

  const authLocalState = useRecoilValue(authState);
  const [loginModal, setLoginModal] = useState(false);
  useEffect(() => {
    if (authLocalState !== null && authLocalState.auth === false) {
      setLoginModal(true);
    }
  }, [authLocalState]);
  console.log(loginModal);
  const [disabled, setDisabled] = useState(true);
  const [unit, setUnit] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if ((coordinates.lat !== null) & (coordinates !== null)) {
      setDisabled(false);
    }
  }, [coordinates]);

  const onChange = (e) => {
    setUnit(e.target.value);
  };

  const classes = useStyles();

  const [validAddress, setValidAddress] = useState(null);
  React.useEffect(() => {
    console.log(address);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (res, status) {
      if (res) {
        res[0]?.address_components.map((i) => {
          i.types.map((j) => {
            if (j === "postal_code") {
              setValidAddress(true);
            } else {
              setValidAddress(false);
            }
          });
        });
      }
    });
  }, [address, query]);

  React.useEffect(() => {
    if (query.unit) {
      setUnit(query.unit);
    }
  }, [query]);
  return (
    <Layout>
      <div className={classes.root}>
        <NeedLogin open={loginModal} setOpen={setLoginModal} />
        <Stepper value={10} message={"Let's Get You Started!"} />
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.header}>
              To begin, let’s find the property you want to sell!
            </div>
            <div className={classes.subheader}>
              Enter your address below to locate your property and we’ll
              crosscheck it with municipality records.
            </div>
            <div className={classes.flexBox}>
              <div>
                <Search
                  coordinateUpdater={(i) => {
                    setCoordinates(i);
                  }}
                  addressUpdater={(i) => {
                    setAddress(i);
                  }}
                  absolute={false}
                  query={query}
                />
              </div>
              <div>
                <TextField
                  label="Unit #"
                  variant="outlined"
                  className={classes.textFieldMain}
                  InputProps={{
                    className: classes.textFieldProps,
                  }}
                  InputLabelProps={{
                    className: classes.textFieldProps,
                  }}
                  onChange={onChange}
                  value={unit}
                />
              </div>
            </div>
            <Link
              href={{
                pathname: "/sellproperty/confirm",
                query: {
                  address: address,
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  unit: unit,
                },
              }}
            >
              <Button
                disabled={validAddress === null ? true : !validAddress}
                className={classes.continueButton}
              >
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
