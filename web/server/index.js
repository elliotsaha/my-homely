const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const cookieParser = require("cookie-parser");
//Import Routes
const authRoute = require("./routes/auth");
const sellerRoute = require("./routes/seller");
const entryRoute = require("./routes/entry");
const businessRoute = require("./routes/business");
const buyerRoute = require("./routes/buyer");
const eContract = require("./routes/econtract");
const chatRoute = require("./routes/chat");
const photographerRoute = require("./routes/photographer");
const User = require("./model/User");
const cors = require("cors");
const SignrequestClient = require("signrequest-client");
const { saveMessage } = require("./controllers/chatBoxMessages");
const { getChatRoomIdByEamil } = require("./controllers/chatBoxMessages");
const sgMail = require("@sendgrid/mail");
const lib = require("pipedrive");
var socket = require("socket.io");
lib.Configuration.apiToken = "c7c81aac59d171c6056a338df03ad2b6b0ec5a9f";

var corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  optionsSuccessStatus: 200,
  credentials: true,
  httpOnly: true,

  // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser());
app.use("*", cors(corsOptions));
//Connect to DB
mongoose.connect(
  process.env.SECURED_DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Secured Connection to MongoDB");
  }
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(bodyParser.json({ limit: "900mb" }));
app.use(bodyParser.urlencoded({ limit: "900mb", extended: true }));

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/entry", entryRoute);
app.use("/api/business", businessRoute);
app.use("/api/buyer", buyerRoute);
app.use("/api/econtract", eContract);
app.use("/api/chat", chatRoute);
app.use("/api/photographer", photographerRoute);

var connect = app.listen(7000, () => {
  console.log("Server is up");
});

var io = socket(connect, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("/chat/box", async function (data) {
    const result = await saveMessage(data);
    // if (data.roomId == null) {
    //here first get room Id
    //   // socket.emit("/chat/box", data);
    // } else {
    //   // socket.emit("/chat/box", data);
    // }
    socket.emit("/chat/box", data);
  });

  socket.on("typing", function (data) {
    io.sockets.emit("typing", data);
  });
});
