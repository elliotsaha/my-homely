import React from "react";
import Layout from "../components/layout";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
    },
  })
);
export default function CopyrightPolicy() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}></div>
    </Layout>
  );
}
