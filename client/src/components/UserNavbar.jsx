import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";
import logo from "../assets/new.png";

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const navLinks = [
    { path: "/courses", label: "Courses" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md dark:bg-gray-900/80 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-9 w-auto" alt="PMIUS Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 shadow-sm dark:focus:ring-blue-800 transition-all"
          >
            Logout
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex md:hidden items-center justify-center p-2 w-10 h-10 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-md transition-all"
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-2 text-sm font-medium ${
                  location.pathname === link.path
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </nav>
  );
};

export default UserNavbar;
