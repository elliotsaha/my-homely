import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import io from "socket.io-client";

// KEEP ENV VAR OR ELSE IT WONT WORK ON WEBSITE
const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_API);

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      borderRadius: "0.5rem",
    },
    dialog: {
      fontFamily: "Gilroy, sans-serif",
    },
    inputProps: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
    },
    clearButton: {
      color: "grey",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      padding: "1rem",
    },
    sendButton: {
      background: "#249FFB",
      color: "white",
      fontWeight: "bold",
      fontFamily: "Gilroy, sans-serif",
      padding: "1rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
  })
);
export default function chatDialog({
  senderEmail,
  buyerEmail,
  propertyId,
  state,
  setState,
}) {
  useEffect(() => {
    socket.on("connection", () => {
      console.log("socket connected successfully");
    });
  }, []);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [roomId, setroomId] = useState(null);
  const [file, setfile] = useState([]);
  const submitMessage = () => {
    if (message.length == 0) {
      setError("Text field is not null");
    } else {
      setError("");
      let data = {
        roomId: roomId,
        senderEmail: senderEmail,
        propertyId,
        buyerEmail: buyerEmail,
        message: message,
        file: file,
      };
      socket.emit("/chat/box", { data });
      socket.on("/chat/box", (data) => {});
      setMessage("");
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={state}
        onClose={() => setState(false)}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="form-dialog-title" className={classes.dialog}>
          Send Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialog}>
            You are sending message to the selected seller.
          </DialogContentText>
          <TextField
            variant="outlined"
            autoFocus
            id="message"
            label="Message"
            type="text"
            InputLabelProps={{
              className: classes.inputProps,
            }}
            InputProps={{
              className: classes.inputProps,
            }}
            value={message}
            fullWidth
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <p>{error}</p>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.clearButton}
            onClick={() => {
              setMessage("");
            }}
            color="primary"
          >
            Clear
          </Button>
          <Button
            className={classes.sendButton}
            onClick={() => {
              submitMessage();
            }}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
