const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/tokenChecker")

const UsersController = require("../controllers/users");


  router.post("/", UsersController.Create);
  router.get("/", tokenChecker, UsersController.Index)


module.exports = router;
