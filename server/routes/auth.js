import express from "express";
import { login, checkEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/check-email", checkEmail);

export default router;