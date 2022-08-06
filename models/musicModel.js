const { Schema, model } = require("mongoose");

const songData = Schema({
    "id": Number,
    "songName": String,
    "filePath": String,
    "coverPath": String,
});

const Song = new model("songdatas", songData);

module.exports = Song;
