const Messages = require("../models/messageModel");

exports.getMessages = async (req, res, next) => {
  try {
    // from is the user who sent the message
    // to is the user who received the message
    const { from, to } = req.body;

    // get all messages where from and to are in the users array
    // $all is a mongoose operator is used to check if the array contains all the values and not just one of them
    const messages = await Messages.find({
      users: {
        $all: [from, to]
      },
    }).sort({ updatedAt: 1});

    // return the messages
    // project messages is used to map the messages to the format we want which we can see in the chat component
    const projectedMessages = messages.map(message => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
        createdAt: message.createdAt
      };
    });
    
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    // get the message from the request body
    const { from, to, message } = req.body;
    // create a new message when the user sends a message
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    // return success the message
    if (data) {
      return res.json({ message: "Message added successfully." });
    } else {
      return res.json({ message: "Failed to add message to the database" });
    }
  } catch (ex) {
    next(ex);
  }
};
