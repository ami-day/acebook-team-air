const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

// router.get("/", likesController.Index);
router.post("/", LikesController.Create);

module.exports = router;
