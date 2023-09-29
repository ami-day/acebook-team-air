const User = require("../models/user");
const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.find({ email: req.body.email });
    if (foundUser.length > 0) {
      res
        .status(400)
        .json({ message: "Email exist in the system. Please login" });
    } else {
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(201).json({ message: "OK" });
        }
      });
    }
  },

  Index: (req, res) => {
    User.find().exec((err, users) => {
      if (err) {
        throw err;
      }
      // users.populate("")
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ token, users });
    });
  },

  IndexUser: (req, res) => {
    User.findById(req.user_id)
      .populate({
        path: "friends_array",
        model: "User",
        select: "-password",
      })
      .exec((err, foundUser) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ token, user: foundUser });
      });
  },

  Update: (req, res) => {
    const userId = req.params.id;
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

    User.findByIdAndUpdate(
      userId,
      { photo: photo },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .json({ message: "Avatar photo updated!", newUser: updatedUser });
      }
    );
  },
};

module.exports = UsersController;
