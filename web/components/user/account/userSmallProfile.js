import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Layout from "../../../components/layout";
import { useRecoilValue } from "recoil";
import { authState } from "../../../components/states";
import SwapHorizontalCircleRoundedIcon from "@material-ui/icons/SwapHorizontalCircleRounded";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      maxWidth: "12.5rem",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.1rem",
      marginBottom: "0.5rem",
    },
    name: {
      color: "#08184A",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    email: {
      maxWidth: "11.5rem",
      fontWeight: 600,
      color: "grey",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    image: {
      width: "6rem",
      height: "6rem",
      borderRadius: "1rem",
      objectFit: "cover",
    },
    swapAccountButton: {
      color: "#1A73E8",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      marginBottom: "1rem",
    },
  })
);

export default function userSmallProfile() {
  const classes = useStyles();
  const authLocalState = useRecoilValue(authState);

  const router = useRouter();

  const swapAccount = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => console.log(err.response));
  };

  if (authLocalState?.auth === true) {
    const user = authLocalState.user;
    return (
      <div className={classes.root}>
        <div className={classes.imageContainer}>
          <img src={user.icon} alt="icon" className={classes.image} />
        </div>
        <div className={classes.name}>{user.name}</div>
        <div className={classes.email}>{user.email}</div>
      </div>
    );
  }
  return null;
}
