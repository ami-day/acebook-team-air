const express = require("express");
const JWT = require("jsonwebtoken");
const router = express.Router();

const UsersController = require("../controllers/users");

const tokenChecker = (req, res, next) => {
    let token;
    const authHeader = req.get("Authorization");
  
    if (authHeader) {
      token = authHeader.slice(7);
    }
  
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "auth error" });
      } else {
        req.user_id = payload.user_id;
        next();
      }
    });
  };

  router.post("/", UsersController.Create);
  router.get("/", tokenChecker, UsersController.Index)


module.exports = router;
