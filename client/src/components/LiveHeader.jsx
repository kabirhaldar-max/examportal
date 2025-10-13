import React from "react";

const LiveHeader = ({ data }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 border border-white/20">
      {/* Title & Marks */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white tracking-wide drop-shadow-sm text-center md:text-left">
          {data.title}
        </h1>
        <span className="mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full shadow-lg">
          Total Marks: {data.totalMarks}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-6"></div>

      {/* Warning Message */}
      <div className="relative bg-red-100/60 dark:bg-red-900/30 border border-red-300/40 dark:border-red-600/50 rounded-xl p-4 md:p-5 flex items-start gap-3">
        <div className="flex-shrink-0 text-red-600 dark:text-red-400 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-7 md:h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-700 dark:text-red-300 text-sm md:text-base leading-relaxed">
          ⚠️ <strong>Important:</strong> Do <em>not</em> close or refresh this tab. 
          Doing so will automatically end your exam with a score of <strong>0</strong>, 
          and you will lose access to retake this test.
        </p>
      </div>
    </div>
  );
};

export default LiveHeader;
