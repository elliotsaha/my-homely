import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Button, Dialog } from "@material-ui/core";
import Link from "next/link";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Table from "../components/table";
import Googlemap from "../components/home/googlemap";
import SearchBar from "../components/home/SearchBar";
import Slider from "@material-ui/core/Slider";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import HomeEstimate from "../components/home/HomeEstimate";
import { useRouter } from "next/router";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      overflowX: "hidden",
    },
    coverContainer: {
      overflow: "visible",
      zIndex: 10,
      position: "relative",
      backgroundColor: "#F9FDFF",
      paddingBottom: "8rem",
    },
    cover: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "visible",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "8rem",
      [theme.breakpoints.down("930")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.down("480")]: {
        flexDirection: "column-reverse",
      },
    },
    CTASection: {
      textAlign: "center",
      maxWidth: "70rem",
      marginLeft: "2.5rem",
      [theme.breakpoints.down("1774")]: {
        maxWidth: "37.5rem",
      },
      [theme.breakpoints.down("480")]: {
        marginLeft: "1rem",
      },
      [theme.breakpoints.down("350")]: {
        marginRight: "1rem",
      },
    },
    coverImageContainer: {
      marginRight: "2.5rem",
      [theme.breakpoints.down("930")]: {
        marginLeft: "5rem",
        marginRight: "5rem",
      },
      [theme.breakpoints.down("630")]: {
        marginLeft: "1.25rem",
        marginRight: "1.25rem",
      },
    },
    coverImage: {
      width: "50rem",
      margin: 0,
      [theme.breakpoints.down("1774")]: {
        width: "42rem",
      },
      [theme.breakpoints.down("1258")]: {
        width: "35rem",
      },
      [theme.breakpoints.down("1108")]: {
        width: "32rem",
      },
      [theme.breakpoints.down("1022")]: {
        width: "27rem",
      },
      [theme.breakpoints.down("930")]: {
        marginTop: "3rem",
        width: "100%",
      },
      [theme.breakpoints.down("480")]: {
        marginTop: 0,
      },
    },
    playArrowIcon: {
      verticalAlign: "middle",
      color: "#249FFB",
      marginLeft: "-0.4rem",
      fontSize: "1.75rem",
      [theme.breakpoints.down("350")]: {
        fontSize: "1.25rem",
      },
    },
    coverHeader: {
      marginTop: "5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      fontSize: "4.75rem",
      lineHeight: "5.45rem",
      paddingBottom: "0.75rem",
      [theme.breakpoints.down("1774")]: {
        fontSize: "3.2rem",
        lineHeight: "4.5rem",
      },
      [theme.breakpoints.down("1258")]: {
        fontSize: "3.2rem",
        lineHeight: "4.5rem",
      },
      [theme.breakpoints.down("930")]: {
        fontSize: "2.5rem",
        lineHeight: "3.5rem",
        marginRight: "1.15rem",
        width: "93%",
        marginTop: "auto",
      },
      [theme.breakpoints.down("480")]: {
        fontSize: "2.15rem",
        lineHeight: "2.5rem",
        marginLeft: "auto",
        marginLeft: "auto",
      },

      [theme.breakpoints.down("440")]: {
        fontSize: "1.8rem",
        lineHeight: "2rem",
        marginLeft: "0.5rem",
      },
      "& span:nth-child(1)": {
        textDecoration: "underline",
        textUnderlineOffset: "0.25rem",
        color: "#249FFB",
      },
      "& span:nth-child(2)": {
        color: "#249FFB",
      },
    },
    coverDescription: {
      marginTop: "-0.5rem",
      fontSize: "1.6rem",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "40rem",
      color: "grey",
      fontWeight: "500",
      marginBottom: "2.1rem",
      [theme.breakpoints.down("1000")]: {
        fontSize: "1.25rem",
        margin: "1rem",
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "14%",
        margin: "auto",
      },
      [theme.breakpoints.down("600")]: {
        marginTop: "-1.5rem",
        fontSize: "1rem",
        marginBottom: "2rem",
      },
    },
    listYourPropertyButton: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      background: "#249FFB",
      padding: "1rem",
      color: "white",
      fontWeight: "bolder",
      "&:hover": {
        background: "#249FFB",
      },
      [theme.breakpoints.down("1258")]: {
        padding: "0.85rem",
      },
      [theme.breakpoints.down("930")]: {
        padding: "0.65rem",
        fontSize: "0.8rem",
        marginLeft: "0rem",
      },
      [theme.breakpoints.down("350")]: {
        padding: "0.5rem",
        fontSize: "0.8rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      },
    },
    listYourPropertyButtonOutlined: {
      textTransform: "none",
      fontFamily: "Gilroy, sans-serif",
      border: "0.15rem solid #249FFB",
      padding: "1rem",
      color: "#249FFB",
      fontWeight: "bolder",
      [theme.breakpoints.down("1258")]: {
        padding: "0.85rem",
      },
      [theme.breakpoints.down("930")]: {
        padding: "0.65rem",
        fontSize: "0.8rem",
        marginLeft: "0rem",
      },
      [theme.breakpoints.down("350")]: {
        padding: "0.5rem",
        fontSize: "0.8rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      },
    },
    searchPropertyButton: {
      marginLeft: "1.5rem",
      fontFamily: "Gilroy, sans-serif",
      border: "0.125rem solid #808080",
      overflow: "hidden",
      padding: "1rem",
      fontWeight: "bold",
      [theme.breakpoints.down("1258")]: {
        padding: "0.85rem",
        marginLeft: "1rem",
      },
      [theme.breakpoints.down("930")]: {
        padding: "0.65rem",
        fontSize: "0.8rem",
        marginLeft: "1rem",
      },
      [theme.breakpoints.down("350")]: {
        padding: "0.5rem",
        fontSize: "0.8rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        marginTop: "1rem",
      },
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "1.0rem",
      [theme.breakpoints.down("350")]: {
        flexDirection: "column",
        marginRight: "3rem",
        marginLeft: "-0.5rem",
      },
    },
    sphere: {
      width: "12.5rem",
      backgroundColor: "#FFC000",
      height: "12.5rem",
      borderRadius: "100%",
      position: "absolute",
      left: "-6.5rem",
      bottom: "9rem",
      opacity: "30%",
      [theme.breakpoints.down("930")]: {
        top: "5rem",
        zIndex: -1,
        opacity: "20%",
      },
    },
    dotted: {
      position: "absolute",
      left: "-2rem",
      bottom: "30rem",
      [theme.breakpoints.down("930")]: {
        top: "30rem",
      },
    },
    square: {
      display: "none",
      position: "absolute",
      background: "#249FFB",
      opacity: "39%",
      width: "10rem",
      height: "2rem",
      left: "-2rem",
      bottom: "-8rem",
      [theme.breakpoints.down("930")]: {
        bottom: "-6rem",
        height: "5rem",
        transform: "rotate(10deg)",
      },
      [theme.breakpoints.down("480")]: {
        bottom: "-7.5rem",
        transform: "rotate(10deg)",
      },
      [theme.breakpoints.down("350")]: {
        bottom: "-7.5rem",
        transform: "rotate(12.5deg)",
      },
    },
    bigCircle: {
      width: "20rem",
      zIndex: -2,
      height: "20rem",
      borderRadius: "100%",
      position: "absolute",
      right: "-10rem",
      bottom: "-5rem",
      background: "#249FFB",
      opacity: "25%",
      [theme.breakpoints.down("930")]: {
        top: "5rem",
        opacity: "7.5%",
      },
    },
    tabs: {
      background: "#F9F8F8",
      position: "relative",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr ",
      gridTemplateRows: "1",
      gap: "0.75rem",

      [theme.breakpoints.down("980")]: {
        gap: 0,
      },
    },
    tabContainer: {
      position: "relative",
      overflow: "hidden",
    },
    tabIcon: {
      marginBottom: "0.2rem",
      marginRight: "0.1rem",
      marginLeft: "17px",
    },
    tabActive: {
      color: "#249FFB",
      textTransform: "none",
      height: "3rem",
      paddingTop: "0.8rem",
      borderRadius: "0.5rem",
      fontFamily: "Gilroy, sans-serif",
      background: "white",
      fontWeight: "bold",
      fontSize: "1rem",
      "&:hover": {
        background: "white",
      },
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      [theme.breakpoints.down("812")]: {
        width: "100%",
      },
    },
    tabInactive: {
      color: "grey",
      textTransform: "none",
      height: "3rem",
      fontSize: "1rem",
      paddingTop: "0.8rem",
      borderRadius: "0.5rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      background: "#f0f0f0",
      "&:hover": {
        background: "#f0f0f0",
      },
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      [theme.breakpoints.down("812")]: {
        width: "100%",
      },
    },
    button: {
      fontFamily: "Gilroy, sans-serif",
      border: 0,
      fontSize: "inherit",
      fontWeight: "inherit",
      background: "inherit",
      color: "inherit",
      cursor: "pointer",
      "&:focus": {
        outline: 0,
      },
      [theme.breakpoints.down("812")]: {
        fontSize: "11px",
      },
    },
    belowFold: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "5rem",
      marginBottom: "5rem",
      position: "relative",
      flexDirection: "column",
      zIndex: 5,
    },
    singleAvatarRootInner: {
      background: "white",
      width: "67.5rem",
      boxShadow: "0.2rem 0.2rem 3rem 0.1rem #ccc",
      height: "31rem",
      paddingRight: "2rem",
      paddingLeft: "2rem",
      paddingBottom: "3rem",
      paddingTop: "2rem",
      borderRadius: "0.75rem",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      [theme.breakpoints.down("1150")]: {
        width: "57rem",
      },
      [theme.breakpoints.down("980")]: {
        width: "35rem",
        height: "100%",
      },
    },
    singleAvatarRoot: {
      position: "relative",
    },
    sellerImage: {
      marginLeft: "5rem",
      marginRight: "4rem",
      marginBottom: "1rem",
    },
    singleAvatarImageContainer: {
      position: "absolute",
      right: "-9.5rem",
      bottom: "1rem",
      [theme.breakpoints.down("1190")]: {
        right: "-2rem",
      },
      [theme.breakpoints.down("1085")]: {
        right: "-3rem",
        bottom: "1.5rem",
      },
      [theme.breakpoints.down("930")]: {
        display: "none",
      },
    },
    singleAvatarImage: {
      width: "19.5rem",
      [theme.breakpoints.down("1190")]: {
        width: "13rem",
      },
    },
    centerHeaderSmall: {
      maxWidth: "60rem",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "center",
      color: "#08184A",
      fontSize: "1.85rem",
      marginBottom: "-0.4rem",
      "& span": {
        textDecoration: "underline",
        textUnderlineOffset: "0.25rem",
      },
      [theme.breakpoints.down("812")]: {
        fontSize: "1.5rem",
        margin: "2rem",
      },
    },
    centerHeaderSmaller: {
      maxWidth: "60rem",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "center",
      color: "#08184A",
      fontSize: "1.65rem",
      marginBottom: "-0.4rem",
      "& span": {
        textDecoration: "underline",
        textUnderlineOffset: "0.25rem",
      },
      [theme.breakpoints.down("770")]: {
        fontSize: "1.3rem",
        marginBottom: "-1.4rem",
      },
    },
    centerHeader: {
      paddingRight: "5rem",
      paddingLeft: "5rem",
      textAlign: "center",
      color: "#08184A",
      fontSize: "2.25rem",
      [theme.breakpoints.down("1370")]: {
        fontSize: "1.75rem",
      },
      [theme.breakpoints.down("930")]: {
        margin: "auto",
        textAlign: "center",
      },
      [theme.breakpoints.down("650")]: {
        paddingRight: "1.5rem",
        paddingLeft: "1.5rem",
        fontSize: "1.8rem",
      },
      [theme.breakpoints.down("400")]: {
        paddingRight: "1rem",
        paddingLeft: "1rem",
        fontSize: "1.7rem",
      },
      [theme.breakpoints.down("345")]: {
        paddingRight: "0.7rem",
        paddingLeft: "0.7rem",
        fontSize: "1.6rem",
      },
    },
    money: {
      color: "white",
      fontWeight: "bolder",
      fontSize: "0.65rem",
      fontFamily: "Gilroy, sans-serif",
    },
    sliderHeader: {
      fontWeight: "bold",
      marginTop: "auto",
      marginBottom: "auto",
      paddingBottom: "2.5rem",
      fontSize: "1.5rem",
      float: "left",
      color: "#08184A",
      [theme.breakpoints.down("1370")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.down("650")]: {
        paddingBottom: "2.75rem",
        fontSize: "1.4rem",
      },
    },
    gridSliderContainer: {
      display: "grid",
      gridTemplateColumns: "10rem 1fr",
      gridTemplateRows: "1fr 1fr",
      marginRight: "5rem",
      [theme.breakpoints.down("1190")]: {
        maxWidth: "50rem",
      },
      [theme.breakpoints.down("1085")]: {
        maxWidth: "35rem",
        marginLeft: "5rem",
      },
      [theme.breakpoints.down("930")]: {
        marginTop: "1rem",
        margin: "auto",
        marginLeft: "2rem",
        marginRight: "2rem",
        maxWidth: "40rem",
      },
      [theme.breakpoints.down("650")]: {
        display: "block",
      },
    },
    centerButtonContainer: {
      [theme.breakpoints.down("650")]: {
        marginTop: "1.5rem",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      "& div": {
        paddingTop: "1rem",
        fontWeight: 500,
        color: "#08184A",
        textAlign: "center",
      },
    },
    dottedAvaterContainer: {
      position: "absolute",
      bottom: "-8rem",
      left: "-2rem",
      transform: "rotate(90deg)",
    },
    dottedImage: {
      width: "12rem",
    },
    largeDotted: {
      position: "absolute",
      bottom: "0rem",
      left: "20rem",
      zIndex: -2,
    },
    worksRoot: {
      overflow: "hidden",
      marginTop: "7rem",
      paddingBottom: "7rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    worksHeader: {
      fontWeight: "bolder",
      fontSize: "3rem",
      lineHeight: "4.25rem",
      paddingBottom: "2rem",
      color: "#08184A",
      [theme.breakpoints.down("1774")]: {
        fontSize: "2.75rem",
      },
      [theme.breakpoints.down("1258")]: {
        fontSize: "2.4rem",
        lineHeight: "3rem",
      },
      [theme.breakpoints.down("1022")]: {
        fontSize: "2.15rem",
        lineHeight: "2.5rem",
      },
      [theme.breakpoints.down("930")]: {
        fontSize: "3rem",
        lineHeight: "3.5rem",
        marginLeft: "1.15rem",
        marginRight: "1.15rem",
        textAlign: "center",
      },
      [theme.breakpoints.down("480")]: {
        fontSize: "2.15rem",
        lineHeight: "2.5rem",
      },
      "& span": {
        color: "#249FFB",
      },
    },
    stepBody: {
      position: "relative",
      width: "23rem",
      [theme.breakpoints.down("1918")]: {
        width: "20rem",
      },
      [theme.breakpoints.down("1600")]: {
        width: "16rem",
      },
      [theme.breakpoints.down("1350")]: {
        width: "12rem",
      },
      [theme.breakpoints.down("1000")]: {
        width: "28rem",
      },
      [theme.breakpoints.down("540")]: {
        width: "17.5rem",
      },
      [theme.breakpoints.down("350")]: {
        width: "13.5rem",
      },
    },
    step1Number: {
      position: "absolute",
      right: 0,
      bottom: "2rem",
      width: "4rem",
      lineHeight: "2.9rem",
      borderRadius: "50%",
      textAlign: "center",
      background: "#249FFB",
      border: "10px solid #FAFAFA",
      fontWeight: "bold",
      fontSize: "1rem",
      color: "white",
      [theme.breakpoints.down("1350")]: {
        right: "-1rem",
      },
      [theme.breakpoints.down("1000")]: {
        left: "auto",
        right: "auto",
        top: "-2rem",
        bottom: "auto",
      },
    },
    stepHeader: {
      color: "#08184A",
      fontWeight: "bold",
      fontSize: "1.75rem",
      marginRight: "2rem",
      lineHeight: "2rem",
      paddingBottom: "0.75rem",
      [theme.breakpoints.down("1350")]: {
        fontSize: "1.3rem",
        lineHeight: "2rem",
        marginLeft: "1rem",
        marginRight: 0,
      },
      [theme.breakpoints.down("1000")]: {
        fontSize: "2rem",
        lineHeight: "2.5rem",
        marginLeft: 0,
      },
      [theme.breakpoints.down("350")]: {
        fontSize: "1.6rem",
        lineHeight: "2rem",
      },
    },
    stepDescription: {
      color: "grey",
      fontSize: "0.95rem",
      marginRight: "2rem",
      height: "1rem",
      [theme.breakpoints.down("1350")]: {
        fontSize: "0.8rem",
        marginLeft: "1rem",
        marginRight: "1rem",
      },
      [theme.breakpoints.down("1000")]: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        marginLeft: 0,
      },
      [theme.breakpoints.down("350")]: {
        fontSize: "1rem",
        lineHeight: "1.4rem",
      },
    },
    imageRoot: {
      position: "relative",
    },
    stepImage: {
      width: "22rem",
      [theme.breakpoints.down("1918")]: {
        width: "18rem",
      },
      [theme.breakpoints.down("1600")]: {
        width: "15rem",
      },
      [theme.breakpoints.down("1350")]: {
        width: "12rem",
      },
      [theme.breakpoints.down("1000")]: {
        width: "28rem",
      },
      [theme.breakpoints.down("540")]: {
        width: "17.5rem",
      },
      [theme.breakpoints.down("350")]: {
        width: "13.5rem",
      },
    },
    stepContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      position: "relative",
      [theme.breakpoints.down("1000")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    stepCenterNumber: {
      position: "absolute",
      width: "4rem",
      top: "-2rem",
      lineHeight: "2.9rem",
      borderRadius: "50%",
      textAlign: "center",
      background: "#249FFB",
      border: "10px solid #FAFAFA",
      fontWeight: "bold",
      fontSize: "1rem",
      color: "white",
    },
    step3Number: {
      position: "absolute",
      width: "4rem",
      top: "-2rem",
      lineHeight: "2.9rem",
      borderRadius: "50%",
      textAlign: "center",
      background: "#249FFB",
      border: "10px solid #FAFAFA",
      fontWeight: "bold",
      fontSize: "1rem",
      color: "white",
      [theme.breakpoints.down("1918")]: {
        right: "8.5rem",
      },
      [theme.breakpoints.down("1600")]: {
        right: "auto",
        left: "auto",
      },
    },
    numberContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    step5Number: {
      position: "absolute",
      left: "-1.5rem",
      bottom: "2rem",
      width: "4rem",
      lineHeight: "2.9rem",
      borderRadius: "50%",
      textAlign: "center",
      background: "#249FFB",
      border: "10px solid #FAFAFA",
      fontWeight: "bold",
      fontSize: "1rem",
      color: "white",
      [theme.breakpoints.down("1000")]: {
        left: "auto",
        right: "auto",
        top: "-2rem",
        bottom: "auto",
      },
    },
    step1Container: {
      gridRow: 1,
      gridColumn: 1,
      [theme.breakpoints.down("1000")]: {
        marginBottom: "5rem",
      },
    },
    step2Container: {
      gridRow: 2,
      gridColumn: 2,
      marginTop: "-3rem",
      [theme.breakpoints.down("1000")]: {
        marginBottom: "5rem",
      },
    },
    step3Container: {
      gridRow: 1,
      gridColumn: 3,
      [theme.breakpoints.down("1000")]: {
        marginBottom: "5rem",
      },
    },
    step4Container: {
      gridRow: 2,
      gridColumn: 4,
      marginTop: "-3rem",
      [theme.breakpoints.down("1000")]: {
        marginBottom: "5rem",
      },
    },
    step5Container: {
      gridRow: 1,
      gridColumn: 5,
      [theme.breakpoints.down("1000")]: {
        marginBottom: "5rem",
      },
    },
    centerSmaller: {
      display: "block",
      [theme.breakpoints.down("1000")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    dashedLineLeft: {
      width: "16rem",
      top: "15rem",
      position: "absolute",
      left: "19rem",
      [theme.breakpoints.down("1918")]: {
        left: "10rem",
        width: "20rem",
        top: "10rem",
      },
      [theme.breakpoints.down("1600")]: {
        left: "1rem",
        width: "23rem",
        top: "7rem",
      },
      [theme.breakpoints.down("1350")]: {
        display: "none",
      },
    },
    dashedLineRight: {
      width: "16rem",
      top: "15rem",
      position: "absolute",
      right: "18rem",
      transform: "scaleX(-1)",
      [theme.breakpoints.down("1918")]: {
        right: "10rem",
        width: "20rem",
        top: "10rem",
      },
      [theme.breakpoints.down("1600")]: {
        right: "1rem",
        width: "23rem",
        top: "7rem",
      },
      [theme.breakpoints.down("1350")]: {
        display: "none",
      },
    },
    dashedLineInnerRight: {
      width: "16rem",
      top: "15rem",
      position: "absolute",
      left: "35rem",
      transform: "scaleX(-1)",
      [theme.breakpoints.down("1918")]: {
        left: "30rem",
        width: "20rem",
        top: "10rem",
      },
      [theme.breakpoints.down("1600")]: {
        left: "24.25rem",
        width: "20rem",
        top: "8.85rem",
      },
      [theme.breakpoints.down("1350")]: {
        display: "none",
      },
    },
    dashedLineInnerLeft: {
      width: "16rem",
      top: "15rem",
      position: "absolute",
      right: "35rem",
      [theme.breakpoints.down("1918")]: {
        right: "30rem",
        width: "20rem",
        top: "10rem",
      },
      [theme.breakpoints.down("1600")]: {
        right: "24.25rem",
        width: "20rem",
        top: "8.85rem",
      },
      [theme.breakpoints.down("1350")]: {
        display: "none",
      },
    },

    longerDashedLineLeft: {
      display: "none",
      [theme.breakpoints.down("1350")]: {
        display: "block",
        position: "absolute",
        top: "7.5rem",
        left: "10.5rem",
        width: "9rem",
        height: "19rem",
      },
      [theme.breakpoints.down("1000")]: {
        display: "none",
      },
    },
    longerDashedLineRight: {
      display: "none",
      [theme.breakpoints.down("1350")]: {
        display: "block",
        position: "absolute",
        top: "7.5rem",
        right: "11.5rem",
        width: "7rem",
        transform: "scaleX(-1)",
        height: "19rem",
      },
      [theme.breakpoints.down("1000")]: {
        display: "none",
      },
    },
    longerDashedLineInnerRight: {
      display: "none",
      [theme.breakpoints.down("1350")]: {
        display: "block",
        position: "absolute",
        top: "7.5rem",
        left: "35.5rem",
        width: "7rem",

        height: "19rem",
      },
      [theme.breakpoints.down("1000")]: {
        display: "none",
      },
    },
    longerDashedLineInnerLeft: {
      display: "none",
      [theme.breakpoints.down("1350")]: {
        display: "block",
        position: "absolute",
        top: "7.5rem",
        right: "35.5rem",
        width: "7rem",
        transform: "scaleX(-1)",

        height: "19rem",
      },
      [theme.breakpoints.down("1000")]: {
        display: "none",
      },
    },
    noCatchRoot: {
      marginTop: "8rem",
      marginBottom: "5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "3rem",
      marginLeft: "2rem",
      marginRight: "2rem",
      [theme.breakpoints.down("990")]: {
        flexDirection: "column",
      },
    },
    noCatchHeader: {
      fontWeight: "bolder",
      fontSize: "3rem",
      lineHeight: "3.5rem",
      paddingBottom: "1rem",
      maxWidth: "28rem",
      color: "#08184A",
      [theme.breakpoints.down("1774")]: {
        fontSize: "2.75rem",
      },
      [theme.breakpoints.down("1258")]: {
        fontSize: "2.4rem",
        lineHeight: "3rem",
      },
      [theme.breakpoints.down("1022")]: {
        fontSize: "2.15rem",
        lineHeight: "2.5rem",
      },
      [theme.breakpoints.down("930")]: {
        fontSize: "3rem",
        lineHeight: "3.5rem",
        marginRight: "1.15rem",
      },
      [theme.breakpoints.down("480")]: {
        fontSize: "2.15rem",
        lineHeight: "2.5rem",
      },
      "& span": {
        color: "#249FFB",
      },
    },
    noCatchMainPara: {
      maxWidth: "35rem",
      fontSize: "1rem",
      color: "#363738",
      "& div": {
        marginBottom: "1.5rem",
      },
      "& div:nth-child(2)": {
        fontWeight: "bold",
        color: "grey",
      },
    },
    noCatchImageContainer: {
      marginRight: "5rem",
      "& img": {
        width: "40rem",
        [theme.breakpoints.down("1230")]: {
          width: "30rem",
        },
        [theme.breakpoints.down("600")]: {
          width: "25rem",
        },
        [theme.breakpoints.down("450")]: {
          width: "20rem",
        },
        [theme.breakpoints.down("350")]: {
          width: "17rem",
        },
      },
      [theme.breakpoints.down("1230")]: {
        marginRight: "2.5rem",
      },
      [theme.breakpoints.down("990")]: {
        marginBottom: "2.5rem",
        marginRight: 0,
      },
    },
    sliderRoot: {
      height: "22rem",
      paddingBottom: "2.5rem",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.75rem",
    },
    sliderRootLarge: {
      height: "23.25rem",
      paddingBottom: "2.5rem",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.75rem",
    },

    sliderRootBigger: {
      height: "23.25rem",
      paddingBottom: "2.5rem",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.75rem",
      marginRight: "-2rem",
      width: "8rem",
    },
    sliderContainer: {
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
      [theme.breakpoints.down("812")]: {
        width: "73%",
      },
    },
    sliderTitle: {
      fontSize: "2.25rem",
      textAlign: "center",
      color: "#08184A",
      lineHeight: "2.5rem",
      fontWeight: "bold",
      marginBottom: "3rem",
      [theme.breakpoints.down("812")]: {
        fontSize: "1.3rem",
        marginTop: "-5rem",
      },
    },
    dialogPaper: {
      borderRadius: "0.8rem",
      padding: "5rem",
      paddingTop: "3.5rem",
      paddingBottom: "3.5rem",
    },
    sliderContainerSeller: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
    },
    sliders: {
      display: "flex",
      gap: "2rem",
      marginRight: "1.35rem",
      marginBottom: "1.2rem",
    },
    slidersSeller: {
      display: "flex",
      gap: "6rem",
      marginRight: "1.35rem",
      marginBottom: "1.2rem",
      [theme.breakpoints.down("812")]: {
        gap: "0rem",
        marginRight: "0rem",
      },
    },
    sliderSideText: {
      fontSize: "1.2rem",
      color: "#38383A",
      [theme.breakpoints.down("812")]: {
        fontSize: "1rem",
      },
    },

    sliderSideTextSmall: {
      fontSize: "1.2rem",
      color: "#38383A",
      maxWidth: "9rem",
      textAlign: "center",
      [theme.breakpoints.down("812")]: {
        fontSize: "1rem",
        maxWidth: "6rem",
      },
    },
    sliderSideTextSmallMarginFix: {
      marginTop: "0.25rem",
      fontSize: "1rem",
      color: "#38383A",
      maxWidth: "9rem",
      textAlign: "center",
    },
    sliderSideTextCashBack: {
      marginLeft: "0.75rem",
      fontSize: "1.2rem",
      color: "#38383A",
      [theme.breakpoints.down("812")]: {
        fontSize: "1rem",
      },
    },

    sliderSideTextCashBackSmall: {
      marginLeft: "0.5rem",
      fontSize: "1.2rem",
      color: "#38383A",
      [theme.breakpoints.down("812")]: {
        fontSize: "1rem",
      },
    },
    checkContainer: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "flex-start",
      maxWidth: "22rem",
      gap: "1rem",
      marginBottom: "1rem",
      marginLeft: "-2rem",
      marginTop: "1.25rem",
      [theme.breakpoints.down("770")]: {
        width: "50rem",
      },
    },
    checkItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "0.75rem",
      fontWeight: 600,
      color: "#00df97",
      "& > div:nth-child(1)": {
        "& > *": {
          fontSize: "1.55rem",
        },
      },
      "& > div:nth-child(2)": {
        color: "#38383A",
        fontSize: "1.15rem",
      },
    },
    checkItemSmaller: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "0.75rem",
      fontWeight: 600,
      color: "#00df97",
      "& > div:nth-child(1)": {
        "& > *": {
          fontSize: "1.4rem",
        },
      },
      "& > div:nth-child(2)": {
        color: "#38383A",
        fontSize: "1.05rem",
      },
    },
    activeBuyerRoot: {
      display: "flex",
      justifyContent: "center",
      gap: "4rem",
      alignItems: "flex-start",
      marginTop: "2.5rem",
      marginRight: "auto",
      marginLeft: "auto",
      paddingRight: "5rem",
      paddingLeft: "5rem",
      [theme.breakpoints.down("770")]: {
        flexDirection: "column",
      },
    },
    saveYou: {
      marginBottom: "0.2rem",
      textAlign: "center",
      marginTop: "-1.5rem",
      display: "flex",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: "#38383A",
      gap: "0.4rem",
      width: "15rem",
      [theme.breakpoints.down("812")]: {
        marginLeft: "25px",
      },
      "& > div": {
        "& > span": {
          fontSize: "1.2rem",
          color: "#00BE81",
        },
      },
    },
    singleAvatarButtonGroup: {
      display: "flex",
      marginRight: "0.25rem",
      flexDirection: "column",
      gap: "0.25rem",
      [theme.breakpoints.down("812")]: {
        marginLeft: "25px",
      },
    },
    learnMoreButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      fontSize: "0.85rem",
      color: "grey",
    },
    firstPriorityButton: {
      textTransform: "none",
      padding: "1rem",
      paddingRight: "1.1rem",
      paddingLeft: "1.1rem",
      fontSize: "1rem",
      marginTop: "1.25rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },
    firstPriorityButtonMargin: {
      textTransform: "none",
      padding: "1rem",
      paddingRight: "1.1rem",
      paddingLeft: "1.1rem",
      fontSize: "1rem",
      marginTop: "1.25rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },
    searchContainer: {
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      position: "relative",
      paddingBottom: "2.5rem",
    },

    estimateContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: "20rem",
    },
    estimatePara: {
      marginTop: "-3rem",
      paddingBottom: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "grey",
    },
    buyerSellerCardContainer: {
      display: "flex",
      gap: "1.6rem",

      [theme.breakpoints.down("980")]: {
        flexDirection: "column",
        marginLeft: "1.1rem",
      },
    },
    buyerSellerCardBlue: {
      boxShadow: "0px 5px 19px 4px rgba(176,176,176,0.25)",
      background: "white",
      display: "flex",
      alignItems: "space-between",
      flexDirection: "column",
      borderRadius: "0.5rem",
      padding: "1.3rem",
      fontWeight: "bold",
      color: "#249FFB",
      gap: "1rem",
      width: "25rem",
      [theme.breakpoints.down("770")]: {
        width: "25rem",
        marginLeft: "-3rem",
      },
    },
    buyerSellerCard: {
      boxShadow: "0px 5px 19px 4px rgba(176,176,176,0.25)",
      background: "white",
      display: "flex",
      alignItems: "space-between",
      flexDirection: "column",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      padding: "2.5rem",
      color: "#656565",
      gap: "1rem",
      width: "25rem",
      [theme.breakpoints.down("770")]: {
        width: "25rem",
        marginLeft: "-3rem",
        marginTop: "-3rem",
      },
    },
    cashback: {
      fontSize: "1rem!important",
      maxWidth: "1.6rem",
    },
    noSellersAgent: {
      fontSize: "1rem!important",
      maxWidth: "1.6rem",
    },
    marginShift: {
      marginLeft: "1.2rem",
    },
    buyerSellerCardFlexInnerBlue: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2.5rem",
      "& > *": {
        textAlign: "center",
        "& > div:nth-child(1)": {
          fontSize: "1.15rem",
        },
        "& > div:nth-child(2)": {
          fontSize: "2.2rem",
        },
        "& > div:nth-child(3)": {
          marginTop: "-0.4rem",
          fontSize: "1.15rem",
          maxWidth: "9rem",
          textAlign: "center",
        },
      },
    },
    buyerSellerCardFlexInner: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2.5rem",
      "& > *": {
        textAlign: "center",
        "& > div:nth-child(1)": {
          fontSize: "2.2rem",
          lineHeight: "2.4rem",
        },
        "& > div:nth-child(2)": {
          fontSize: "1.1rem",
          maxWidth: "9rem",
          textAlign: "center",
        },
      },
    },
    buyerSellerCardTitle: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textAlign: "center",
    },
    buyerSellerCardTitleDown: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textAlign: "center",
      marginBottom: "-0rem",
      marginTop: "1.27rem",
    },
    buyerSellerCardSub: {
      textAlign: "center",
      fontSize: "0.9rem",
    },
    buyerSellerCardSubShort: {
      textAlign: "center",
      fontSize: "0.9rem",
      marginBottom: "1.25rem",
    },
    seeBuyerSellerButtonContainer: {
      width: "100%",
      position: "absolute",
      bottom: "1.1rem",
      right: "2rem",
    },
    seeBuyerSellerButtonInner: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    seeBuyerSellerButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      fontSize: "0.9rem",
      background: "#249FFB",
      color: "white",
      padding: "0.8rem",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      "&:hover": {
        background: "#249FFB",
      },
      // [theme.breakpoints.down("812")]: {
      //   marginLeft: "4rem",
      // },
    },
    successMessage: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    learnMoreHeaderSmall: {
      maxWidth: "60rem",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "center",
      color: "#08184A",
      marginTop: "0.25rem",
      fontSize: "1.25rem",
      marginBottom: "-0.4rem",
      fontWeight: "bold",
      color: "#249FFB",
      "&:hover": {
        textDecoration: "underline",
        textUnderlineOffset: "0.1rem",
      },
      "& span": {
        textDecoration: "underline",
        textUnderlineOffset: "0.25rem",
      },
      [theme.breakpoints.down("980")]: {
        fontSize: "1.3rem",
        marginLeft: "3rem",
        marginRight: "3rem",
        marginBottom: "4rem",
        marginTop: "-1.5rem",
        fontWeight: "500",
      },
    },
  })
);

const PrettoSlider = withStyles({
  root: {
    color: "#7D7D7D",
    height: 8,
    "&$vertical": {
      width: 8,
    },
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  vertical: {
    "& $rail": {
      width: 8,
      background: "#E8219C",
    },
    "& $track": {
      width: 8,

      backgroundImage:
        "linear-gradient(124.04deg, rgba(231, 33, 33, 0.65) 6.6%, rgba(187, 0, 116, 0.62) 88.31%)",
    },
    "& $thumb": {
      marginLeft: -8,
      marginBottom: -11,
    },
  },
})(Slider);

const PrettoSliderBlue = withStyles({
  root: {
    color: "#249FFB",
    height: 8,
  },

  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },

  vertical: {
    "& $rail": {
      width: 8,
    },
    "& $track": {
      width: 8,
    },
    "& $thumb": {
      marginLeft: -8,
      marginBottom: -11,
    },
  },
})(Slider);

const PrettoSliderGreen = withStyles({
  root: {
    color: "#00df97",
    height: 8,
  },

  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },

  vertical: {
    "& $rail": {
      width: 8,
    },
    "& $track": {
      width: 8,
    },
    "& $thumb": {
      marginLeft: -8,
      marginBottom: -11,
    },
  },
})(Slider);

const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export default function Index() {
  const [buyerSalePrice, setBuyerSalePrice] = useState(550000);
  const [sellerSalePrice, setSellerSalePrice] = useState(750000);
  const [buyerCashBack, setBuyerCashBack] = useState(3.5);
  const [buyerAgent, setBuyerAgent] = useState(2.3);
  const [sellerAgent, setSellerAgent] = useState(1.6);
  const [activeTab, setActiveTab] = useState("Seller");
  const [buyerDialogOpen, setBuyerDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noSuccess, setNoSuccess] = useState(false);

  const router = useRouter();
  const { query } = router;

  const classes = useStyles();

  useEffect(() => {
    if (query.switchToPhotography === "true") {
      router.push("/photographerPanel");
    }
  }, [query]);

  useEffect(() => {
    if (query.success === "true") {
      setSuccess(true);
      router.push(
        {
          pathname: "/",
        },
        undefined,
        { shallow: true }
      );
    }
  }, [query]);

  useEffect(() => {
    if (query.success === "false") {
      setNoSuccess(true);
      router.push(
        {
          pathname: "/",
        },
        undefined,
        { shallow: true }
      );
    }
  }, [query]);

  // RAJA'S API TESTING
  useEffect(() => {
    axios
      .post(
        "https://5v479nrmxh.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalcode: "M1B0A1",
        }
      )
      .then((res) => console.log("TEST1", res.data))
      .catch((err) => console.log(err));

    axios
      .post(
        "https://pumjqq4z80.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalCode: "L9T0J7",
          propertyStyle: 4,
          fsa: "L9T",
          province: "ON",
          propertyAge: 25,
          sizeBuild: 228,
          sizeLot: 112,
          propertyTax: 450,
        }
      )
      .then((res) => console.log("TEST2", res.data))
      .catch((err) => console.log(err));

    axios
      .post(
        "https://0oal6b8ejl.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalCode: "J8Y5S8",
          propertyStyle: 4,
        }
      )
      .then((res) => console.log("TEST3", res.data))
      .catch((err) => console.log(err));

    axios
      .post(
        "https://equ51lxyn2.execute-api.us-east-2.amazonaws.com/v1/postalcode",
        {
          password:
            "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
          postalcode: "M4X0A1",
          province: "ON",
          property_type: 1,
          property_price: 1000000,
          downpayment: 10000,
          sale_price: 1000000,
          amortization: 20,
          monthly_property_tax: 75,
          monthly_heating_bill: 50,
          rental_purpose: "yes",
          coborrower: "yes",
          self_employed: "no",
          foreign_buyer: "yes",
          job_tenure: 11,
          monthly_salary: 6893,
          monthly_other_income: 500,
          monthly_household_expenses: 1500,
          personal_loan_payments: 0,
          monthly_car_payments: 450,
          credit_card_Payments: 500,
          other_loan_payments: 500,
          gross_annual_income: 12000,
          creditscore: 772,
          total_credit_lines: 10,
          prior_bankruptcy: 0,
          year: 1988,
          prior_defaults: 0,
        }
      )

      .then((res) => console.log("TEST4", res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MuiAlert
            className={classes.successMessage}
            onClose={() => setSuccess(false)}
            severity="success"
            variant="filled"
          >
            Success!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={noSuccess}
          autoHideDuration={2000}
          onClose={() => setNoSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MuiAlert
            className={classes.successMessage}
            onClose={() => setNoSuccess(false)}
            severity="error"
            variant="filled"
          >
            An Unexpected Error Has Occured. Please Try Again Later.
          </MuiAlert>
        </Snackbar>
        <div className={classes.coverContainer}>
          <div className={classes.cover}>
            <div className={classes.sphere}></div>
            <div className={classes.dotted}>
              <img src="/dotted.svg" alt="dotted" />
            </div>
            <div className={classes.largeDotted}>
              <img src="/dotted.svg" alt="dotted" />
            </div>
            <div className={classes.square}></div>
            <div className={classes.bigCircle}></div>
            <div className={classes.CTASection}>
              <div className={classes.coverHeader}>
                The <span>Free</span> Marketplace for Homebuyers & Sellers
              </div>
              <div className={classes.coverDescription}>
                All the tools you need to find a home you love, or sell your
                home affordably and conveniently
              </div>
              <div className={classes.searchContainer}>
                <SearchBar />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.belowFold}>
          <div className={classes.singleAvatarRoot}>
            <div className={classes.tabs}>
              <div className={classes.tabContainer}>
                <Button
                  fullWidth
                  className={
                    activeTab === "Seller"
                      ? classes.tabActive
                      : classes.tabInactive
                  }
                  onClick={() => {
                    setActiveTab("Seller");
                  }}
                  startIcon={
                    <HomeWorkOutlinedIcon className={classes.tabIcon} />
                  }
                >
                  List and Save Your Equity
                </Button>
              </div>

              <div className={classes.tabContainer}>
                <Button
                  fullWidth
                  className={
                    activeTab === "Buyer"
                      ? classes.tabActive
                      : classes.tabInactive
                  }
                  onClick={() => {
                    setActiveTab("Buyer");
                  }}
                  startIcon={
                    <MonetizationOnOutlinedIcon className={classes.tabIcon} />
                  }
                >
                  Buy and Earn Cashback
                </Button>
              </div>
            </div>
            <div className={classes.singleAvatarRootInner}>
              {activeTab === "Buyer" ? (
                <>
                  <h1 className={classes.centerHeaderSmall}>
                    Earn thousands of dollars in Cashback
                  </h1>

                  <div className={classes.learnMoreHeaderSmall}>
                    <Link href="/learnmore-buyer">
                      Learn more about all the free tools and premium features
                    </Link>
                  </div>
                  <div className={classes.activeBuyerRoot}>
                    <div className={classes.buyerSellerCardContainer}>
                      <div className={classes.buyerSellerCard}>
                        <div className={classes.buyerSellerCardTitle}>
                          Traditional Brokerage Commisions
                        </div>
                        <div className={classes.buyerSellerCardFlexInner}>
                          <div>
                            <div>2.5%</div>
                            <div>Typical Agent</div>
                          </div>
                          <div>
                            <div>0%</div>
                            <div>You Get</div>
                          </div>
                        </div>
                        <div className={classes.buyerSellerCardSub}>
                          <Button
                            onClick={() => {
                              setBuyerDialogOpen(true);
                            }}
                            className={classes.seeBuyerSellerButton}
                          >
                            Calculate Potential Cashback
                          </Button>
                        </div>
                      </div>

                      <div className={classes.buyerSellerCardBlue}>
                        <div className={classes.buyerSellerCardTitleDown}>
                          myHomely Marketplace
                        </div>
                        <div className={classes.buyerSellerCardFlexInnerBlue}>
                          <div>
                            <div>DIY</div>
                            <div>0%</div>
                            <div>No Agent</div>
                          </div>
                          <div>
                            <div>Up To</div>
                            <div className={classes.marginShift}>2.5%</div>
                            <div>You Get</div>
                          </div>
                        </div>
                        <div className={classes.buyerSellerCardSubShort}>
                          <Button
                            onClick={() => {
                              router.push("/buyproperty");
                            }}
                            className={classes.seeBuyerSellerButton}
                          >
                            Browse Homes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog
                    onClose={() => {
                      setBuyerDialogOpen(false);
                    }}
                    open={buyerDialogOpen}
                    classes={{ paper: classes.dialogPaper }}
                  >
                    <div className={classes.sliderContainer}>
                      <div className={classes.sliderTitle}>
                        Potential Cashback
                      </div>
                      <div className={classes.sliders}>
                        <div className={classes.sliderRootLarge}>
                          <div className={classes.sliderSideText}>
                            ${formatCash(buyerSalePrice)}
                          </div>
                          <PrettoSlider
                            orientation="vertical"
                            defaultValue={buyerSalePrice}
                            min={50000}
                            max={2000000}
                            valueLabelFormat={(value) => (
                              <div>{formatCash(value)}</div>
                            )}
                            onChange={(e, val) => {
                              setBuyerSalePrice(val);
                            }}
                          />

                          <div className={classes.sliderSideTextSmall}>
                            Property Sale Price
                          </div>
                        </div>

                        <div className={classes.sliderRoot}>
                          <div className={classes.sliderSideTextCashBack}>
                            {buyerCashBack}%
                          </div>
                          <PrettoSliderBlue
                            orientation="vertical"
                            defaultValue={buyerCashBack}
                            min={0.5}
                            max={5}
                            valueLabelFormat={(value) => (
                              <div>{formatCash(value)}</div>
                            )}
                            onChange={(e, val) => {
                              setBuyerCashBack(val);
                            }}
                            step={0.1}
                          />

                          <div className={classes.sliderSideTextCashBackSmall}>
                            Cash Back
                          </div>
                        </div>
                      </div>

                      <div className={classes.saveYou}>
                        <div>
                          Potential to get{" "}
                          <span>
                            $
                            {formatCash(
                              Math.round((buyerSalePrice * buyerCashBack) / 100)
                            )}
                          </span>{" "}
                          as cashback on myHomely
                        </div>
                      </div>

                      <div className={classes.singleAvatarButtonGroup}>
                        <Button
                          className={classes.firstPriorityButton}
                          onClick={() => {
                            router
                              .push("/buyproperty")
                              .then(() => window.scrollTo(0, 0));
                          }}
                        >
                          Browse Homes
                        </Button>
                      </div>
                    </div>
                  </Dialog>
                </>
              ) : activeTab === "Seller" ? (
                <>
                  <h1 className={classes.centerHeaderSmall}>
                    Save thousands of dollars with commission-free listing
                  </h1>
                  <div className={classes.learnMoreHeaderSmall}>
                    <Link href="/learnmore-seller">
                      Learn more about all the free tools and premium features
                    </Link>
                  </div>
                  <div className={classes.activeBuyerRoot}>
                    <div className={classes.buyerSellerCardContainer}>
                      <div className={classes.buyerSellerCard}>
                        <div className={classes.buyerSellerCardTitle}>
                          Traditional Brokerage Commisions
                        </div>
                        <div className={classes.buyerSellerCardFlexInner}>
                          <div>
                            <div className={classes.marginShift}>2.5%</div>
                            <div className={classes.noSellersAgent}>
                              Typical Seller’s Agent
                            </div>
                          </div>
                          <div>
                            <div className={classes.marginShift}>2.5%</div>
                            <div className={classes.noSellersAgent}>
                              Typical Buyer’s Agent
                            </div>
                          </div>
                        </div>
                        <div className={classes.buyerSellerCardSub}>
                          <Button
                            onClick={() => {
                              setBuyerDialogOpen(true);
                            }}
                            className={classes.seeBuyerSellerButton}
                          >
                            Calculate Potential Savings
                          </Button>
                        </div>
                      </div>

                      <div className={classes.buyerSellerCardBlue}>
                        <div className={classes.buyerSellerCardTitleDown}>
                          myHomely Marketplace
                        </div>
                        <div className={classes.buyerSellerCardFlexInnerBlue}>
                          <div>
                            <div>DIY</div>
                            <div>0%</div>
                            <div className={classes.noSellersAgent}>
                              No Seller’s Agent
                            </div>
                          </div>
                          <div>
                            <div>Up To</div>
                            <div className={classes.marginShift}>2.5%</div>
                            <div className={classes.cashback}>
                              Buyer’s Cashback
                            </div>
                          </div>
                        </div>
                        <div className={classes.buyerSellerCardSubShort}>
                          <Button
                            onClick={() => {
                              router.push("/sellproperty");
                            }}
                            className={classes.seeBuyerSellerButton}
                          >
                            List Your Property
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/*
                     */}
                  </div>
                  <Dialog
                    onClose={() => {
                      setBuyerDialogOpen(false);
                    }}
                    open={buyerDialogOpen}
                    classes={{ paper: classes.dialogPaper }}
                  >
                    <div className={classes.sliderContainer}>
                      <div className={classes.sliderTitle}>
                        Potential Savings with myHomely
                      </div>
                      <div className={classes.slidersSeller}>
                        <div className={classes.sliderRootBigger}>
                          <div className={classes.sliderSideText}>
                            ${formatCash(sellerSalePrice)}
                          </div>
                          <PrettoSlider
                            orientation="vertical"
                            defaultValue={sellerSalePrice}
                            min={50000}
                            max={2000000}
                            valueLabelFormat={(value) => (
                              <div>{formatCash(value)}</div>
                            )}
                            onChange={(e, val) => {
                              setSellerSalePrice(val);
                            }}
                          />

                          <div className={classes.sliderSideTextSmall}>
                            Property Sale Price
                          </div>
                        </div>

                        <div className={classes.sliderRootBigger}>
                          <div className={classes.sliderSideTextCashBack}>
                            {sellerAgent}%
                          </div>
                          <PrettoSliderGreen
                            orientation="vertical"
                            defaultValue={sellerAgent}
                            min={0}
                            max={2.5}
                            valueLabelFormat={(value) => <div>{value}%</div>}
                            onChange={(e, val) => {
                              setSellerAgent(val);
                            }}
                            step={0.1}
                          />

                          <div className={classes.sliderSideTextSmall}>
                            Seller's Agent Commision
                          </div>
                        </div>

                        <div className={classes.sliderRootBigger}>
                          <div className={classes.sliderSideTextCashBack}>
                            {buyerAgent}%
                          </div>
                          <PrettoSliderBlue
                            orientation="vertical"
                            defaultValue={buyerAgent}
                            min={0}
                            max={2.5}
                            valueLabelFormat={(value) => (
                              <div>{formatCash(value)}</div>
                            )}
                            onChange={(e, val) => {
                              setBuyerAgent(val);
                            }}
                            step={0.1}
                          />

                          <div className={classes.sliderSideTextSmall}>
                            Buyer's Agent Commision
                          </div>
                        </div>
                      </div>

                      <div className={classes.saveYou}>
                        <div className={classes.center}>
                          myHomely helps you to save{" "}
                          <span>
                            $
                            {formatCash(
                              Math.round(
                                (sellerSalePrice * (sellerAgent + buyerAgent)) /
                                  100
                              )
                            )}
                          </span>{" "}
                        </div>
                      </div>

                      <div className={classes.singleAvatarButtonGroup}>
                        <Button
                          onClick={() =>
                            router
                              .push("/sellproperty")
                              .then(() => window.scrollTo(0, 0))
                          }
                          className={classes.firstPriorityButtonMargin}
                        >
                          List Your Property
                        </Button>
                      </div>
                    </div>
                  </Dialog>
                </>
              ) : (
                <div>
                  <h1 className={classes.centerHeader}>
                    What is my home worth?
                  </h1>
                  <div className={classes.estimateContainer}>
                    <HomeEstimate />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={classes.worksRoot}>
            <div className={classes.worksHeader}>
              Here's How It <span>Works</span>
            </div>
            <div className={classes.stepContainer}>
              <img
                src="/Homepage/dashedLine.svg"
                className={classes.dashedLineLeft}
              />
              <img
                src="/Homepage/dashedLine.svg"
                className={classes.dashedLineRight}
              />
              <img
                src="/Homepage/dashedLine.svg"
                className={classes.dashedLineInnerRight}
              />
              <img
                src="/Homepage/dashedLine.svg"
                className={classes.dashedLineInnerLeft}
              />

              <img
                src="/Homepage/longerDashedLine.svg"
                className={classes.longerDashedLineLeft}
              />
              <img
                src="/Homepage/longerDashedLine.svg"
                className={classes.longerDashedLineRight}
              />
              <img
                src="/Homepage/longerDashedLine.svg"
                className={classes.longerDashedLineInnerRight}
              />
              <img
                src="/Homepage/longerDashedLine.svg"
                className={classes.longerDashedLineInnerLeft}
              />

              <div className={classes.step1Container}>
                <div className={classes.stepBody}>
                  <div className={classes.imageRoot}>
                    <img
                      className={classes.stepImage}
                      src="/Homepage/step1.svg"
                      alt="Step 1"
                    />
                    <div className={classes.centerSmaller}>
                      <div className={classes.step1Number}>01</div>
                    </div>
                  </div>

                  <div className={classes.stepHeader}>
                    Sellers list their homes for free.
                  </div>
                  <div className={classes.stepDescription}>
                    In less than 5 minutes, sellers list their home for free
                    with the home being immediately visible to active buyers.
                  </div>
                </div>
              </div>

              <div className={classes.step2Container}>
                <div className={classes.stepBody}>
                  <div className={classes.imageRoot}>
                    <img
                      className={classes.stepImage}
                      src="/Homepage/step2.svg"
                      alt="Step 2"
                    />
                    <div className={classes.numberContainer}>
                      <div className={classes.stepCenterNumber}>02</div>
                    </div>
                  </div>

                  <div className={classes.stepHeader}>
                    Buyers search properties.
                  </div>
                  <div className={classes.stepDescription}>
                    Interested buyers contact the seller through built-in tools
                    to ask questions and schedule home tours. Seller safety is
                    ensured throughout with a thorough ID verification process
                    for buyers prior to the home tour.
                  </div>
                </div>
              </div>

              <div className={classes.step3Container}>
                <div className={classes.stepBody}>
                  <div className={classes.imageRoot}>
                    <img
                      className={classes.stepImage}
                      src="/Homepage/step3.svg"
                      alt="Step 3"
                    />
                    <div className={classes.numberContainer}>
                      <div className={classes.step3Number}>03</div>
                    </div>
                  </div>

                  <div className={classes.stepHeader}>
                    Buyers submits offer directly to seller.
                  </div>
                  <div className={classes.stepDescription}>
                    Real-time offers with built-in Q&A style contract generator.
                    Seller and buyer directly negotiate until all terms are
                    agreed to.
                  </div>
                </div>
              </div>

              <div className={classes.step4Container}>
                <div className={classes.stepBody}>
                  <div className={classes.imageRoot}>
                    <img
                      className={classes.stepImage}
                      src="/Homepage/step4.svg"
                      alt="Step 4"
                    />
                    <div className={classes.numberContainer}>
                      <div className={classes.stepCenterNumber}>04</div>
                    </div>
                  </div>

                  <div className={classes.stepHeader}>Offer is accepted</div>
                  <div className={classes.stepDescription}>
                    When all terms are agreed upon, buyers and sellers digitally
                    sign the One-Click Purchase Agreement to easily close the
                    deal.
                  </div>
                </div>
              </div>

              <div className={classes.step5Container}>
                <div className={classes.stepBody}>
                  <div className={classes.imageRoot}>
                    <img
                      className={classes.stepImage}
                      src="/Homepage/step5.svg"
                      alt="Step 5"
                    />
                    <div className={classes.centerSmaller}>
                      <div className={classes.step5Number}>05</div>
                    </div>
                  </div>

                  <div className={classes.stepHeader}>
                    myHomely Helps You in Closing
                  </div>
                  <div className={classes.stepDescription}>
                    myHomely assists you until the deal is closed, so nothing is
                    missed!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Googlemap />
        </div>
        {/*
        <div>
          <Table />
        </div>
      */}

        <div className={classes.noCatchRoot}>
          <div className={classes.noCatchImageContainer}>
            <img src="/Homepage/noCatch.svg" alt="No Catch" />
          </div>
          <div>
            <div className={classes.noCatchHeader}>
              What's the catch? <span>No catch</span> here...
            </div>
            <div className={classes.noCatchMainPara}>
              <div>
                For Sale by Owner has been around a long time, but until now,
                only a few have figured out how to do it properly. That’s where
                myHomely comes in, we are committed to transform how property is
                bought and sold in an open market. For Sellers, there is
                absolutely no need to give away your equity or blow out your
                selling expense in commissions or fees. For Buyers, find the
                home you love at your convenience, negotiate directly to seller
                with no third-party pressure and get paid in cashback to ease
                moving to new home.
              </div>
              <div>
                Join the Revolution Today and Buy and Sell with Ultimate
                Confidence!
              </div>
            </div>

            <div className={classes.buttonContainer}>
              <Button
                onClick={() => router.push("/sellproperty")}
                className={classes.listYourPropertyButton}
              >
                List Your Property
              </Button>
              <Button
                onClick={() => router.push("/buyproperty")}
                className={classes.listYourPropertyButtonOutlined}
              >
                Find Homes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
