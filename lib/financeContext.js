"use client";

import { createContext, useState, useEffect } from "react";
import {
  addNewExpense,
  getAllExpenses,
  deleteExpense,
} from "./firebase/firestore";

export const financeContext = createContext({
  expenses: [],
  addExpenseItem: async () => {},
  removeExpenseItem: async () => {},
});

export function FinanceContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  console.log(expenses);

  // Add a new Expense to Firebase
  const addExpenseItem = async (newExpense) => {
    try {
      await addNewExpense(newExpense.title, newExpense.amount, newExpense.date);
      setExpenses((prevState) => {
        return [...prevState, { ...newExpense }];
      });
    } catch (e) {
      console.log("Error in Adding Expense Context: ", e);
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

  // When component renders, fetch All Expenses.
  useEffect(() => {
    const fetchAllExpenses = async () => {
      const unsubscribe = await getAllExpenses(setExpenses);
      return () => unsubscribe();
    };
    fetchAllExpenses();
  }, [setExpenses]);

  const values = { expenses, addExpenseItem, removeExpenseItem };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
