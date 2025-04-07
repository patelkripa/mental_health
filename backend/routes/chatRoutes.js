import express from "express";
import { getChatResponse } from "../controllers/chatController.js"; // Ensure the controller file exists

const router = express.Router();

// ✅ Chatbot API Route
router.post("/", getChatResponse);

export default router; // ✅ Use ES module export
