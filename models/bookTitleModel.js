const mongoose = require("mongoose");

const bookTitle = new mongoose.Schema(
  {
    book_title: {
      type: String,
    },
      createdAt: {
      type: { type: Date, default: Date.now },
    },
  },
  { collection: "book_titles" }
);
const BookTitle = mongoose.model("BookTitle", bookTitle);

module.exports = BookTitle;
