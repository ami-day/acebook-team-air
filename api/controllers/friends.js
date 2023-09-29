const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const FriendsController = {
  Create: (req, res) => {
    const friendId = req.body.userId;
    User.findByIdAndUpdate(
      req.user_id, // logged in user
      { $addToSet: { friends_array: friendId } },
      { new: true, useFindAndModify: false },
      (error, doc) => {
        if (error) {
          throw error;
        }
        User.findByIdAndUpdate(
          friendId, // user the logged-in user clicked on
          { $addToSet: { friends_array: req.user_id } },
          { new: true, useFindAndModify: false },
          (error) => {
            if (error) {
              throw error;
            }
            User.findById(req.user_id)
              .populate({
                path: "friends_array",
                model: "User",
                select: "-password",
              })
              .exec((err, data) => {
                const token = TokenGenerator.jsonwebtoken(req.user_id);
                res
                  .status(201)
                  .json({ message: "OK", token: token, user: data });
              });
          }
        );
      }
    );
  },

  Update: async (req, res) => {
    await User.findByIdAndUpdate(
      req.user_id,
      { $pull: { friends_array: { $in: [req.body.userId] } } },
      { new: true },
      (error) => {
        if (error) {
          throw error;
        }
        User.findByIdAndUpdate(
          req.body.userId,
          { $pull: { friends_array: { $in: [req.user_id] } } },
          { new: true },
          (error) => {
            if (error) {
              throw error;
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            User.findById(req.user_id).exec((err, data) => {
              res.status(201).json({ message: "OK", token: token, user: data });
            });
          }
        );
      }
    );
  },
};

module.exports = FriendsController;
