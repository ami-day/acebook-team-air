const express = require("express");
const router = express.Router();

const FollowController = require("../controllers/friendsarray");

router.post("/", FollowController.Create);

module.exports = router;
