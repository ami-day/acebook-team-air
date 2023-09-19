const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
