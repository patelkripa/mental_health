import React, { useState } from "react";
import axios from "axios";
import "./Ai.css"; // Ensure this file exists

const Ai = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]); // Add user message to history
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/chatbot`, { message: input });

      if (response.data?.response) {
        const botResponse = { sender: "bot", text: response.data.response };
        setMessages((prev) => [...prev, botResponse]); // Add bot response to history
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "🤖 No response received." }]);
      }
    } catch (error) {
      console.error("Chatbot error:", error.response ? error.response.data : error.message);
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error: Unable to connect to AI" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>How Can I Help You?</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            <strong>{msg.sender === "user" ? "You: " : "AI: "}</strong>
            {msg.text}
          </p>
        ))}
        {loading && <p className="bot-msg">🤖 Typing...</p>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default Ai;
