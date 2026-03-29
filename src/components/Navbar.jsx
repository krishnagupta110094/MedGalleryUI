import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store/slices/authSlice";
import BASE_URL from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth); // get user from Redux

  // Define links based on user login state
  const links = user
    ? [
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  return (
    <nav className="w-full bg-[#FFFFFF] shadow-md px-6 py-4 flex items-center justify-between  fixed z-200">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer"
      >
        <img
          className="h-[35px] w-[136px]"
          src="https://medicate.peacefulqode.co.in/wp-content/themes/medicate/assets/img/logo.png"
          alt="Logo"
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <span
            key={link.name}
            onClick={() => navigate(link.path)}
            className="cursor-pointer text-[#225082] hover:text-[#2490EB] font-medium transition-colors duration-200"
          >
            {link.name}
          </span>
        ))}

        {/* Logout button if user exists */}
        {user && (
          <button
            onClick={async () => {
              try {
                await axios.post(
                  `${BASE_URL}/auth/logout`,
                  {},
                  { withCredentials: true },
                );
              } catch (err) {
                console.error("Logout API failed", err);
              }
              dispatch(logout());
              navigate("/");
            }}
            className="bg-[#2490EB] text-white px-3 py-1 rounded hover:bg-[#225082] transition-colors duration-200"
          >
            Logout
          </button>
        )}
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#225082] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-[#FFFFFF] shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className="w-[90%] text-[#225082] hover:text-[#2490EB] font-medium py-2 border-b border-gray-200 transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}

          {/* Mobile logout button */}
          {user && (
            <button
              onClick={() => {
                document.cookie = "token=; Max-Age=0; path=/;";
                document.cookie = "refreshToken=; Max-Age=0; path=/;";
                dispatch(logout());
                navigate("/");
                setIsOpen(false);
              }}
              className="w-[90%] bg-[#2490EB] text-white py-2 rounded hover:bg-[#225082] transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
