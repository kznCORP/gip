import React from "react";
import { ArrowLeftCircle, ArrowLeftToLine } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  return (
    <>
      {onShow && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div className="mt-4 px-6 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeftToLine
                className="h-6 w-6 flex-shrink-0"
                strokeWidth={2}
                color="black"
              />
              <p className="text-xs font-medium">Go Back</p>
            </button>
          </div>

          {children}
        </div>
      )}
    </>
  );
};
