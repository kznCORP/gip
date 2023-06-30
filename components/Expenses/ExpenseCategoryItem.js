import React, { useState } from "react";
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

      <button onClick={() => setShowExpenseModal(true)}>
        <div className="flex items-center justify-between border-b  px-4 py-6">
          <div className="flex items-center gap-5">
            <div
              className="h-[25px] w-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <div className="flex flex-col items-start">
              <p className="text-md font-medium">{expense.title}</p>
              <p className="text-xs  text-gray-400">(x) Transactions </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start">
              <p className="text-md font-semibold ">
                {currencyFormatter(expense.total)}
              </p>
              <p className="text-xs  text-gray-400">View History</p>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
