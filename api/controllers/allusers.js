const User = require("../models/user");

const AllUsersController = {
    Index: (req, res) => {
        User.find({})
          .exec((err, users) => {
            if (err) {
              throw err;
            }
            res.status(200).json({
              users: users
            });
          });
      },
};

module.exports = AllUsersController;