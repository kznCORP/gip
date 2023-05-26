"use client";

import { createContext, useState, useEffect } from "react";
import { getExpenseCategories } from "./firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebase";

export const financeContext = createContext({
  expenses: [],
  addCategory: async () => {},
  addExpenseItem: async () => {},
  deleteCategory: async () => {},
  deleteExpenseItem: async () => {},
});

export function FinanceContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [expCategory, setExpCategory] = useState([]);

  // Add a new Expense Category to Firebase
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses");

      const docSnap = addDoc(collectionRef, {
        ...category,
        items: [],
      });

      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            items: [],
          },
        ];
      });
    } catch (e) {
      console.log("Error in Adding Expense Category Context: ", e);
    }
  };

  // Add a new Expense Item to Firebase
  const addExpenseItem = async (expCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expCategoryId);
    try {
      updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];
        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expCategoryId, ...newExpense };

        return updatedExpenses;
      });
    } catch (e) {
      console.log("Error in Adding Expense Item Context: ", e);
    }
  };

  // Deletes an Expense Category from Firebase
  const deleteCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);

      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (ex) => ex.id !== expenseCategoryId
        );

        return [...updatedExpenses];
      });
    } catch (e) {
      console.log("Error in Removing Expense Context: ", e);
    }
  };

  // Deletes an expense from specific Category from Firebase
  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    const docRef = doc(db, "expenses", expenseCategoryId);
    try {
      await updateDoc(docRef, {
        ...updatedExpense,
      });

      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );

        if (pos !== -1) {
          updatedExpenses[pos].items = [...updatedExpense.items];
          updatedExpenses[pos].total = +updatedExpense.total;
        }

        return updatedExpenses;
      });
    } catch (e) {
      console.log("Error in Deleting Expense Item Context", e);
    }
  };

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      const unsubscribe = await getExpenseCategories(setExpCategory);
      return () => unsubscribe();
    };

    fetchExpenseCategories();
  }, [setExpCategory]);

  const values = {
    expenses,
    expCategory,
    addCategory,
    addExpenseItem,
    deleteCategory,
    deleteExpenseItem,
  };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
