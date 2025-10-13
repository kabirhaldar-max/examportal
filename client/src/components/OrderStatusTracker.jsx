import React from 'react';


// Step component
const OrderStatusTracker = ({ step, isLast }) => (
  <div className="relative flex items-start p-2">
    {/* Step Circle */}
    <div className="relative z-10 w-6 h-6 flex items-center justify-center">
      {step.completed ? (
        <div className="w-6 h-6 p-2 bg-green-500 text-white rounded-full flex items-center justify-center">
          &#10003;
        </div>
      ) : (
        <div className="w-6 h-6 p-2 border-2 bg-slate-100 border-gray-300 rounded-full"></div>
      )}
    </div>

    {/* Step Line */}
    {!isLast && (
      <div className="absolute top-6 left-5 w-0.5 h-full bg-gray-300"></div>
    )}

    {/* Step Text */}
    <div className="ml-4 text-gray-700">
      <p
        className={`${
          step.completed ? 'text-gray-900 font-semibold' : 'text-gray-500'
        }`}
      >
        {step.label}
      </p>
    </div>
  </div>
);

export default OrderStatusTracker;