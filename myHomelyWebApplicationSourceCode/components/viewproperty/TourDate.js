import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { DatePicker } from "@material-ui/pickers";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "Gilroy, sans-serif",
      position: "relative",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      width: "14rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#08184A",
      borderRadius: "1.2rem",
      height: "16.5rem",
    },
    inner: {},
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1rem",
    },
    icon: {
      fontSize: "2rem",
    },
    header: {
      fontFamily: "inherit",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    input: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
      width: "9rem",
    },
    calenderTextField: {
      marginBottom: "2rem",
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      background: "#08184A",
      color: "white",
      fontFamily: "inherit",
      fontWeight: "bold",
      textTransform: "none",
      padding: "0.9rem",
      "&:hover": {
        background: "#08184A",
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "1.2rem",
    },
  })
);

const overwriteCalander = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {},
    },
    MuiPickersDay: {
      fontFamily: "Gilroy, sans-serif",
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue["400"],
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        color: lightBlue["900"],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue["400"],
      },
    },
  },
});

export default function TourDate({ data }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.iconContainer}>
          <EventIcon className={classes.icon} />
        </div>
        <Typography variant="h6" className={classes.header}>
          Schedule Tour
        </Typography>
        <div className={classes.calenderTextField}>
          <ThemeProvider theme={overwriteCalander}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              InputProps={{ className: classes.input }}
              // TODO: make disabled date if not matching to database date
              // shouldDisableDate={(day) => {
              //   disableDay(day.getUTCDate);
              // }}
            />
          </ThemeProvider>
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.button}>Confirm Date</Button>
        </div>
      </div>
    </div>
  );
}
