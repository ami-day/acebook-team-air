const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

// router.get("/", CommentsController.Index);
router.post("/", CommentsController.Create);
router.patch("/:commentId", CommentsController.Update);
router.delete("/:id", CommentsController.Delete);

module.exports = router;
