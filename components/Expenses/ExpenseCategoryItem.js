"use client";

import React, { useEffect, useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import { ViewExpenseModal } from "./ViewExpenseModal";
import { Icons } from "../Icons";

export const ExpenseCategoryItem = ({ expense }) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        onShow={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        expense={expense}
      />

      <button type="button" onClick={() => setShowExpenseModal(true)}>
        <div className="flex items-center justify-between gap-6 rounded-lg bg-white p-5">
          {/* Icon */}
          <div
            className="flex h-1/2 items-center justify-center rounded-lg p-4"
            style={{ backgroundColor: `${expense.color}` }}
          >
            <div className="h-[25px] w-[25px] ">
              <Icons iconName={expense.icon} iconColor="white" />
            </div>
          </div>

          {/* Title */}
          <div className="flex w-full flex-col items-start justify-center">
            <h2 className="font-medium">{expense?.title}</h2>
            <h2 className="text-xs text-gray-400">
              {expense?.items.length == 1
                ? `${expense?.items.length} Transaction`
                : `${expense?.items.length} Transactions`}
            </h2>
          </div>

          <div className="flex w-full flex-col items-end justify-center p-4">
            <h2 className="font-medium">{currencyFormatter(expense.total)}</h2>
            <h2 className="text-xs text-gray-400">View History</h2>
          </div>
        </div>
      </button>

      {/* 
      <div className="flex h-[150px] items-start justify-between rounded-2xl px-6 py-7">
        <div className="flex w-1/2 flex-col items-start justify-center">
          <p className="text-lg font-medium text-white ">{expense.title}</p>
          <p className="text-xs text-white ">
            {expense?.items.length <= 1
              ? `${expense?.items.length} Transaction`
              : `${expense?.items.length} Transactions`}
          </p>
        </div>

        <div className="flex w-1/2 flex-col items-end justify-center">
          <p className="text-lg font-medium text-white">
            {currencyFormatter(expense.total)}
          </p>
          <p className="text-xs text-white">View History</p>
        </div>
      </div> */}
    </>
  );
};
