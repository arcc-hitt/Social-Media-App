import express from "express";
import cors from "cors";
import { login } from "../controllers/auth.js";
import { googleLogin } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Apply the middleware for token verification and CORS handling
// router.use(verifyToken);

router.post("/login", login);
router.post("/google-login", googleLogin);


export default router;
