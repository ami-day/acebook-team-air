const TokenGenerator = require("../lib/token_generator");
const Like = require("../models/likes");

const LikesController = {
  Create: (req, res) => {
    console.log("req.body", req.body);
    let likeData = {
      userId: req.body.userId,
    };
    let filter = {};

    if (req.body.postId) {
      likeData["postId"] = req.body.postId;
      filter = { postId: req.body.postId };
    } else if (req.body.commentId) {
      likeData["commentId"] = req.body.commentId;
      filter = { commentId: req.body.commentId };
    }
    console.log("likeData", likeData);

    const like = new Like(likeData);
    like.save((err) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      Like.find(filter, (error, data) => {
        res.status(201).json({ message: "OK", token: token, likes: data });
      });
    });
  },
  Index: (req, res) => {
    console.log(req.query);
    let filter = {};

    if (req.query.postId) {
      filter = { postId: req.query.postId };
    } else if (req.query.commentId) {
      filter = { commentId: req.query.commentId };
    }
    console.log("filter", filter);
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    Like.find(filter, (error, data) => {
      console.log(data);
      res.status(201).json({ message: "OK", token: token, likes: data });
    });
  },
};

module.exports = LikesController;
