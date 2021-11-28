const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    StartLa: {
      type: Number,
    },
    StartMa: {
      type: Number,
    },
    EndLa: {
      type: Number,
    },
    EndMa: {
      type: Number,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    catogory: String,
    views: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
    StartLocation: {
      type: String,
    },
    EndLocation: {
      type: String,
    },
    MeetTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
