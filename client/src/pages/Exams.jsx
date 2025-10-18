import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import ExamCard from "../components/ExamCard";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const Exams = () => {
  const [allExams, setAllExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExams = allExams.filter((exam) =>
    exam.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const fetchExamsData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/exams`;
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setAllExams(result.exams || []);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamsData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-100 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <Navbar />

      <main className="flex-grow pt-28 px-4">
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-10">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-3 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/20 transition"
          >
            <div className="relative flex-1 w-full">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 dark:text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
              <input
                type="text"
                id="simple-search"
                placeholder="Search by exam name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm transition"
                required
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition transform hover:scale-[1.03]"
            >
              Search
            </button>

            {/* <Link
              to={"/admin/create-exam"}
              className="px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-transparent border border-indigo-500 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-600 hover:text-white focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition transform hover:scale-[1.03]"
            >
              New Exam
            </Link> */}
          </form>
        </div>

        {/* Exam Cards Section */}
        <section className="max-w-7xl mx-auto px-2 pb-20">
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 tracking-tight">
            All Exams
          </h1>

          {filteredExams.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {filteredExams.map((item) => (
                <ExamCard key={item._id} data={item} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/10 max-w-md mx-auto">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                No exams found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Try searching with a different exam name.
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

export default Exams;
