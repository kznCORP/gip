import React, { useContext } from "react";
import { Modal } from "../Modal";
import { Trash2 } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";
import { FinanceContext } from "@/lib/financeContext";

export const ViewExpenseModal = ({ onShow, onClose, expense }) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(FinanceContext);

  //Delete Expense Category in Firebase
  const deleteExpenseCategoryHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
    } catch (e) {
      console.log("Error in deleting Expense Category", e);
    }
  };

  //Delete Expense from Items Array in Firebase
  const deleteExpenseItemHandler = async (item) => {
    try {
      // Remove item from list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(expense.id, updatedExpense);
    } catch (e) {
      console.log("Error in deleting Expense Item", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{expense.title}</h2>
        <button
          className="rounded-3xl bg-red-600 p-2 text-sm text-white"
          onClick={() => deleteExpenseCategoryHandler()}
        >
          Delete
        </button>
      </div>

      <div>
        <h3>History</h3>
        {expense &&
          expense.items &&
          expense.items.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 bg-slate-300 text-black"
              >
                <h3>{item.name}</h3>
                <p>{currencyFormatter(item.amount)}</p>
                <button onClick={() => deleteExpenseItemHandler(item)}>
                  <Trash2 />
                </button>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};
