import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import UserExamCard from "../components/UserExamCard";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const UserExams = () => {
  const [userData, setUserData] = useState();

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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-100 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <UserNavbar />

      <main className="flex-grow pt-28 px-4">
        {/* Welcome Section */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, {userData?.username || "User"}
          </h1>
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Your Allotted Courses
          </h2>
        </div>

        {/* Exams Cards Section */}
        <section className="max-w-7xl mx-auto px-2 pb-20">
          {userData?.exams && userData.exams.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {userData.exams.map((item) => (
                <UserExamCard key={item.examId} data={item} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/10 max-w-md mx-auto mt-10">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                No exams found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Please check back later or contact admin.
              </p>
            </div>
          )}
        </section>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />

      <Footer />
    </div>
  );
};

export default UserExams;
