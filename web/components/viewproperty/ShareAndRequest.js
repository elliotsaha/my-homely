import React from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import StarIcon from "@material-ui/icons/Star";
import Dialog from "@material-ui/core/Dialog";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Moment from "react-moment";
import { isMobile, isTablet } from "react-device-detect";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingLeft: "3rem",
      paddingRight: "3rem",
    },
    shareSave: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      flexDirection: "row",
    },
    request: {},
    button: {
      background: "#fafafa",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      color: "#08184A",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      "&:hover": {
        background: "#e6e6e6",
      },
    },
    dialogRoot: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "hidden",
    },
    dialogHeader: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
      paddingRight: "5rem",
      paddingLeft: "5rem",
      paddingTop: "1rem",
      paddingBottom: "0.5rem",
      color: "#08184A",
    },
    dialogHr: {
      width: "100%",
    },
    dialogSub: {
      padding: "0.5rem",
      paddingBottom: "1rem",
      paddingLeft: "0.9rem",
      fontWeight: "bold",
      fontSize: "1.25rem",
      color: "#08184A",
    },
    dialogToggleContainer: {
      gap: "1rem",
      display: "flex",
      paddingLeft: "0.9rem",
      alignItems: "center",
      width: "100%",
      paddingBottom: "1rem",
    },
    activeAppointment: {
      width: "9rem",
      background: "#08184A",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      "&:hover": {
        background: "#08184A",
        color: "white",
      },
    },
    notSelectedAppointment: {
      width: "9rem",
      background: "#f6f6f6",
      color: "#08184A",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    carousel: {
      position: "relative",
      marginLeft: "1.5rem",
      marginRight: "1.5rem",
      width: "20rem",
    },
    // TODO: Fix styling problem on modal launch
    dateBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "6rem",
      marginBottom: "1.5rem",
      width: "7rem",
      flexDirection: "column",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      boxShadow:
        "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
    },

    dateBoxActive: {
      display: "flex",
      height: "6rem",

      marginBottom: "1.5rem",
      boxShadow:
        "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
      justifyContent: "center",
      alignItems: "center",
      background: "#08184A",
      width: "7rem",
      color: "white",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      flexDirection: "column",
    },
    selectTime: {
      width: "12rem",
      marginLeft: "0.9rem",
    },
    timeSelect: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "#08184A",
    },
    timeMenuItem: {
      color: "#08184A",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    requestTourButton: {
      background: "#08184A",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        background: "#08184A",
      },
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      width: "100%",
    },
    buttonAbsoluteLeft: {
      position: "absolute",
      top: "2rem",
      left: "-1.8rem",
      "& > *": {
        color: "#08184A",
      },
    },

    buttonAbsoluteRight: {
      position: "absolute",
      top: "2rem",
      right: "-1.8rem",
      "& > *": {
        color: "#08184A",
      },
    },
    requestTourButtonContainer: {
      marginTop: "1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "1rem",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
  })
);

// MUI Dialog

function RequestPrivateInspection(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [appointmentType, setAppointmentType] = React.useState("in-person");

  // Carousel

  const [activeDate, setActiveDate] = React.useState(0);

  const responsive = {
    all: {
      breakpoint: { max: 6000, min: 0 },
      items: 3,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
    const { totalItems, currentSlide } = carouselState;
    return (
      <div className="custom-button-group">
        <div className={classes.buttonAbsoluteLeft}>
          <IconButton onClick={() => previous()}>
            <ChevronLeftRoundedIcon />
          </IconButton>
        </div>

        <div className={classes.buttonAbsoluteRight}>
          <IconButton onClick={() => next()}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  const dates = [
    {
      date: new Date("Febuary 4 2021"),
      times: ["2:00 AM", "9:00 PM", "10:00 PM"],
    },
    {
      date: new Date("Febuary 9 2021"),
      times: ["6:00 AM", "2:00 PM", "10:00 PM"],
    },
    {
      date: new Date("Febuary 12 2021"),
      times: ["3:00 AM", "9:00 PM", "10:00 PM"],
    },
    {
      date: new Date("Febuary 15 2021"),
      times: ["9:00 AM", "9:00 PM", "10:00 PM"],
    },
  ];

  const [time, setTime] = React.useState(dates[activeDate].times[0]);
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.dialogRoot}>
        <div className={classes.dialogHeader}>Request a Tour</div>
        <hr className={classes.dialogHr} />
        <div className={classes.dialogSub}>Select an appointment type</div>
        <div className={classes.dialogToggleContainer}>
          <div>
            <Button
              className={
                appointmentType === "in-person"
                  ? classes.activeAppointment
                  : classes.notSelectedAppointment
              }
              onClick={() => {
                setAppointmentType("in-person");
              }}
            >
              In Person
            </Button>
          </div>

          <div>
            <Button
              className={
                appointmentType === "video-chat"
                  ? classes.activeAppointment
                  : classes.notSelectedAppointment
              }
              onClick={() => {
                setAppointmentType("video-chat");
              }}
            >
              Video Chat
            </Button>
          </div>
        </div>

        <div className={classes.dialogSub}>Select an Date</div>
        {/*TODO: Add custom button group*/}
        <div className={classes.carousel}>
          <Carousel
            swipeable={false}
            arrows={false}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={isMobile || isTablet ? true : false}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            customButtonGroup={<ButtonGroup />}
            renderButtonGroupOutside={true}
            className={classes.carouselInner}
          >
            {dates.map((i, index) => {
              return (
                <Button
                  className={classes.dateContainer}
                  fullWidth
                  onClick={() => {
                    setActiveDate(index);
                    setTime(dates[index].times[0]);
                  }}
                >
                  <div
                    key={index}
                    className={
                      index === activeDate
                        ? classes.dateBoxActive
                        : classes.dateBox
                    }
                  >
                    <div>
                      <Moment format="ddd">{i.date}</Moment>
                    </div>
                    <div>
                      <Moment format="MMM D">{i.date}</Moment>
                    </div>
                  </div>
                </Button>
              );
            })}
          </Carousel>
        </div>
        <div>
          <div className={classes.dialogSub}>Select a Time</div>
          <div>
            <FormControl className={classes.selectTime}>
              <Select
                className={classes.timeSelect}
                variant="outlined"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={time}
              >
                {dates[activeDate].times.map((i) => {
                  return (
                    <MenuItem className={classes.timeMenuItem} value={i}>
                      {i}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={classes.requestTourButtonContainer}>
          <Button
            autoFocus
            onClick={handleClose}
            className={classes.requestTourButton}
          >
            Request This Time
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default function ShareAndRequest() {
  const classes = useStyles();
  // Request Inspection
  const [requestOpen, setReqeustOpen] = React.useState(false);

  const handleRequestOpen = () => {
    setReqeustOpen(true);
  };

  const handleRequestClose = () => {
    setReqeustOpen(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <RequestPrivateInspection
          open={requestOpen}
          onClose={handleRequestClose}
        />
        <Button
          className={classes.button}
          startIcon={<TodayIcon />}
          onClick={handleRequestOpen}
        >
          Request Private Inspection
        </Button>
      </div>
      <div className={classes.shareSave}>
        <div>
          <Button className={classes.button} startIcon={<ShareIcon />}>
            Share
          </Button>
        </div>
        <div>
          <Button className={classes.button} startIcon={<StarIcon />}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
