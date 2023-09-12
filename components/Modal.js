"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/lib/modalContext";
import { X } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  const { isModalOpen, clickedModal } = useContext(ModalContext);

  return (
    <>
      {onShow && (
        <div
          className={`fixed bottom-0 right-0 top-0 z-50 h-full w-full overflow-y-auto ${
            isModalOpen ? "md:w-1/2 lg:w-1/3" : "md:w-full lg:w-full"
          } md:border-l md:shadow`}
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div className="px-6 pt-8">
            <button
              type="button"
              onClick={() => {
                onClose();
                clickedModal(false); // Handle the modal click event on button click
              }}
              className="flex w-full items-center justify-end gap-2"
            >
              <X
                className="h-6 w-6 flex-shrink-0"
                strokeWidth={3}
                color="black"
              />
            </button>
          </div>

          {children}
        </div>
      )}
    </>
  );
};
