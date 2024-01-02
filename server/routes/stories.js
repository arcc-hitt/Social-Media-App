import express from "express";
import { getStories, getUserStories, likeStory, addComment } from "../controllers/stories.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getStories);
router.get("/:userId/stories", verifyToken, getUserStories);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeStory);
router.post("/:id/comments", verifyToken, addComment);

export default router;