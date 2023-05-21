import React, { useRef } from "react";
import { Modal } from "../Modal";
import { addNewExpense } from "@/lib/firebase/firestore";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const amountRef = useRef();
  const titleRef = useRef();

  // Add a new Expense to Firebase
  const addExpenseHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      title: titleRef.current.value,
      amount: amountRef.current.value,
      date: new Date(),
    };

    addNewExpense(newExpense.title, newExpense.amount, newExpense.date);

    // Reset form fields
    amountRef.current.value = "";
    titleRef.current.value = "";
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <form onSubmit={addExpenseHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Name of Expense</label>
          <input
            type="text"
            name="title"
            ref={titleRef}
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
        <button type="submit" className="text-md bg-blue-600 p-3">
          Submit
        </button>
      </form>
    </Modal>
  );
};
