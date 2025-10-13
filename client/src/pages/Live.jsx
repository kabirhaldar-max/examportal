import React, { useState, useEffect } from "react";
import LiveHeader from "../components/LiveHeader";
import QuestionCard from "../components/QuestionCard";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Live = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [marksObtain, setMarksObtain] = useState(0);
  const [userData, setUserData] = useState();

  const marksHandler = (marks) => {
    setMarksObtain((prev) => prev + parseInt(marks));
  };

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

  const handleUpdateUser = async (score = marksObtain, status = true) => {
    try {
      const { _id, email, username, password, orderStatus } = userData;

      const formattedExams = userData.exams.map((item) => {
        if (item.examId === location.state._id) {
          return {
            examId: item.examId,
            score,
            status,
          };
        } else {
          return {
            examId: item.examId,
            score: item.score,
            status: item.status,
          };
        }
      });

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/update`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({
          _id,
          email,
          username,
          password,
          exams: formattedExams,
          orderStatus,
        }),
      });

      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/courses");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUserData();

    const handleBeforeUnload = () => {
      handleUpdateUser(0, true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUser();
        }}
        className="flex flex-col items-center py-24 px-4 gap-10"
      >
        {/* Live Header */}
        <div className="">
          <LiveHeader data={location.state} />
        </div>

        {/* Questions Section */}
        <div className="w-full max-w-5xl flex flex-col gap-8">
          {location.state.data.map((item, index) => (
            <div
              key={index}
              className=""
            >
              <QuestionCard
                current={index + 1}
                marksHandler={marksHandler}
                total={location.state.data.length}
                data={item}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-semibold text-white rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-10 blur-xl animate-pulse"></span>
            Submit Exam
          </button>
        </div>

        {/* Toast */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          pauseOnHover
          theme="colored"
        />
      </form>
    </div>
  );
};

export default Live;
