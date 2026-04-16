import { useState, useEffect, useRef } from "react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I’m your Krishi Mitras Assistant 🌾. How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatboxRef = useRef(null);
  const recognitionRef = useRef(null);

  // Sample farmer FAQs (rule-based chatbot)
  const faqResponses = {
    "best crop for my farm": "Based on general conditions, wheat and paddy are great choices for your soil type. 🌱",
    "fertilizer for wheat": "Urea and DAP are recommended for wheat crops. Apply in 3 stages for best results. 🌾",
    "weather today": "Please check the Weather section in the app 🌦️. It shows live updates for your location.",
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  // Text-to-Speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  };

  // Find response from FAQs
  const findBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    for (let key in faqResponses) {
      if (lowerMsg.includes(key)) {
        return faqResponses[key];
      }
    }
    return "Sorry, I don’t have an answer for that. Please try asking something else 🙏";
  };

  // Handle user input
  const handleSendMessage = async (text) => {
    const userMessage = text.trim();
    if (userMessage === "") return;

    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInputValue("");
    setIsBotTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findBotResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      speak(botResponse);
      setIsBotTyping(false);
    }, 2000); // 2 sec delay before bot replies
  };

  const toggleListen = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-green-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
      <header className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-lg">
        <h3 className="font-bold">Krishi Mitras Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="font-bold text-xl">
          &times;
        </button>
      </header>
      <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-green-500 text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {isBotTyping && (
          <div className="text-left mb-3">
            <span className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
              Typing...
            </span>
          </div>
        )}
      </div>

      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ask something..."
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="p-3 bg-green-600 text-white rounded-r-md"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
