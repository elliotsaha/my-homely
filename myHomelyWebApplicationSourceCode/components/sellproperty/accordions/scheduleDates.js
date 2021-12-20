import React from "react";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import RemoveIcon from "@material-ui/icons/Remove";
import { Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import { createMuiTheme } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";

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
  chip: {
    background: "#E8219C",
    color: "white",
    borderRadius: "0.4rem",
    margin: "0.25rem",
    fontWeight: "bold",
    fontFamily: "Gilroy, sans-serif",
    "&:focus": {
      background: "#CA1083",
      color: "white",
    },
  },
}));

export default function ScheduleDates({
  touched,
  errors,
  setFieldValue,
  values,
  handleAccordionNext,
}) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTimeStart, setSelectedTimeStart] = React.useState(new Date());
  const [selectedTimeEnd, setSelectedTimeEnd] = React.useState(new Date());
  const [chipData, setChipData] = React.useState([]);
  const [dateObject, setDateObject] = React.useState([]);

  const onChipDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setDateObject((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  React.useEffect(() => {
    setFieldValue("HomeShowingDates", dateObject);
  }, [dateObject]);

  console.log(values.HomeShowingDates);
  return (
    <div className={classes.root}>
      <ThemeProvider theme={materialTheme}>
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
          <Button
            className={classes.addTimeButton}
            onClick={() => {
              let newChip = {
                key: chipData.length,
                label:
                  moment(selectedDate).format("MMM DD, YY |") +
                  " " +
                  moment(selectedTimeStart).format("h:mm A") +
                  " - " +
                  moment(selectedTimeStart).format("h:mm A"),
              };
              setChipData([newChip, ...chipData]);
              setDateObject([
                {
                  key: chipData.length,
                  day: selectedDate,
                  start: selectedTimeStart,
                  end: selectedTimeEnd,
                },
                ...dateObject,
              ]);
            }}
          >
            Add Time Slot
          </Button>
        </div>
        <div className={classes.chipContainer}>
          {chipData.map((i) => {
            return (
              <Chip
                label={i.label}
                onDelete={onChipDelete(i)}
                className={classes.chip}
              />
            );
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}
