const mongoose = require("mongoose");

const bookTime = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    time: {
      type: Number,
    },
    date: { type: Date, default: Date.now },
  },
  { collection: "books" }
);
const BookTime = mongoose.model("BookTime", bookTime);

module.exports = BookTime;
