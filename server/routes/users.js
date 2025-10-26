import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET user profile
router.get("/:id", verifyToken, getUserProfile);

// ✅ UPDATE user profile
router.put("/:id", verifyToken, updateUserProfile);

export default router;
