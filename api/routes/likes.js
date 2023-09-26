const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.get("/", LikesController.Index);
router.post("/", LikesController.Create);
router.delete("/", LikesController.Delete);

module.exports = router;
