import React from "react";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createStyles,
} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button, Dialog } from "@material-ui/core";
import moment from "moment";
import { createMuiTheme } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      fontFamily: "Gilroy, sans-serif",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
      toolbar: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
    MuiPickersCalendarHeader: {
      fontFamily: "Gilroy, sans-serif",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
      switchHeader: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
    MuiPickersDay: {
      fontFamily: "Gilroy, sans-serif",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
      day: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
      daySelected: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
      dayDisabled: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
      current: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
    MuiPickersModal: {
      fontFamily: "Gilroy, sans-serif",
      "& *": {
        fontFamily: "Gilroy, sans-serif",
      },
      dialogAction: {
        fontFamily: "Gilroy, sans-serif",
        "& *": {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  paper: {
    padding: "3rem",
    borderRadius: "0.5rem",
    maxWidth: "45rem",
  },
  root: {
    fontFamily: "Gilroy, sans-serif",
  },
  picker: {
    "& *": {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
  },
  timeInputs: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  },
  dashIconContainer: {
    marginTop: "0.75rem",
    "& > *": {
      color: "grey",
    },
  },
  addTimeButton: {
    marginTop: "0.75rem",
    background: "#249FFB",
    color: "white",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    padding: "1rem",
    "&:hover": {
      background: "#249FFB",
    },
    marginBottom: "1.75rem",
  },
}));

export default function RequestTimeDialog({ open, onClose }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTimeStart, setSelectedTimeStart] = React.useState(new Date());
  const [selectedTimeEnd, setSelectedTimeEnd] = React.useState(new Date());
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.paper }}
      fullWidth
    >
      <div className={classes.root}>
        <ThemeProvider theme={materialTheme}>
          <div className={classes.title}>Request Showing Time</div>
          <div>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Choose Date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disablePast
              className={classes.picker}
              inputVariant="outlined"
            />
          </div>
          <div className={classes.timeInputs}>
            <KeyboardTimePicker
              variant="inline"
              margin="normal"
              label="Choose Opening Time"
              value={selectedTimeStart}
              onChange={(date) => setSelectedTimeStart(date)}
              disablePast
              className={classes.picker}
              inputVariant="outlined"
            />
            <div className={classes.dashIconContainer}>
              <RemoveIcon />
            </div>
            <KeyboardTimePicker
              variant="inline"
              label="Choose Closing Time"
              value={selectedTimeEnd}
              onChange={(date) => setSelectedTimeEnd(date)}
              className={classes.picker}
              inputVariant="outlined"
            />
          </div>
          <div>
            <Button className={classes.addTimeButton}>Request Time</Button>
          </div>
        </ThemeProvider>
      </div>
    </Dialog>
  );
}
