import { useRef, useContext, useState } from "react";
import { Modal } from "../Modal";
import { FinanceContext } from "@/lib/financeContext";
import { v4 as uuidv4 } from "uuid";

export const AddExpenseModal = ({ onShow, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const ctgNameRef = useRef();
  const ctgColorRef = useRef();

  const { expenses, addExpenseItem, addExpenseCategory } =
    useContext(FinanceContext);

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    if (!isSubmitClicked) {
      return;
    }

    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    if (!expense) {
      console.log("Selected category not found");
      return;
    }

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          id: uuidv4(),
          amount: +expenseAmount,
          name: expenseName,
          date: new Date(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      setExpenseAmount("");
      setExpenseName("");
      setSelectedCategory(null);
      setIsSubmitClicked(false);
      onClose();
    } catch (e) {
      throw e;
    }
  };

  // Add a new Category to Expenses collection in Firebase
  const addCategoryHandler = async (e) => {
    e.preventDefault();

    const title = ctgNameRef.current.value;
    const color = ctgColorRef.current.value;

    try {
      // Check if the category already exists
      const existingCategory = expenses.find(
        (category) => category.title === title
      );
      if (existingCategory) {
        console.log("Category already exists");
        return;
      }

      if (showCategories) {
        setShowCategories(false);
        await addExpenseCategory({ title, color, total: 0 });
      }
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
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
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
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
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

          {expenses.map((category) => (
            <button
              type="button"
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
                  <div>
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
