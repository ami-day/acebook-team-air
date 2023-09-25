const User = require("../models/users");

const AllUsersController = {
    Index: (req, res) => {
        User.find({})
          .exec((err, users) => {
            if (err) {
              throw err;
            }
            console.log(users)
            res.status(200).json({
              users: users
            });
          });
      },
};

module.exports = AllUsersController;