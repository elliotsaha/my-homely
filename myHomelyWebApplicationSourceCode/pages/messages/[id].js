import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { authState } from "../../components/states";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";
import CardActions from "@material-ui/core/CardActions";
import { InputBase, Button, Paper, Box, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ReactScrollableFeed from "react-scrollable-feed";
import SendIcon from "@material-ui/icons/Send";
const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_API);

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
      marginTop: "6rem",
      paddingRight: "3rem",
      paddingLeft: "10rem",
      paddingBottom: "6rem",
      background: "white",
      borderTopRightRadius: "0.5rem",
      borderBottomRightRadius: "0.5rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      width: "75%",
      height: "75vh",
    },
    innerList: {
      marginTop: "6rem",
      padding: "1rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      background: "#E9F0F3",
      borderTopLeftRadius: "0.5rem",
      borderBottomLeftRadius: "0.5rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      height: "75vh",
      overflowX: "hidden",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    hidden: {
      display: "none",
    },
    inputPaper: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "0.5rem",
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      marginBottom: "1rem",
    },
    inputPaperMessage: {
      fontFamily: "Gilroy, sans-serif",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      width: "90%",
      borderRadius: "0.25rem",
      height: "3.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      marginBottom: "-1rem",
      boxShadow: "rgb(0 0 0 / 10%) 0px 4px 12px",
      borderRadius: "5rem",
    },

    inputMessageField: {
      zIndex: 5,
      marginTop: "1.5rem",
    },
    messagesControl: {
      height: "55vh",
      width: "90%",
      overflowY: "auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    scrollbar: {
      paddingTop: "1rem",
      height: "80vh",
      overflowX: "hidden",
      overflowY: "scroll",
      marginTop: "-12px",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    leftMessage: {
      background: "#fff",
      margin: "3px",
      display: "flex",
      width: "100%",
    },
    rightMessage: {
      alignSelf: "flex-end",
      background: "#fff",
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
    rightMessageBox: {
      background: "#249FFB",
      padding: "5px",
      margin: "3px",
      position: "relative",
      marginRight: "25px",
      borderRadius: "0.9rem",
      borderBottomRightRadius: "0",
      paddingLeft: "1rem",
      color: "white",
      paddingRight: "1rem",
    },
    leftMessageBox: {
      padding: "5px",
      position: "relative",
      marginLeft: "25px",
      borderRadius: "0.9rem",
      borderBottomLeftRadius: "0",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      color: "black",
      background: "#F3F3F4",
    },
    leftBubble: {
      position: "absolute",
      left: "-25px",
      top: "3px",
      borderTop: "13px solid transparent",
      borderRight: "26px solid #2ad893",
      zIndex: "50",
      borderBottom: "13px solid transparent",
    },
    rightBubble: {
      position: "absolute",
      right: "-25px",
      top: "3px",
      borderTop: "13px solid transparent",
      borderLeft: "26px solid #bae1e7",
      zIndex: "50",
      borderBottom: "13px solid transparent",
    },
    input: {
      width: "100%",
      marginRight: "0.4rem",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "grey",
    },
    searchButton: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      textTransform: "none",
      color: "white",
      background: "#249FFB",
      "&:hover": {
        background: "#249FFB",
      },
    },
    typeMessageFirst: {
      marginTop: "1.5rem",
      color: "#ff6961",
    },
    userIcon: {
      width: "50%",
      display: "flex",
      marginTop: "2px",
      alignItems: "center",
      justifyContent: "space-around",
    },
    listMargin: {
      marginTop: "5px",
    },
    infoPadding: {
      paddingLeft: "3px",
    },
    typing: {
      height: "40px",
    },
    cardRoot: {
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      background: "white",
      borderRadius: "0.75rem",
      marginTop: "0.5rem",
      marginBottom: "1.25rem",
      overflow: "hidden",
      maxWidth: "25rem",
      cursor: "pointer",
      paddingBottom: "1.5rem",
    },
    cardImage: {
      width: "100%",
      height: "12.5rem",
      objectFit: "cover",
    },
    cardPrice: {
      fontSize: "2.25rem",
      marginTop: "-0.25rem",
    },
    cardContent: {
      padding: "1.25rem",
    },
    flexIcons: {
      display: "flex",
    },
    filter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "space-between",
    },
    filterIcon: {
      width: "1.5rem",
    },
    filterText: {
      marginLeft: "0.25rem",
      marginRight: "1rem",
      marginTop: "0.1rem",
      color: "grey",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
    address: {
      fontSize: "1rem",
      marginTop: "0.5rem",
      fontWeight: "600",
    },
    nothingFoundContainer: {
      marginTop: "5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.3rem",
      textAlign: "center",
    },
    nothingFoundHeader: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    welcomeHeader: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    nothingFoundSub: {
      fontSize: "1.2rem",
      marginBottom: "1.1rem",
      color: "grey",
    },

    welcomeSub: {
      fontSize: "1.3rem",
      color: "grey",
    },
    startBrowsing: {
      fontFamily: "Gilroy, sans-serif",
      fontWeight: "bold",
      color: "white",
      background: "#249FFB",
      textTransform: "none",
      padding: "1.25rem",
      "&:hover": {
        background: "#249FFB",
      },
    },
  })
);

export default function HomeEstimate() {
  const router = useRouter();
  const classes = useStyles();
  const authLocalState = useRecoilValue(authState);
  const [chatListData, setchatListData] = useState(null);
  const [messageListData, setMessageListData] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setfile] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const [typingInput, setTypingInput] = useState(false);

  useEffect(() => {
    if (authLocalState !== null && authLocalState.auth === false) {
      router.push("/login");
    }
  }, [authLocalState]);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("socket connected successfully");
    });

    if (authLocalState && authLocalState?.user?.email) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/chat/getChatList`,
          {
            senderEmail: authLocalState?.user?.email,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setchatListData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [authLocalState]);

  useEffect(() => {
    getMessages(router.query.id ? router.query.id : null, "useEffect");
  }, [router.query.id]);

  const [typeMessageFirst, setTypeMessageFirst] = useState(false);
  const submitMessage = () => {
    if (message.length == 0) {
      setTypeMessageFirst(true);
    } else {
      setTypeMessageFirst(false);
      let data = {
        roomId: messageListData ? messageListData[0].roomId : null,
        senderEmail: authLocalState.user.email,
        buyerEmail:
          messageListData[0].participant[0] == authLocalState.user.email
            ? messageListData[0].participant[1]
            : messageListData[0].participant[0],
        message: message,
        file: file,
      };
      let obj = {
        roomId: messageListData[0].roomId,
        participant: [
          authLocalState.user.email,
          messageListData[0].participant[0] == authLocalState.user.email
            ? messageListData[0].participant[1]
            : messageListData[0].participant[0],
        ],
        message: message,
      };
      let temp = messageListData;
      temp.push(obj);
      setMessageListData(temp);
      socket.emit("/chat/box", { data });
      socket.on("/chat/box", (data) => {
        if (authLocalState.user.email != data.data.senderEmail) {
          let obj2 = {
            roomId: data.data[0],
            participant: [data.data.senderEmail, data.data.buyerEmail],
            message: data.data.message,
          };
          let temp2 = messageListData;
          temp2.push(obj2);
          setMessageListData(temp2);
        }
      });
      setMessage("");
    }
  };

  const getMessages = (roomId, type) => {
    if (roomId !== "list") {
      setTypingInput(true);
      if (type == "click") {
        router.push("/messages/" + roomId);
      }
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/chat/getMessageList`,
          {
            roomId: roomId,
          },
          { withCredentials: true }
        )
        .then((messages) => {
          setMessageListData(messages.data.data);
        });
    } else if (roomId == "list") {
      setTypingInput(false);
    }
  };

  const typingFeedBack = (status) => {
    let typingData = {
      roomId: messageListData[0].roomId,
      senderEmail: authLocalState.user.email,
      status: status,
    };
    socket.emit("typing", { typingData });
    socket.on("typing", (resData) => {
      if (
        authLocalState.user.email != resData.typingData.senderEmail &&
        resData.typingData.roomId == messageListData[0].roomId
      ) {
        setTypingStatus(resData.typingData.status);
      }
    });
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={chatListData ? classes.innerList : null}>
          {chatListData != null ? (
            chatListData.map((chat, index) => (
              <div
                onClick={() => {
                  getMessages(chat.roomId, "click");
                }}
                className={classes.cardRoot}
              >
                <img
                  className={classes.cardImage}
                  src={
                    chat?.property?.HouseImage
                      ? chat?.property?.HouseImage
                      : null
                  }
                  alt="house"
                />
                <div className={classes.cardContent}>
                  <div className={classes.cardPrice}>
                    $
                    {chat?.property?.price
                      ? chat?.property?.price.toLocaleString("en")
                      : "00000"}
                  </div>

                  <div className={classes.flexIcons}>
                    <div className={classes.filter}>
                      <img
                        src="/Icons/bed.svg"
                        alt="bed"
                        className={classes.filterIcon}
                      />
                      <span className={classes.filterText}>
                        {chat?.property?.bedrooms
                          ? chat?.property?.bedrooms
                          : 0}{" "}
                        Beds
                      </span>
                    </div>
                    <div className={classes.filter}>
                      <img
                        src="/Icons/bath.svg"
                        alt="bath"
                        className={classes.filterIcon}
                      />
                      <span className={classes.filterText}>
                        {chat?.property?.bathrooms
                          ? chat?.property?.bathrooms
                          : null}{" "}
                        Baths
                      </span>
                    </div>
                    <div className={classes.filter}>
                      <img
                        src="/Icons/sqft.svg"
                        alt="sqft"
                        className={classes.filterIcon}
                      />
                      <span className={classes.filterText}>
                        {parseFloat(
                          chat?.property?.houseSize?.area.toFixed(2)
                        ).toLocaleString("en")}{" "}
                        sqft
                      </span>
                    </div>
                  </div>

                  <div className={classes.address}>
                    {chat?.property?.streetAddress
                      ? chat?.property?.streetAddress
                      : "null"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Paper color="text.primary">{/* <h1>Data Not Found</h1> */}</Paper>
          )}
        </div>
        <div className={classes.inner}>
          <CardActions className={classes.typing}>
            {typingStatus == true ? (
              <Button size="small" color="primary">
                Typing ...
              </Button>
            ) : (
              <Button size="small" color="primary"></Button>
            )}
          </CardActions>
          <div className={`${classes.messagesControl} hideScrollbar`}>
            <ReactScrollableFeed className={classes.scrollbar}>
              {messageListData != null ? (
                messageListData.map((msg, index) =>
                  authLocalState.user.email == msg.participant[0] ? (
                    <div key={index} className={classes.rightMessage}>
                      <div className={classes.rightMessageBox}>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className={classes.leftMessage}>
                      <div className={classes.leftMessageBox}>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  )
                )
              ) : chatListData != null ? (
                <div className={classes.nothingFoundContainer}>
                  <div className={classes.welcomeHeader}>Welcome</div>
                  <div className={classes.welcomeSub}>
                    Select a Property on the Left to Get Started
                  </div>
                </div>
              ) : (
                <div className={classes.nothingFoundContainer}>
                  <div className={classes.nothingFoundHeader}>
                    No Messages Yet
                  </div>
                  <div className={classes.nothingFoundSub}>
                    Start chatting with Others as a buyer and you will be able
                    to see their properties on the left hand side
                  </div>
                  <div>
                    <Button
                      onClick={() => router.push("/buyproperty")}
                      className={classes.startBrowsing}
                    >
                      Start Chat
                    </Button>
                  </div>
                </div>
              )}
            </ReactScrollableFeed>
          </div>
          <div className={classes.inputMessageField}>
            {typingInput == true ? (
              <Paper
                elevation={0}
                className={classes.inputPaperMessage}
                display="none"
              >
                <IconButton disableRipple></IconButton>
                <InputBase
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      submitMessage();
                    }
                  }}
                  placeholder="Type Your Message..."
                  className={classes.input}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={() => {
                    typingFeedBack(true);
                  }}
                  onKeyUp={() => {
                    typingFeedBack(false);
                  }}
                />
                <IconButton
                  className={classes.searchButton}
                  onClick={() => {
                    submitMessage();
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            ) : (
              <div></div>
            )}
            <div className={classes.typeMessageFirst}>
              {typeMessageFirst ? "Please Type Your Message First" : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
