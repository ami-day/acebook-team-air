const { post } = require("superagent");
const User = require("../models/user");

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
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(201).json({ message: "OK" });
        }
      });
    }
  },

  Index: (req, res) => {
    User.findById(req.user_id).exec((err, foundUser) => {
      res.status(200).json({
        user: foundUser,
      });
    });
  },

  Update: (req, res) => {
    const userId = req.params.id;
    console.log("req file", req.file);
    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

    console.log("photo", photo);
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
