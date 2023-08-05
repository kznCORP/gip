import React from "react";
import { ArrowLeftCircle } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed bottom-0 left-0 z-50 w-full">
          <div className="mx-auto h-full w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-inner">
            <div className="absolute top-0 z-50 mt-4 px-6 pt-4">
              <button type="button" onClick={() => onClose(false)} className="bg-black rounded-full text-white">
                <ArrowLeftCircle className="h-8 w-8 flex-shrink-0" strokeWidth={2} />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
