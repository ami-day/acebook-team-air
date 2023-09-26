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
            res.status(201).json({ message: "OK", token: token });

    }
}

module.exports = FollowController;