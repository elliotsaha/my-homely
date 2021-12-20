const { errors } = require("telnyx");
const chatBox = require("../model/chatBox");
const chatRoom = require("../model/chatRoom");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/User");
const SellerListing = require("../model/SellerForm");
const { send } = require("@sendgrid/mail");
var currdatetime = new Date();

exports.saveMessage = async (req, res) => {
  try {
    let chatRoomId = await getChatRoomIdByEamil(
      req.data.senderEmail,
      req.data.buyerEmail,
      req.data.propertyId
    );
    if (req.data.roomId != null || chatRoomId != null) {
      const chatbox = new chatBox({
        roomId: req.data.roomId ? req.data.roomId : chatRoomId.result[0].roomId,
        participant: [req.data.senderEmail, req.data.buyerEmail],
        message: req.data.message,
        file: req.data.file,
        date: currdatetime,
      });
      await chatbox.save();
    } else {
      await addToChatRoom(
        req.data.senderEmail,
        req.data.buyerEmail,
        req.data.propertyId
      );
      let chatRoomId = await getChatRoomIdByEamil(
        req.data.senderEmail,
        req.data.buyerEmail,
        req.data.propertyId
      );
      if (chatRoomId) {
        const chatbox = new chatBox({
          roomId: req.data.roomId
            ? req.data.roomId
            : chatRoomId.result[0].roomId,
          participant: [req.data.senderEmail, req.data.buyerEmail],
          message: req.data.message,
          file: req.data.file,
          date: currdatetime,
        });
        await chatbox.save();
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

exports.getChatList = async (req, res) => {
  try {
    const chatListData = [];
    let senderEmail = req.body.senderEmail;
    let propertyId = req.body.propertyId;
    await getChatRoomId(senderEmail).then(async (rooms) => {
      const awaitFor = async () => {
        for (const room of rooms) {
          await SellerListing.find(
            { _id: room.propertyId },
            {
              query: {
                HouseImages: 1,
                HouseSize: { area: 1 },
                StreetAddress: 1,
                Bedrooms: 1,
                Bathrooms: 1,
                AskingPrice: 1,
              },
            }
          ).then(async (property) => {
            let newUser = {
              property: {
                price: property[0].query.AskingPrice,
                HouseImage: property[0].query.HouseImages[0],
                streetAddress: property[0].query.StreetAddress,
                bedrooms: property[0].query.Bedrooms,
                bathrooms: property[0].query.Bathrooms,
                houseSize: property[0].query.HouseSize,
              },
              roomId: room.roomId,
            };
            chatListData.push(newUser);
          });
        }
      };
      await awaitFor();
      await res.status(200).send({
        data: chatListData,
        status: true,
      });
    });
  } catch (erorr) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

exports.getMessageList = async (req, res) => {
  try {
    let messageData = await chatBox.find({ roomId: req.body.roomId });
    if (messageData) {
      res.status(200).send({
        data: messageData,
        status: true,
      });
    } else {
      res.status(500).send({
        data: [],
        status: false,
        message: "Chat list is empty",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addToChatRoom = async (senderEmail, buyerEmail, propertyId) => {
  const chatroom = new chatRoom({
    roomId: uuidv4(),
    participant: [senderEmail, buyerEmail],
    propertyId: propertyId,
  });
  await chatroom.save();
};

const getChatRoomId = async (senderEmail) => {
  try {
    let result = await chatRoom.find({ participant: senderEmail });
    if (result[0] != null) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const getChatRoomIdByEamil = async (senderEmail, buyerEmail, propertyId) => {
  try {
    let result = await chatRoom.find({
      $and: [
        { propertyId: propertyId },
        { participant: { $all: [senderEmail, buyerEmail] } },
      ],
    });
    if (result[0] != null) {
      return { result: result };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
