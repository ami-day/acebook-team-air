const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker");

const FriendsController = require("../controllers/friends");

router.post("/", tokenChecker, FriendsController.Create);
router.put("/", tokenChecker, FriendsController.Update);

module.exports = router;
