import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import logo from "../assets/new.png";

const AdminLogin = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, token } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        setTimeout(() => navigate("/admin/users"), 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <div className="relative w-full max-w-md p-6 sm:p-8 md:p-10 bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <Link to={"/"} className="flex items-center space-x-2 mb-2">
            <img src={logo} alt="logo" className="w-36 h-auto object-contain" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Visit our official website{" "}
            <a
              href="https://www.pmiusservices.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium underline"
            >
              PMIUS
            </a>{" "}
            for further queries.
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold text-sm uppercase tracking-wide transition transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
          >
            Login
          </button>

          <p className="text-sm font-light text-center text-gray-600 dark:text-gray-400">
            Have a user account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              User Login
            </Link>
          </p>
        </form>

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 rounded-full"></div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AdminLogin;
