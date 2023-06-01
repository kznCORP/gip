"use client";

import { createContext, useState, useEffect, useContext } from "react";
import {
  addCategory,
  deleteCategory,
  getAllExpenses,
  updateItem,
} from "./firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AuthUserContext } from "./authContext";

export const FinanceContext = createContext({
  expenses: [],
  addExpenseCategory: async () => {},
  addExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
  deleteExpenseItem: async () => {},
});

export function FinanceContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(AuthUserContext);

  // Add a new Expense Category to Firebase
  const addExpenseCategory = async (category) => {
    try {
      await addCategory(category, user);

      setExpenses((prevExpenses) => {
        const categoryExists = prevExpenses.some(
          (expense) => expense.title === category.title
        );

        if (categoryExists) {
          console.log("Category already exists");
          return prevExpenses;
        }

        const newCategory = {
          id: uuidv4(),
          uid: user.uid,
          items: [],
          ...category,
        };
        return [...prevExpenses, newCategory];
      });
    } catch (e) {
      console.log("Error in Adding Expense Category Context: ", e);
    }
  };

  // Add a new Expense Item to Firebase
  const addExpenseItem = async (expCategoryId, newExpense) => {
    try {
      await updateItem(expCategoryId, newExpense);

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
  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      await deleteCategory(expenseCategoryId);

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
  const deleteExpenseItem = async (expCategoryId, updatedExpense) => {
    try {
      await updateItem(expCategoryId, { ...updatedExpense });

      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex((ex) => ex.id === expCategoryId);

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
    const fetchAllExpenses = async () => {
      if (user && user.uid) {
        const unsubscribe = await getAllExpenses(setExpenses, user.uid);
        return () => unsubscribe();
      }
    };

    fetchAllExpenses();
  }, [user, setExpenses]);

  const values = {
    expenses,
    addExpenseCategory,
    addExpenseItem,
    deleteExpenseCategory,
    deleteExpenseItem,
  };

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
