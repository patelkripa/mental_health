import axios from "axios";
import Chatbot from "../models/chatModel.js"; // Import chatbot collection model

// Handles chatbot response
export const getChatResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "⚠️ Message is required" });
  }

  try {
    console.log(`📢 Sending request to Ollama: ${message}`);

    // Send request to Ollama with streaming enabled
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral", // Adjust model if needed
        prompt: message,
        stream: false, // 🔄 Change to `false` to handle it properly
      }
    );

    // Extract chatbot response
    const botResponse = response.data.response || "🤖 No response received.";

    console.log("✅ Ollama Response:", botResponse);

    // ✅ Save chat conversation to MongoDB (Inside "chatbotCollection")
    const chatEntry = new Chatbot({ userMessage: message, botResponse });
    await chatEntry.save();

    res.json({ response: botResponse });
  } catch (error) {
    console.error("❌ Chatbot API Error:", error.message);
    res.status(500).json({
      error: "⚠️ Failed to get chatbot response. Please try again later.",
    });
  }
};
