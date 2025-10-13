import React, { useState } from "react";

const QuestionCard = ({ data, current, total, marksHandler }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedIndex(index);
    if (data.correctOption === index + 1) {
      marksHandler(data.marks); // Add marks if correct
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 border border-white/20 transition-transform transform hover:scale-[1.01] hover:shadow-purple-300/40">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-400">
          Question <span className="font-bold">{current}</span> / {total}
        </div>
        <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
          Marks: {data.marks}
        </span>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-gray-900 dark:text-gray-100 text-base md:text-lg font-medium leading-relaxed">
          {data.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {data.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
              selectedIndex === index
                ? "bg-gradient-to-r from-purple-500/60 to-indigo-500/60 text-white border-transparent scale-[1.02]"
                : "bg-white/20 dark:bg-gray-900/30 border-white/30 hover:bg-white/40 dark:hover:bg-gray-800/50"
            }`}
          >
            <input
              type="radio"
              name={`question-${current}`}
              className="hidden"
              checked={selectedIndex === index}
              onChange={() => handleOptionChange(index)}
            />
            <div
              className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border ${
                selectedIndex === index
                  ? "bg-white text-purple-700 border-white"
                  : "border-gray-400 dark:border-gray-500"
              }`}
            >
              {selectedIndex === index && (
                <div className="w-3 h-3 bg-purple-700 rounded-full"></div>
              )}
            </div>
            <span
              className={`text-sm md:text-base ${
                selectedIndex === index
                  ? "text-white font-semibold"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
