import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCheckbox from "../components/CustomCheckbox";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

const UpdateUser = () => {
  const location = useLocation();
  const [examsData, setExamsData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    _id: location.state._id,
    email: location.state.email,
    username: location.state.username,
    password: location.state.password,
  });

  const [exams, setExams] = useState([]);
  const [statuses, setStatuses] = useState(location.state.orderStatus);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleStatus = (id) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, completed: !status.completed } : status
      )
    );
  };

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    setUserInfo((prev) => ({ ...prev, password }));
  };

  const handleCheckboxChange = (id, isChecked) => {
    setExams((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const containsObject = (obj, item) => {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].examId === item) return { flag: true, id: i };
    }
    return { flag: false, id: -1 };
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const { _id, email, username, password } = userInfo;
    if (!email || !username || !password) {
      return handleError("Email, username, and password are required");
    }

    const formattedExams = exams.map((item) => {
      const { flag, id } = containsObject(location.state.exams, item);
      if (flag) {
        return {
          examId: location.state.exams[id].examId,
          score: location.state.exams[id].score,
          status: location.state.exams[id].status,
        };
      } else {
        return { examId: item, score: 0, status: false };
      }
    });

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id, email, username, password, exams: formattedExams, orderStatus: statuses }),
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/admin/users"), 1000);
      } else handleError(result.message);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExamsData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/exams`;
      const headers = { headers: { token: localStorage.getItem("token") } };
      const response = await fetch(url, headers);
      const result = await response.json();
      setExamsData(result.exams);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamsData();
    const initialExams = location.state.exams.map((item) => item.examId);
    setExams(initialExams);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <form className="min-h-screen pt-24 pb-10 px-4 md:px-8" onSubmit={handleUpdateUser}>
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white py-6">Update User Profile</h1>

        {/* User Info Card */}
        <div className="max-w-4xl mx-auto mb-10 backdrop-blur-sm bg-white/30 dark:bg-gray-800/40 rounded-xl shadow-lg p-6 md:p-10 flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userInfo.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col gap-2 w-full">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={userInfo.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-24 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all duration-200"
            />
            <div className="absolute right-3 top-14 transform -translate-y-1/2 flex gap-2">
              <button type="button" onClick={generatePassword} title="Generate Password" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 p-1 rounded">
                <RefreshCw size={20} />
              </button>
              <button type="button" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide Password" : "Show Password"} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 p-1 rounded">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Exams Section */}
        <div className="max-w-5xl mx-auto mb-10">
          <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-6">Allot Exams To User</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {examsData.map((item) => (
              <CustomCheckbox key={item._id} data={item} onChange={handleCheckboxChange} checked={exams.includes(item._id)} />
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="max-w-md mx-auto mb-10 backdrop-blur-sm bg-white/30 dark:bg-gray-800/40 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Update User Order Status</h2>
          <ul className="space-y-3">
            {statuses.map((status) => (
              <li key={status.id} className="flex items-center gap-3">
                <input type="checkbox" id={`status-${status.id}`} checked={status.completed} onChange={() => toggleStatus(status.id)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor={`status-${status.id}`} className={`text-sm ${status.completed ? "line-through text-gray-400" : "text-gray-900 dark:text-gray-200"}`}>
                  {status.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <div className="flex justify-center mb-16">
          <button className="w-44 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg px-5 py-3 transition-all duration-300 shadow-md">
            Submit
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Footer />
    </div>
  );
};

export default UpdateUser;
