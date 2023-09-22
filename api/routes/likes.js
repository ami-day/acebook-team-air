const express = require("express");
const router = express.Router();

const likesController = require("../controllers/likes");

// router.get("/", likesController.Index);
router.post("/", likesController.Create);

module.exports = router;
