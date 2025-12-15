import React from "react";

const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >

      <div className="relative flex items-center justify-center">

        <div className="h-24 w-24 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />


        <div className="absolute h-10 w-10 rounded-full bg-white animate-pulse" />
      </div>


      <p className="mt-6 text-xs tracking-[0.35em] text-red-500 animate-fade">
        LOADING
      </p>
    </div>
  );
};

export default Loader;
