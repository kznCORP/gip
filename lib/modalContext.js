"use client";

import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  isModalClicked: false,
});

export function ModalContextProvider({ children }) {
  const [isModalClicked, setIsModalClicked] = useState(false);

  const values = {
    isModalClicked,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
