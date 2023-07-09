import React from "react";
import { ArrowLeftCircle } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div className="fixed inset-0 z-10 flex w-full items-center justify-center  backdrop-blur-sm">
          <div className="s container mx-auto h-full max-w-2xl overflow-y-auto bg-white px-6 py-6">
            <div className="sticky top-0 pt-4">
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
