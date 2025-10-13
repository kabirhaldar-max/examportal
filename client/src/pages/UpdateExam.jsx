import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestionBox from "../components/QuestionBox";
// import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UpdateExam = () => {
  const location = useLocation();
  console.log("state", location.state);

  const [examTitle, setExamTitle] = useState(location.state.title);
  const [quizForms, setQuizForms] = useState([location.state.data]);

  console.log("quizForm", quizForms);

  const addQuizForm = () => {
    setQuizForms((prevForms) => [
      ...prevForms,
      { id: prevForms.length, data: null },
    ]);
  };

  const updateQuizFormData = (id, data) => {
    setQuizForms((prevForms) =>
      prevForms.map((form) => (form.id === id ? { ...form, data } : form))
    );
  };

  const navigate = useNavigate();

  console.log({ title: examTitle, data: quizForms });

  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!examTitle.trim()) {
      handleError("Exam title cannot be empty!");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/exam`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: location.state._id, title: examTitle, data: quizForms }),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        // localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/admin/exams");
        }, 1000);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="min-h-screen pt-24 pb-10" onSubmit={handleCreateExam}>
        <h1 className="text-center text-2xl font-semibold tracking-wide py-3">
          Create New Exam
        </h1>

        <div className="max-w-screen-lg mx-auto px-5">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Exam Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={examTitle}
              onChange={(e) => {
                setExamTitle(e.target.value);
              }}
              placeholder="Enter Exam Title"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto">
          {quizForms.map((form) => (
            <QuestionBox
              key={form.id}
              id={form.id}
              data={form.data}
              onDataChange={(data) => updateQuizFormData(form.id, data)}
            />
          ))}

          {/* Add Question Button */}
          <button
            onClick={addQuizForm}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Question
          </button>

          {/* Submit Button */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit Quiz
          </button>
        </div>
      </form>
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
      <Footer />
    </div>
  );
};

export default UpdateExam;
