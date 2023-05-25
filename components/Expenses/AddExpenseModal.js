import React, { useRef, useContext, useState } from "react";
import { Modal } from "../Modal";
import { financeContext } from "@/lib/financeContext";
import { v4 as uuidv4 } from "uuid";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const amountRef = useRef();
  const nameRef = useRef();

  const { expenses, expCategory, addExpenseItem } = useContext(financeContext);

  console.log(expCategory);

  // Add a new Expense to Firebase
  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +amountRef.current.value,
      items: [
        ...expense.items,
        {
          amount: +amountRef.current.value,
          name: nameRef.current.value,
          date: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(newExpense);
      // Reset form fields
      amountRef.current.value = "";
      nameRef.current.value = "";
    } catch (e) {
      console.log("Error in Adding Expense Modal: ", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <form onSubmit={addExpenseHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Name of Expense</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            placeholder="Enter the name of the expense"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter Amount"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          {expenses.map((category) => (
            <button key={category.id}>
              <div>
                <p>{category.title}</p>
              </div>
            </button>
          ))}
        </div>

        <button type="submit" className="text-md bg-blue-600 p-3">
          Submit
        </button>
      </form>
    </Modal>
  );
};
