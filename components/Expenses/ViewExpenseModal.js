"use client";

import React, { useEffect, useContext } from "react";
import { Modal } from "../Modal";
import { Delete } from "lucide-react";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
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
      <section className="mt-5">
        {/* Cover */}
        <div
          className="flex h-[125px] items-center justify-between rounded-t-2xl px-6"
          style={{ backgroundColor: expense.color }}
        >
          <div className="flex w-1/2 flex-col items-start justify-center">
            <h2 className="text-lg font-medium text-white">{expense.title}</h2>
            <p className="text-xs text-white">History of all expenses</p>
          </div>

          <div className="flex w-1/2 flex-col items-end justify-center">
            <p className="text-lg font-medium text-white">
              {currencyFormatter(expense.total)}
            </p>
            <p className="text-xs text-white">
              {expense?.items.length <= 1
                ? `${expense?.items.length} Transaction`
                : `${expense?.items.length} Transactions`}
            </p>
          </div>
        </div>

        {/* All Expense Items */}
        <div className="rounded-b-xl border">
          {expense &&
            expense.items &&
            expense.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b p-6 last:border-b-0"
                >
                  <div className="flex w-1/2 flex-col items-start justify-center">
                    <h3
                      className="text-md font-semibold"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {dateFormatter(item.date)}
                    </p>
                  </div>

                  <div className="flex w-1/2 flex-col items-end justify-center">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: expense.color }}
                    >
                      + {currencyFormatter(item.amount)}
                    </p>

                    <button
                      onClick={() => deleteExpenseItemHandler(item)}
                      className="mt-0.5 flex items-center"
                    >
                      <p className="text-xs text-gray-400">delete</p>
                      <Delete className="ml-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="bottom-0 mt-10 flex items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded border px-2 py-2 text-xs text-gray-400 hover:bg-rose-500 hover:text-white"
            onClick={() => deleteExpenseCategoryHandler()}
          >
            Delete Category
            <Delete className="ml-1 h-4 w-4 flex-shrink-0 text-gray-400" />
          </button>
        </div>
      </section>
    </Modal>
  );
};
