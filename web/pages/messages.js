import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { InputBase, Button, Paper, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "2rem",
      marginLeft: "2rem",
    },
    inner: {
      position: "relative",
      marginTop: "6rem",
      paddingRight: "3rem",
      paddingLeft: "10rem",
      paddingBottom: "6rem",
      background: "white",
      borderTopRightRadius: "0.5rem",
      borderBottomRightRadius: "0.5rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      width: "90%",
      height: "75vh",
    },
    innerList: {
      marginTop: "6rem",
      paddingRight: "3rem",
      padding: "1rem",
      background: "#E9F0F3",
      borderTopLeftRadius: "0.5rem",
      borderBottomLeftRadius: "0.5rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      width: "30%",
      height: "75vh",
    },
    inputPaper: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "0.25rem",
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    },
    inputPaperMessage: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "65rem",
      borderRadius: "0.25rem",
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      marginBottom: "-1rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
    },

    inputMessageField: {
      zIndex: 5,
      position: "absolute",
      bottom: "2rem",
    },
    input: {
      width: "100%",
      marginRight: "0.4rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
    },
    searchButton: {
      paddingTop: "0.55rem",
      paddingBottom: "0.55rem",
      paddingRight: "0.75rem",
      paddingLeft: "0.75rem",
      width: "11rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },
  })
);

export default function Messages() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.innerList}>
          <Paper elevation={0} className={classes.inputPaper}>
            <IconButton disableRipple>
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="Search" className={classes.input} />
          </Paper>
        </div>
        <div className={classes.inner}>
          <div className={classes.inputMessageField}>
            <Paper elevation={0} className={classes.inputPaperMessage}>
              <IconButton disableRipple></IconButton>
              <InputBase
                placeholder="Type Your Message ..."
                className={classes.input}
              />
              <Button className={classes.searchButton}>Send</Button>
            </Paper>
          </div>
        </div>
      </div>
    </Layout>
  );
}
