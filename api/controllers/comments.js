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


  Update: (req, res) => {
    console.log("req.params", req.params); // log commentId
    console.log("req.body:", req.body) // log updated comment content hopefully
    
    const commentId = req.params.commentId; // get comment ID from URL
    const updatedData = {content: req.body.content}; // to hold update (comment content)

    /* .findByIdAndUpdate():
    Params: comment id, updatedData, config object to return new post,
    async function that takes in the return data (post) or an error  */
    Comment.findByIdAndUpdate(commentId, updatedData, {new: true, useFindAndModify: false}, 
      (err, updatedData) => {  // callback function to handle update result
        if (err){
          console.log(err);
          return res.status(400).json(err);
        }
        else{
            console.log("Comment updated with:", updatedData);
            return res.status(200).json({message: "OK", comment: updatedData})
        };
    }
    );
  },


  Delete: async (req, res) => {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId).exec((err, id) => {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "OK", token: token });
    });
  },
};

module.exports = CommentsController;
