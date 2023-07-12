"use client";

import React, { useEffect, useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import { ViewExpenseModal } from "./ViewExpenseModal";

export const ExpenseCategoryItem = ({ expense }) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        onShow={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        expense={expense}
      />

      <button
        onClick={() => setShowExpenseModal(true)}
        className="-mb-7 duration-300 ease-in hover:mb-2 last:hover:-mb-7"
      >
        <div
          className="flex h-[150px] items-start justify-between rounded-2xl px-6 py-7"
          style={{ backgroundColor: expense.color }}
        >
          <div className="flex w-1/2 flex-col items-start justify-center">
            <p className="text-lg font-medium text-white">{expense.title}</p>
            <p className="text-xs text-white">
              {expense?.items.length <= 1
                ? `${expense?.items.length} Transaction`
                : `${expense?.items.length} Transactions`}
            </p>
          </div>

          <div className="flex w-1/2 flex-col items-end justify-center">
            <p className="text-lg font-semibold text-white">
              {currencyFormatter(expense.total)}
            </p>
            <p className="text-xs  text-white">View History</p>
          </div>
        </div>
      </button>
    </>
  );
};
