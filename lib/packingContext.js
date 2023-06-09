"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./authContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const PackingContext = createContext({
  packingItems: [],
  addPackingCategory: async () => {},
  deletePackingCategory: async () => {},
});

export function PackingContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [packingItems, setPackingItems] = useState([]);

  const addPackingCategory = async (category) => {
    try {
      // Write to Firebase
      const collectionRef = collection(db, "packing-items");
      await addDoc(collectionRef, { uid: user.uid, ...category, items: [] });

      // Store State
      setPackingItems((prevItems) => {
        const categoryExists = prevItems.some(
          (item) => item.title === category.title
        );

        if (categoryExists) {
          console.log("Category already exists");
          return prevItems;
        }

        const newCategory = {
          id: uuidv4(),
          uid: user.uid,
          items: [],
          ...category,
        };

        return [...prevItems, newCategory];
      });
    } catch (e) {
      console.log("Error in adding a Packing Item Context", e);
    }
  };

  const values = {
    packingItems,
    addPackingCategory,
  };

  return (
    <PackingContext.Provider value={values}>{children}</PackingContext.Provider>
  );
}
