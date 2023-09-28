const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const CommentsController = {
  Create: (req, res) => {
    const content = req.body.content;
    const postId = req.body.postId;
    const comment = new Comment({ content, user: req.user_id });
    comment.save((err, createdComment) => {
      if (err) {
        throw err;
      }
      // add to post
      Post.findByIdAndUpdate(
        postId,
        { $push: { comments: createdComment._id } },
        { new: true, useFindAndModify: false },
        (error) => {
          if (error) {
            throw error;
          }

          // add to user
          User.findByIdAndUpdate(
            req.user_id,
            { $push: { comments: createdComment._id } },
            { new: true, useFindAndModify: false },
            async (error) => {
              if (error) {
                throw error;
              }
              await createdComment
                .populate({
                  path: "user",
                  model: "User",
                  select: "-password",
                })
                .execPopulate();
              const token = TokenGenerator.jsonwebtoken(req.user_id);
              res
                .status(201)
                .json({ message: "OK", token: token, comment: createdComment });
            }
          );
        }
      );
    });
  },
};

module.exports = CommentsController;
