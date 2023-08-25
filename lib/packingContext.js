"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./authContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const PackingContext = createContext({
  packingItems: [],
  addPackingCategory: async () => {},
  addPackingItem: async () => {},
  deletePackingCategory: async () => {},
  deletePackingItem: async () => {},
  updateCheckbox: async () => {},
  updateBought: async () => {},
  getTotalPackedPercentage: () => {},
  getPackedItemsForCategory: () => {},
  getUnpackedItemsForCategory: () => {},
  getUnboughtItems: () => {},
});

export function PackingContextProvider({ children }) {
  const { user } = useContext(AuthUserContext);
  const [packingItems, setPackingItems] = useState([]);

  // Add a new Packing Category to Firebase
  const addPackingCategory = async (category) => {
    try {
      const collectionRef = collection(db, "packing-items");
      await addDoc(collectionRef, {
        uid: user.uid,
        items: [],
        ...category,
      });

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
      console.log("Error in adding a Packing Category Context", e);
    }
  };

  // Add an Item to a Packing Category in Firebase
  const addPackingItem = async (pCategoryId, item) => {
    const docRef = doc(db, "packing-items", pCategoryId);
    try {
      await updateDoc(docRef, { ...item });

      setPackingItems((prevState) => {
        const updatedItems = [...prevState];
        const foundIndex = updatedItems.findIndex((item) => {
          return item.id === pCategoryId;
        });

        updatedItems[foundIndex] = { id: pCategoryId, ...item };

        return updatedItems;
      });
    } catch (e) {
      console.log("Error in adding a Packing Item Context", e);
    }
  };

  // Deletes a Packing Category from Firebase
  const deletePackingCategory = async (pCategoryId) => {
    try {
      const docRef = doc(db, "packing-items", pCategoryId);
      await deleteDoc(docRef);

      setPackingItems((prevItems) => {
        const updatedItems = prevItems.filter((pi) => pi.id !== pCategoryId);
        return [...updatedItems];
      });
    } catch (e) {
      console.log("Error in Deleting Packing Category Context", e);
    }
  };

  // Delete an Item from a Packing Category in Firebase
  const deletePackingItem = async (pCategoryId, updatedItem) => {
    const docRef = doc(db, "packing-items", pCategoryId);

    try {
      await updateDoc(docRef, { items: updatedItem.items });

      setPackingItems((prevItems) => {
        const updatedItems = [...prevItems];
        const pos = updatedItems.findIndex((pi) => pi.id === pCategoryId);

        if (pos !== -1) {
          updatedItems[pos].items = [...updatedItem.items];
        }

        return updatedItems;
      });
    } catch (e) {
      console.log("Error in Deleting Packing Item Context", e);
    }
  };

  // Update an Item's checkbox state in Firebase
  const updateCheckbox = async (pCategoryId, item) => {
    const docRef = doc(db, "packing-items", pCategoryId);
    try {
      await updateDoc(docRef, {
        items: packingItems
          .find((pi) => pi.id === pCategoryId)
          .items.map((i) =>
            i.id === item.id ? { ...i, checked: item.checked } : i
          ),
      });
    } catch (e) {
      console.log("Error in Updating the Checkbox Context", e);
    }
  };

  // Update an Item's checkbox state in Firebase
  const updateBought = async (pCategoryId, item) => {
    const docRef = doc(db, "packing-items", pCategoryId);
    try {
      await updateDoc(docRef, {
        items: packingItems
          .find((pi) => pi.id === pCategoryId)
          .items.map((i) =>
            i.id === item.id ? { ...i, bought: item.bought } : i
          ),
      });
    } catch (e) {
      console.log("Error in Updating the Checkbox Context", e);
    }
  };

  // Get the percentage of all packed items
  const getTotalPackedPercentage = () => {
    const totalItems = packingItems.reduce(
      (count, category) => count + category.items.length,
      0
    );

    const packedItems = packingItems.reduce((count, category) => {
      const categoryPackedItems = category.items.filter((item) => item.checked);
      return count + categoryPackedItems.length;
    }, 0);

    return totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
  };

  // Get the percentage of packed items for a specific category
  const getPackedItemsForCategory = (pCategoryId) => {
    const category = packingItems.find((item) => item.id === pCategoryId);
    if (!category) return "0/0";

    const totalItems = category.items.length;
    const packedItems = category.items.filter((item) => item.checked).length;

    return `${packedItems}/${totalItems}`;
  };

  // Get the count of items needed to be packed for a specific category
  const getUnpackedItemsForCategory = (pCategoryId) => {
    const category = packingItems.find((item) => item.id === pCategoryId);
    if (!category) return 0;

    const unpackedItemsCount = category.items.reduce(
      (count, item) => count + (item.checked ? 0 : 1),
      0
    );

    return unpackedItemsCount;
  };

  // Get items that need to be bought
  const getUnboughtItems = () => {
    const unboughtItems = [];

    packingItems.forEach((category) => {
      category.items.forEach((item) => {
        if (!item.bought) {
          unboughtItems.push(item);
        }
      });
    });

    return unboughtItems;
  };

  // Fetch data from Firebase for every change.
  useEffect(() => {
    const fetchAllItems = async (setPackingItems, user) => {
      if (user && user.uid) {
        const collectionRef = collection(db, "packing-items");
        const packingItemsQuery = query(
          collectionRef,
          where("uid", "==", user.uid),
          orderBy("packingCategory")
        );

        try {
          const unsubscribe = onSnapshot(
            packingItemsQuery,
            async (snapshot) => {
              let allItems = [];

              for (const documentSnapshot of snapshot.docs) {
                const items = documentSnapshot.data();
                allItems.push({
                  id: documentSnapshot.id,
                  ...items,
                });
              }

              setPackingItems(allItems);
            }
          );
          return () => unsubscribe();
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    fetchAllItems(setPackingItems, user);
  }, [user, setPackingItems]);

  const values = {
    packingItems,
    addPackingCategory,
    addPackingItem,
    deletePackingCategory,
    deletePackingItem,
    updateCheckbox,
    updateBought,
    getTotalPackedPercentage,
    getPackedItemsForCategory,
    getUnpackedItemsForCategory,
    getUnboughtItems,
  };

  return (
    <PackingContext.Provider value={values}>{children}</PackingContext.Provider>
  );
}
