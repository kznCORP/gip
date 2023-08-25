"use client";

import React, { useContext, useState } from "react";
import { FinanceContext } from "@/lib/financeContext";

import { Modal } from "../Modal";
import { AddExpenseModal } from "./AddExpenseModal";
import { Icons } from "../Icons";

import { PlusCircle, Trash2 } from "lucide-react";
import { currencyFormatter, dateFormatter } from "@/lib/utils";

export const ViewExpenseModal = ({ onShow, onClose, expense }) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(FinanceContext);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

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
    <>
      <AddExpenseModal
        onShow={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />

      <Modal onShow={onShow} onClose={onClose}>
        <section className="mb-10 mt-12 px-6">
          {/* Title */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8">
            <div
              className="flex h-1/2 items-center justify-center rounded-lg p-4 "
              style={{ backgroundColor: `${expense.color}` }}
            >
              <div className="h-[25px] w-[25px]">
                <Icons iconName={expense.icon} iconColor="white" />
              </div>
            </div>

            <h2 className="mt-3 text-center text-lg font-medium">
              {expense.title}
            </h2>

            <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
              Expense Category
            </p>
          </div>

          {/* Total Expense */}
          <div className="mt-4 flex h-24 flex-col items-center justify-center rounded-lg bg-white">
            <p
              className="text-lg font-medium"
              style={{ color: `${expense.color}` }}
            >
              {currencyFormatter(expense.total)}
            </p>
            <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
              Total Amt. Spent
            </p>
          </div>

          {/* Total Transactions */}
          <div className="mt-4 flex h-24 gap-4">
            <div className="flex w-4/5 flex-col items-center justify-center rounded-lg bg-white">
              <p className="text-lg font-medium">{expense?.items.length}</p>
              <p
                className="uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                {expense?.items.length <= 1 ? `Transaction` : `Transactions`}
              </p>
            </div>

            <button
              type="button"
              className="flex h-full w-1/5 items-center justify-center self-center rounded-lg bg-white"
              onClick={() => {
                onClose();
                setShowAddExpenseModal(true);
              }}
            >
              <PlusCircle className="h-6 w-6 flex-shrink-0" />
            </button>
          </div>

          {/* All Expense Items */}
          <div className="mt-4 rounded-lg bg-white">
            {expense.items.length > 0 ? (
              <h3
                className="pt-6 text-center font-medium uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                All Expenses
              </h3>
            ) : (
              <h3
                className="flex h-24 items-center justify-center font-medium uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                No Expenses Found
              </h3>
            )}

            {expense.items &&
              expense.items.length > 0 &&
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
                      <p className="text-sm font-semibold text-gray-500">
                        + {currencyFormatter(item.amount)}
                      </p>

                      <button
                        onClick={() => deleteExpenseItemHandler(item)}
                        className="mt-0.5 flex items-center"
                      >
                        <Trash2
                          className="h-3 w-3 flex-shrink-0 text-gray-400"
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="bottom-0 mt-24 flex items-center justify-center">
            <button
              type="button"
              className="flex items-center rounded p-4 text-xs text-red-400 hover:bg-rose-500 hover:text-white"
              onClick={() => deleteExpenseCategoryHandler()}
            >
              Delete Category
              <Trash2 className="ml-1 h-4 w-4 flex-shrink-0 text-red-400" />
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
};
