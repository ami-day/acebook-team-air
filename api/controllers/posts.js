const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate([
        "comments",
        {
          path: "comments",
          populate: {
            path: "user",
            model: "User",
            select: "-password",
          },
        },
        {
          path: "user",
          populate: {
            path: "user",
            model: "User",
            select: "-password",
          },
        },
      ])
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);

        res.status(200).json({
          posts: posts,
          token: token,
        });
      });
  },
  Create: async (req, res) => {
    console.log(req.file);
    let photo = "";
    const message = req.body.message;
    if (req.file) {
      photo = req.file.filename;
    }
    const post = new Post({ message, user: req.user_id, photo });
    post.save((err, savedPost) => {
      if (err) {
        throw err;
      }
      savedPost.populate(
        {
          path: "user",
          model: "User",
          select: "-password",
        },
        (err, populatedPost) => {
          const token = TokenGenerator.jsonwebtoken(req.user_id);
          res
            .status(201)
            .json({ message: "OK", token: token, post: populatedPost });
        }
      );
    });
  },

  Update: (req, res) => {
    const id = req.params.id; // get post ID from URL
    /* const newPhoto = req.body.photo; 
      complex to implement so leave for now  */
    const updatedData = {message: req.body.message};  // to hold update (message and/or photo)

    /* .findByIdAndUpdate():
    Params: post id, updatedData, config object to return new post,
    async function that takes in the return data (post) or an error  */
    Post.findByIdAndUpdate(id, updatedData, {new: true}, 
      (err, post) => {  // callback function to handle update result
        if (err){
          console.log(err);
          return res.status(400).json(err);
        }
        else{
            console.log("Post updated");
            return res.status(200).json({message: "OK", post: post})
        }
    },
    )
  },
}

module.exports = PostsController;
