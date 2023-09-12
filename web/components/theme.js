import { createMuiTheme } from "@material-ui/core";
import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#249FFB",
      gradient: "linear-gradient(to right, #41E58B, #07C55D)",
    },
    secondary: {
      main: "#249FFB",
      gradient: "linear-gradient(to right, #15C7DB, #249FFB)",
      dark: "#08184A",
    },
    extra: {
      grey: "#4C5464",
    },
  },
});

export default theme;

