import React from "react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div className="s container mx-auto h-full max-w-2xl  bg-gray-100 px-6 py-6">
            <button
              className="mb-4 h-10 w-10 rounded-full bg-black font-bold text-white"
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
