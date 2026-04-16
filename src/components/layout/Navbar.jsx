import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { clearUser } from "../../redux/slices/userSlice";
import { cn } from "../../utils/cn";

// Google Fonts (optional)
const Fonts = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Amatic+SC&family=Patrick+Hand&display=swap');
    `}
  </style>
);

export default function Navbar() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", text: "Dashboard" },
    { to: "/training", text: "Training" },
    { to: "/weather", text: "Weather" },
    { to: "/mandi-prices", text: "Mandi Prices" },
    { to: "/profile", text: "Profile" },
  ];

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(clearUser());
      navigate("/login");
    });
  };

  return (
    <>
      <Fonts />
      <div
        className="relative w-full flex items-center justify-center mt-6
        bg-gradient-to-r from-green-200 to-sky-200"
      >
        <NavbarContainer>
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 bg-white bg-opacity-40 rounded-full px-3 py-1 border border-green-200 mr-7"
          >
            <img
              src="public/km logo.jpg"
              alt="Kishan Mitra Logo"
              className="h-10 w-10 rounded-full border-2 border-green-300"
            />
            <span className="font-extrabold text-xl text-green-900 select-none tracking-wide">
              Krishi Mitras
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8 font-semibold text-lg text-green-900">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative group px-3 py-1 rounded-md transition-colors duration-300 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded after:transition-colors after:bg-transparent box-border",
                    isActive
                      ? "bg-green-100 bg-opacity-60 text-green-900 after:bg-green-400"
                      : "text-green-900 hover:bg-green-100 hover:bg-opacity-40 hover:text-sky-700"
                  )
                }
                style={{
                  minWidth: "90px",
                  textAlign: "center",
                }}
              >
                {link.text}
              </NavLink>
            ))}
          </nav>

          {/* User greeting + Logout */}
          <div
            className="flex items-center space-x-10 bg-white bg-opacity-40 rounded-full px-4 py-1 border border-sky-200 box-border ml-12"
          >
            <span className="hidden sm:block text-green-900 font-medium select-none">
              Welcome,{" "}
              <span className="font-bold">
                {user?.displayName?.split(" ")[0]}
              </span>
            </span>
            <button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-green-200 to-sky-200 hover:opacity-90 text-green-900 font-bold py-2 px-6 rounded-xl border-2 border-green-300 transition duration-200 flex items-center gap-2 select-none"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </NavbarContainer>
      </div>
    </>
  );
}

// Floating container with animation
const NavbarContainer = ({ children, className }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "flex items-center justify-between w-full max-w-6xl mx-auto px-10 py-4 rounded-3xl bg-white bg-opacity-60 text-green-900 backdrop-blur-md",
        className
      )}
      style={{ minHeight: "64px" }}
    >
      {children}
    </motion.div>
  );
};
