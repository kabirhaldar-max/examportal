import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [examDetails, setExamDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/home`;
      const headers = {
        headers: {
          auth: localStorage.getItem("auth"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setUserData(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExamDetails = async (examId) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/examdetails`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ _id: examId }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      return result.examDetails?.title || "Unknown Exam";
    } catch (err) {
      handleError(err);
      return "Error fetching exam";
    }
  };

  const fetchAllExamDetails = async () => {
    if (!userData?.exams) return;

    const details = {};
    for (const exam of userData.exams) {
      const title = await fetchExamDetails(exam.examId);
      details[exam.examId] = title;
    }
    setExamDetails(details);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchAllExamDetails();
    }
  }, [userData]);

  return (
    <>
      <UserNavbar />

      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center px-4 py-24">
        {/* Glass Card Container */}
        <div className="w-full max-w-5xl backdrop-blur-2xl bg-white/30 dark:bg-gray-800/40 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-indigo-300/20">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            My Profile
          </h1>

          {/* User Info Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              👤 Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-300">
              <p className="bg-white/20 dark:bg-gray-700/30 p-3 rounded-xl border border-white/10 shadow-sm">
                <span className="font-medium">Username:</span> {userData?.username || "Loading..."}
              </p>
              <p className="bg-white/20 dark:bg-gray-700/30 p-3 rounded-xl border border-white/10 shadow-sm">
                <span className="font-medium">Email:</span> {userData?.email || "Loading..."}
              </p>
            </div>
          </div>

          {/* Course Stats Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📘 Course Stats
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-900 dark:text-gray-200 backdrop-blur-lg bg-white/20 dark:bg-gray-700/40 border border-white/10 rounded-xl shadow-md">
                <thead className="bg-white/40 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.exams?.length ? (
                    userData.exams.map((exam, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 border-t border-white/10">
                          {examDetails[exam.examId] || "Loading..."}
                        </td>
                        <td className="py-3 px-4 border-t border-white/10 text-center">
                          {userData.showResult ? exam.score : 0}
                        </td>
                        <td className="py-3 px-4 border-t border-white/10 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              exam.status && userData.showResult
                                ? "bg-green-500/70 text-white"
                                : "bg-yellow-500/70 text-white"
                            }`}
                          >
                            {exam.status && userData.showResult
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-3 px-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No exams found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📦 Order Status
            </h2>
            <div className="space-y-4">
              {userData?.orderStatus?.length ? (
                userData.orderStatus.map((status) => (
                  <div
                    key={status.id}
                    className={`flex items-center justify-between p-4 rounded-xl border border-white/10 backdrop-blur-lg transition-all duration-300 ${
                      status.completed
                        ? "bg-green-500/30 text-white"
                        : "bg-gray-400/20 text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          status.completed ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="font-medium">{status.label}</span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        status.completed
                          ? "bg-green-600/70 text-white"
                          : "bg-yellow-500/70 text-white"
                      }`}
                    >
                      {status.completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No order status available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <Footer />
    </>
  );
};

export default Profile;
