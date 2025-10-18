import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import {
  QuestionMarkCircleIcon,
  ArrowUturnRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const ExamDetails = ({ data }) => {
  const [examData, setExamData] = useState();

  const fetchExamDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/examdetails`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: data.examId }),
      };
      const response = await fetch(url, options);
      const result = await response.json();
      setExamData(result.examDetails);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  return (
    <div className="w-full sm:w-72 md:w-80 p-5 backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 border border-white/20 rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col items-center text-center gap-3">
        <QuestionMarkCircleIcon className="h-12 w-12 text-gray-500 dark:text-gray-300" />
        {examData ? (
          <>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              {examData.title || `Exam ${data.examId}`}
            </h3>
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
              {examData.fullName || ` `}
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              Total Questions: {examData.data?.length || 0}
            </p>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        )}
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Score: {data?.score}
        </p>
        <p
          className={`text-sm md:text-base font-medium ${
            data?.status ? "text-green-600" : "text-orange-500"
          }`}
        >
          Status: {data?.status ? "Completed" : "In Progress"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-4 text-blue-600 hover:text-blue-800 transition-colors">
        <button>
          <ArrowUturnRightIcon className="h-6 w-6" />
        </button>
        <button>
          <TrashIcon className="h-6 w-6 cursor-pointer" />
        </button>
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

export default ExamDetails;
