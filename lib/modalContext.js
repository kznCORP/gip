"use client";

import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: null,
  clickedModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const clickedModal = (e) => {
    setIsModalOpen(e);
  };

  const values = {
    isModalOpen,
    clickedModal,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
