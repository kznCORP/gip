import React, { useRef, useContext } from "react";
import { Modal } from "../Modal";
import { financeContext } from "@/lib/financeContext";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const amountRef = useRef();
  const titleRef = useRef();
  const { addExpenseItem } = useContext(financeContext);

  // Add a new Expense to Firebase
  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const newExpense = {
      title: titleRef.current.value,
      amount: amountRef.current.value,
      date: new Date(),
    };

    try {
      await addExpenseItem(newExpense);
      // Reset form fields
      amountRef.current.value = "";
      titleRef.current.value = "";
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
