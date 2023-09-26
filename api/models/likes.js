const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: { type: String },
  commentId: { type: String },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
