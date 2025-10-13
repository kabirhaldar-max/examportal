import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const UserExamCard = (props) => {
  const [examDetails, setExamDetails] = useState();

  const fetchExamDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/examdetails`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ _id: props.data.examId }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setExamDetails(result.examDetails);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  return (
    <div className="w-72 sm:w-80 p-6 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
      {/* Exam Info */}
      <div className="mb-4">
        <h5 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
          {examDetails?.title || "Loading..."}
        </h5>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          Total Marks: {examDetails?.totalMarks ?? "-"}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          Total Questions: {examDetails?.data?.length ?? "-"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        {!props.data.status ? (
          <Link
            to="/live"
            state={examDetails}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 rounded-lg focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition"
          >
            Start Exam
            <svg
              className="w-4 h-4 ms-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        ) : (
          <span className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-300 rounded-lg cursor-not-allowed">
            Start Exam
            <svg
              className="w-4 h-4 ms-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </span>
        )}

        <span
          className={`flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg ${
            props.data?.status ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}
        >
          {props.data?.status ? "Completed" : "Yet to complete"}
        </span>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserExamCard;
