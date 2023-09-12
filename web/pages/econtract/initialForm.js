import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../components/states";
import Link from "next/link";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    minHeight: "50rem",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "30rem",
    textAlign: "center",
  },
  header: {
    fontSize: "2.75rem",
  },
  subHeader: {
    fontSize: "1.25rem",
    color: "grey",
  },
  check: {
    background: "#00ff80",
    borderRadius: "50%",
    padding: "0.35rem",
    fontSize: "3rem",
    color: "white",
  },
  error: {
    background: "#ff0033",
    borderRadius: "50%",
    padding: "0.35rem",
    fontSize: "3rem",
    color: "white",
  },
  iconContainer: {},
}));

export default function initalForm() {
  const classes = useStyles();

  const authLocalState = useRecoilValue(authState);
  const router = useRouter();
  const { query } = router;

  if (authLocalState !== null && authLocalState.auth === false) {
    router.push("/login");
  }

  const [requestEContracts, setRequestEContracts] = useState([]);
  const [resEContract, setResEContract] = useState([]);
  const [sendOver, setSendOver] = useState({});
  const [error, setError] = useState(null);
  const [sellerName, setSellerName] = useState("");
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getRequestFormData`,
        { withCredentials: true }
      )
      .then((res) => setRequestEContracts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    requestEContracts.map((i) => {
      if (i.propertyId === query.propertyId) {
        setSendOver(i);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/getNameFromEmail`,
            {
              email: i.sellerEmail,
            }
          )
          .then((res) => setSellerName(res.data))
          .catch((err) => console.log(err));
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/getSignRequest`,
            { uuid: i.formUUID },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            setResEContract(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, [requestEContracts, query]);

  useEffect(() => {
    console.log(resEContract);
    if (resEContract?.signers?.[1]?.signed) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/econtract/sendToSeller`,
          {
            to: resEContract?.signers?.[2].email,
            propertyId: sendOver.propertyId,
            embed: resEContract?.signers?.[2].embed_url,
          },
          { withCredentials: true }
        )
        .then((res) => setError(false))
        .catch((err) => {
          if (err.response.data === "Document Signed") {
            setError(true);
          }
        });
    }
  }, [resEContract, sendOver]);

  return (
    <Layout>
      {error === null ? (
        <div className={classes.root}>
          <div className={classes.inner}>
            <CircularProgress />
          </div>
        </div>
      ) : error === false ? (
        <div className={classes.root}>
          <div className={classes.inner}>
            <div className={classes.iconContainer}>
              <CheckCircleOutlineIcon className={classes.check} />
            </div>
            <div className={classes.header}>Thank You</div>
            <div className={classes.subHeader}>
              Your E-Contract request has been sent
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <div className={classes.inner}>
            <div className={classes.iconContainer}>
              <ErrorOutlineIcon className={classes.error} />
            </div>
            <div className={classes.header}>Invalid Request</div>
            <div className={classes.subHeader}>
              We Apologize but an Error has occured
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
