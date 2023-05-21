import React from "react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed inset-0 z-10 flex  h-full w-full items-center justify-center ">
          <div className="container mx-auto h-[80vh] max-w-2xl rounded-3xl bg-gray-400 px-6 py-6">
            <button
              className="mb-4 h-10 w-10 rounded-full bg-gray-400 font-bold text-white"
              onClick={() => onClose(false)}
            >
              X
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};
