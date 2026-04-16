import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotWidget from "../ui/ChatbotWidget";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow container mx-auto p-1 md:p-2">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-yellow-100" />

      {/* Chatbot widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
