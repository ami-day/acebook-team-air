const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const FollowController = {
    Create: async (req, res) => {
        const userId = req.body.userId;
        await User.findByIdAndUpdate(
            req.user_id, // logged in user
            { $push: { friends_array: userId } },
            { new: true, useFindAndModify: false },
            (error) => {
                if (error) {
                    throw error;
                }
            })
        await User.findByIdAndUpdate(
            userId, // user the logged-in user clicked on
            { $push: { friends_array: req.user_id } },
            { new: true, useFindAndModify: false },
            (error) => {
                if (error) {
                    throw error;
                }
            })
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        await User.findById(req.user_id).exec((err, data) => {
            res.status(201).json({ message: "OK", token: token, user: data })
        });
    },

    Update: async (req, res) => {

        await User.findByIdAndUpdate(
            req.user_id,
            { $pull: { friends_array: { $in: [req.body.userId] }  }},
            { new: true },
            (error) => {
              if (error) {
                throw error;
              }
            }
        ),
        await User.findByIdAndUpdate(
            req.body.userId,
            { $pull: { friends_array: { $in: [req.user_id] }  }},
            { new: true },
            (error) => {
              if (error) {
                throw error;
              }
            }
        )

        const token = TokenGenerator.jsonwebtoken(req.user_id);
        await User.findById(req.user_id).exec((err, data) => {
            res.status(201).json({ message: "OK", token: token, user: data })
        });
      }

};

module.exports = FollowController;