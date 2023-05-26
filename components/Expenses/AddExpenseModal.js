import React, { useRef, useContext, useState } from "react";
import { Modal } from "../Modal";
import { financeContext } from "@/lib/financeContext";
import { v4 as uuidv4 } from "uuid";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const amountRef = useRef();
  const nameRef = useRef();

  const { expCategory, addExpenseItem } = useContext(financeContext);

  // console.log(expCategory);

  // Add a new Expense to Firebase
  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const expense = expCategory.find((e) => {
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

    console.log(newExpense);

    try {
      await addExpenseItem(selectedCategory, newExpense);
    } catch (e) {
      console.log("Error in Adding Item in Modal: ", e);
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

        <div className="flex flex-col gap-4">
          <h4>Categories</h4>
          {expCategory.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className="flex items-center justify-between rounded-2xl bg-slate-500 px-3 py-3"
                style={{
                  border:
                    category.id === selectedCategory
                      ? "1px solid white"
                      : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-[15px] w-[15px] rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div className="">
                    <h4 className="capitalize">{category.title}</h4>
                  </div>
                </div>
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
