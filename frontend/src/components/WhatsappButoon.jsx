import React, { useState } from "react";
import { FaWhatsapp, FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function WhatsappButoon() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your AI Larnik Assistant, how can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          type: "user",
          text: inputValue,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setInputValue("");
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            type: "bot",
            text: "Thank you for your message! Our team will get back to you soon. For immediate assistance, please contact us via WhatsApp.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <HiSparkles className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">AI Larnik Assistant</h3>
                <p className="text-green-100 text-sm">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                    message.type === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.type === "user" ? "text-green-200" : "text-gray-400"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your query...."
                className="flex-1 bg-gray-100 text-gray-800 placeholder-gray-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm border border-gray-200"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200 focus:outline-none"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-row gap-4 z-50">
        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/918069640418"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:bg-green-600 transition-all duration-200"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={30} />
        </a>
        {/* AI Chatbot Icon */}
        <button
          className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:bg-green-600 transition-all duration-200 focus:outline-none"
          aria-label="AI Chatbot"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <FaTimes size={24} /> : <FaComments size={28} />}
        </button>
      </div>
    </>
  );
}
