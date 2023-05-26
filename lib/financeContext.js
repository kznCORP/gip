"use client";

import { createContext, useState, useEffect } from "react";

import {
  addNewExpense,
  getAllExpenses,
  deleteExpense,
  getExpenseCategories,
} from "./firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";

export const financeContext = createContext({
  expenses: [],
  addExpenseCategory: async () => {},
  addExpenseItem: async () => {},
  removeExpenseItem: async () => {},
});

export function FinanceContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [expCategory, setExpCategory] = useState([]);

  // Add a new Expense Category to Firebase
  const addExpenseCategory = async (newExpense) => {
    try {
      await addNewExpense(newExpense.title, newExpense.amount, newExpense.date);

      setExpenses((prevState) => {
        return [...prevState, { ...newExpense }];
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
        const foundIndex = updatedExpenses.find((expense) => {
          return expense.id === expCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expCategoryId, ...newExpense };

        return updatedExpenses;
      });
    } catch (e) {
      console.log("Error in Adding Expense Item Context: ", e);
    }
  };

  // Removes an Expense to Firebase
  const removeExpenseItem = async (incomeId) => {
    try {
      await deleteExpense(incomeId);
      setExpenses((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (e) {
      console.log("Error in Rremoving Expense Context: ", e);
    }
  };

  useEffect(() => {
    const fetchAllExpenses = async () => {
      const unsubscribe = await getAllExpenses(setExpenses);
      return () => unsubscribe();
    };

    const fetchExpenseCategories = async () => {
      const unsubscribe = await getExpenseCategories(setExpCategory);
      return () => unsubscribe();
    };

    // fetchAllExpenses();
    fetchExpenseCategories();
  }, [setExpenses, setExpCategory]);

  const values = {
    expenses,
    expCategory,
    addExpenseCategory,
    addExpenseItem,
    removeExpenseItem,
  };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
