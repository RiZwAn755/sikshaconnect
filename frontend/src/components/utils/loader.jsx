import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex flex-col items-center justify-center py-12 w-full"
    >
      <div className="relative flex items-center justify-center">
        {/* Simple spinner */}
        <div className="h-10 w-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
      </div>

      {text && (
        <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
