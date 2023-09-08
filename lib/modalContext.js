"use client";

import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  clickedModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

/**
 *
 *  Create a global state variable that checks viewport (mobile, tablet, desktop)
 *
 *  If Modal is clicked, update global state in reference to specific viewport
 *
 *  If viewport is mobile, display Modal's width to 100%
 *
 *  If viewport is tablet, display Modal's width to 50% and on the right.
 *
 *  If viewport is desktop, display Modal's width to 20% and on the right.
 *
 *
 *  [isModalClicked, setIsModalClicked] = useState(false);
 *
 *  Once you click a Modal; run setIsModalClicked(!isModalClicked);
 *
 *  For all components, check isModalClicked
 *
 *  If yes, apply styles according to viewport width
 *
 *  `${ isModalClicked ? "md:w-1/2 lg:w-1/5" : "md:w-full lg:w-full"}`
 *
 *
 * */
