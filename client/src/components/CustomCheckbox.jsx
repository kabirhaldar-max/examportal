import React from "react";

const CustomCheckbox = (props) => {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    if (props.onChange) {
      props.onChange(props.data._id, isChecked);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <input
          id={props.data._id}
          type="checkbox"
          checked={props.checked}
          onChange={handleChange}
          value={props.data._id}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
        />
        <label
          htmlFor={props.data._id}
          className="text-gray-900 dark:text-white font-medium select-none"
        >
          {props.data.title}
        </label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
