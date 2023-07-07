import React from "react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed inset-0 z-10 flex w-full items-center justify-center  backdrop-blur-sm">
          <div className="s container mx-auto h-full max-w-2xl overflow-y-auto bg-white px-6 py-6">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
