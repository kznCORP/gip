import React, { useContext } from "react";
import { Modal } from "../Modal";

import { deleteExpense } from "@/lib/firebase/firestore";
import { MdDelete } from "react-icons/md";
import { financeContext } from "@/lib/financeContext";

export const ViewExpenseHistoryModal = ({ onShow, onClose }) => {
  const { expenses, removeExpenseItem } = useContext(financeContext);

  const removeExpenseHandler = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      removeExpenseItem(expenseId);
    } catch (e) {
      console.log("Error deleting expense: ", e);
    }
  };

  return (
    <>
      {/* View All Expenses */}
      <Modal onShow={onShow} onClose={onClose}>
        <h3>All Expenses will be viewed here.</h3>
        {expenses.map((e) => (
          <div
            key={e.id}
            className="mt-2 flex items-center justify-between bg-slate-200 p-4"
          >
            <h2>{e?.title}</h2>
            <p>{e?.amount}</p>
            <p>{e?.date?.toDate().toLocaleDateString()}</p>

            <button
              onClick={() => {
                removeExpenseHandler(e.id);
              }}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ViewExpenseHistoryModal;
