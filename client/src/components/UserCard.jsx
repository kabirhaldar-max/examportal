import { LockKeyholeOpen, LockKeyhole } from "lucide-react";
import {
  UserIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UserCard = ({ data }) => {
  const deleteUser = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`;
      const headers = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: data._id }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const toggleResult = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/toggle-result`;
      const headers = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: data._id,
          showResult: !data.showResult,
        }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="w-80 sm:w-96 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-4">
        <UserIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h5 className="mb-2 text-xl sm:text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
        {data.username}
      </h5>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        Total Exams Alloted: {data.exams.length}
      </p>

      <div className="flex items-center justify-center gap-4 w-full mt-2">
        <Link
          to={"/admin/view-user"}
          state={data}
          className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <EyeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </Link>

        <Link
          to="/admin/update-user"
          state={data}
          className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <PencilSquareIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </Link>

        <button
          onClick={deleteUser}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </button>

        <button
          onClick={toggleResult}
          className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          {data.showResult ? (
            <LockKeyholeOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          ) : (
            <LockKeyhole className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          )}
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

export default UserCard;
