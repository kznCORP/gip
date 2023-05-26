import React, { useContext } from "react";
import { Modal } from "../Modal";
import { MdDelete } from "react-icons/md";
import { currencyFormatter } from "@/lib/utils";
import { financeContext } from "@/lib/financeContext";

export const ViewExpenseModal = ({ onShow, onClose, expense }) => {
  const { deleteExpenseItem, deleteCategory } = useContext(financeContext);

  //Delete Expense Category in Firebase
  const deleteExpenseCategoryHandler = async () => {
    try {
      await deleteCategory(expense.id);
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

      await deleteExpenseItem(updatedExpense, expense.id);
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
        {expense.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 bg-slate-300 text-black"
            >
              <h3>{item.name}</h3>
              <p>{currencyFormatter(item.amount)}</p>
              <button onClick={() => deleteExpenseItemHandler(item)}>
                <MdDelete />
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
