const {Schema, model} = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Messages", MessageSchema);
