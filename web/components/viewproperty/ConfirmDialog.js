import React from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontSize: "1.75rem",
      marginBottom: "0.25rem",
      maxWidth: "20rem",
    },
    paper: {
      fontFamily: "Gilroy, sans-serif",
      borderRadius: "0.75rem",
      padding: "3rem",
    },
    icon: {
      color: "green",
      fontSize: "5rem",
      marginBottom: "0.5rem",
    },
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      fontWeight: "bold",
    },
    time: {
      color: "grey",
    },
  })
);

export default function ConfirmDialog({ open, onClose, sentBy, address }) {
  const classes = useStyles();

  React.useEffect(() => {
    if (open && sentBy) {
      let string =
        moment(open.day).format("MMMM DD, YYYY") +
        " " +
        moment(open.start).format("h:mm A") +
        " - " +
        moment(open.end).format("h:mm A");
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/buyer/sendShowingTime`,
          {
            string: string,
            owner: sentBy,
            address: address,
            day: open.day,
            start: open.start,
            end: open.end,
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [open, sentBy, address]);
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.root}>
        <div className={classes.title}>
          Your Request Has Been Sent To The Owner
        </div>
        <div>
          <CheckCircleOutlineIcon className={classes.icon} />
        </div>
        <div className={classes.time}>
          <div>{moment(open.day).format("MMM DD, YYYY")}</div>
          <div>
            {moment(open.start).format("h:mm A")} -
            {moment(open.end).format("h:mm A")}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
