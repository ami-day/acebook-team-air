const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const likesController = {
  Create: (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const like = new Likes({userId, postId});
    like.save((err) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
            }
          );
        }
    }

module.exports = CommentsController;
