import React, { useState, useEffect } from "react";

const QuestionBox = ({ id, data, onDataChange }) => {
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState(5);
  const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
  const [correctOption, setCorrectOption] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Notify parent of the updated data
  useEffect(() => {
    if (question && correctOption !== null && options.every(opt => opt)) {
      onDataChange({
        question,
        marks,
        options,
        correctOption,
      });
    } else {
      onDataChange(null); // Invalid form data
    }
  }, [question, marks, options, correctOption, onDataChange]);

  useEffect(() => {
    if(data != null) {
      setQuestion(data.question);
      setMarks(data.marks);
      setOptions(data.options);
      setCorrectOption()
    }
  },[])

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md mb-4">
      <h2 className="text-lg font-bold mb-4">Question {id + 1}</h2>

      {/* Question Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          required
        />

        {/* Marks Input */}
        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Marks
        </label>
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter Marks"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Options */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Options
      </label>
      {options.map((option, index) => (
        <div className="mb-4 flex items-center" key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="radio"
            name={`correctOption-${id}`}
            checked={correctOption === index}
            onChange={() => setCorrectOption(index)}
            className="ml-2"
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionBox;
