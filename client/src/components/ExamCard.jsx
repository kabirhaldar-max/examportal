import React from 'react';
import { Link } from 'react-router';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { QuestionMarkCircleIcon, EyeIcon, PencilSquareIcon, TrashIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

const ExamCard = (props) => {

    const deleteExam = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/exam`;
        const headers = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ _id: props.data._id }),
        };
        const response = await fetch(url, headers);
        const result = await response.json();
        const { success, message } = result;
        if (success) {
          handleSuccess(message);
          // localStorage.setItem("loggedInUser", name);
          setTimeout(() => {
            window.location.reload();
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
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <QuestionMarkCircleIcon className="h-10 w-10 text-gray-500" />
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {props.data.title}
        </h5>
      </div>
      <p className="mb-3 font-medium text-gray-900 dark:text-white w-[80%]">
        {props.data.fullName}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Total No. of Questions: {props.data.data.length}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Total Marks: {props.data.totalMarks}
      </p>
      {/* <div
        className="inline-flex font-medium items-center gap-10 justify-center text-blue-600 hover:underline"
      >
        <EyeIcon class="h-6 w-6" />
        <Link to="/admin/update-exam" state={props.data}><PencilSquareIcon class="h-6 w-6" /></Link>
        <DocumentCheckIcon class="h-6 w-6" />
        <TrashIcon class="h-6 w-6" onClick={deleteExam} />
      </div> */}
    </div>
  )
}

export default ExamCard
