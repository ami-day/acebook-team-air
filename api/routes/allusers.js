const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker")

const AllUsersController = require("../controllers/allusers");

router.get("/", tokenChecker, AllUsersController.Index)


module.exports = router;