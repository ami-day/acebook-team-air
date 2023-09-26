const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker")

const FollowController = require("../controllers/friendsarray");

router.post("/", tokenChecker, FollowController.Create);
router.put("/", tokenChecker, FollowController.Update);

module.exports = router;
