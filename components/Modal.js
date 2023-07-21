import React from "react";
import { ArrowLeftCircle } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed bottom-0 left-0 z-50 w-full">
          <div className="mx-auto h-full w-full max-w-2xl overflow-y-auto rounded-t-3xl border-t bg-white py-6 shadow-inner">
            <div className="sticky top-0 px-4 pt-4">
              <button type="button" onClick={() => onClose(false)}>
                <ArrowLeftCircle className="h-8 w-8 flex-shrink-0" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
