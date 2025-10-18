import React, { useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExamDetails from "../components/ExamDetails";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import OrderStatusTracker from "../components/OrderStatusTracker";

const ViewUser = () => {
  const location = useLocation();

  const [userInfo] = useState({
    _id: location.state._id,
    email: location.state.email,
    username: location.state.username,
    password: location.state.password,
  });

  const [exams] = useState(location.state.exams);
  const [statuses] = useState(location.state.orderStatus);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />

      {/* User Info Card */}
      <div className="max-w-4xl mx-auto mt-10 mb-10 backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center gap-4 border border-white/20">
        <UserCircleIcon className="h-24 w-24 text-gray-500 dark:text-gray-300" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {userInfo.username}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {userInfo.email}
        </p>
      </div>

      {/* Exams Section */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Exams Alloted
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exams.map((item) => (
            <div key={item.examId}>
              <ExamDetails data={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Section */}
      <div className="max-w-4xl w-full mx-auto mb-16 p-6 md:p-10 backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center tracking-wide">
          Order Status
        </h2>
        <ul className="space-y-6">
          {statuses.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 bg-white/20 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            >
              <OrderStatusTracker
                step={step}
                isLast={index === statuses.length - 1}
              />
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default ViewUser;
