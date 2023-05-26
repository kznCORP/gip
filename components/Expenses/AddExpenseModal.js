import React, { useRef, useContext, useState } from "react";
import { Modal } from "../Modal";
import { financeContext } from "@/lib/financeContext";
import { v4 as uuidv4 } from "uuid";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const expAmountRef = useRef();
  const expNameRef = useRef();
  const ctgNameRef = useRef();
  const ctgColorRef = useRef();

  const { expCategory, addExpenseItem, addCategory } =
    useContext(financeContext);

  // Add a new Expense to Firebase
  const addExpenseHandler = async (e) => {
    e.preventDefault();

    if (!isSubmitClicked) {
      return;
    }

    const expense = expCategory.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expAmountRef.current.value,
      items: [
        ...expense.items,
        {
          amount: +expAmountRef.current.value,
          name: expNameRef.current.value,
          date: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
    } catch (e) {
      console.log("Error in Adding Item in Modal: ", e);
    }
  };

  // Add a new Category to Expenses collection in Firebase
  const addCategoryHandler = async (e) => {
    e.preventDefault();

    const title = ctgNameRef.current.value;
    const color = ctgColorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowCategories(false);
    } catch (e) {
      console.log("Error in Adding Category in Modal", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <form onSubmit={addExpenseHandler} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Expense Name</label>
          <input
            type="text"
            name="title"
            ref={expNameRef}
            placeholder="Enter the name of the expense"
            id="title"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            ref={expAmountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter Amount"
            id="amount"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between ">
            <h4>Categories</h4>
            <button
              className="text-lime-400"
              onClick={() => setShowCategories(true)}
            >
              + New Category
            </button>
          </div>

          {showCategories && (
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter New Category"
                ref={ctgNameRef}
              />
              <label>Color</label>
              <input type="color" ref={ctgColorRef} className="w-25 h-5" />
              <button
                className="rounded-3xl bg-blue-600 p-1 text-xs text-white"
                onClick={addCategoryHandler}
              >
                Create
              </button>
              <button
                className="rounded-3xl bg-red-600 p-1 text-xs text-white"
                onClick={() => setShowCategories(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {expCategory.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
              }}
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

        <button
          type="submit"
          className="text-md bg-blue-600 p-3"
          onClick={() => setIsSubmitClicked(true)}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};
