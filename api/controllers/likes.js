const TokenGenerator = require("../lib/token_generator");
const Like = require("../models/likes");

const LikesController = {
  Create: async (req, res) => {
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
    // wait for the data to enter database and then find()
    await Like.find(likeData, (error, data) => {
      if (data.length === 0) {
        const like = new Like(likeData);
        // changed this to an async function to fix bug with data appearing on frontend
        like.save( async (err) => { 
          if (err) {
            throw err;
          }
          // Filter likes data either by postID or commentID
          await Like.find(filter, (error, data) => {
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: "OK", token: token, likes: data });
          });
        });
      }
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

  Delete: async (req, res) => {
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
    await Like.deleteOne(likeData); 
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    Like.find(filter, (error, data) => {
      console.log(data);
      res.status(201).json({ message: "OK", token: token, likes: data });
    });
  }
};

module.exports = LikesController;
