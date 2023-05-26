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
        <div className="py- flex items-center justify-between rounded-lg bg-gray-100 px-4 py-4 text-gray-600">
          <div id="exp-title">
            <div className="mt-1 flex items-center  gap-2">
              <div
                className="h-[10px] w-[10px] rounded-full"
                style={{ backgroundColor: expense.color }}
              />
              <p className="text-sm font-medium ">{expense.title}</p>
            </div>
          </div>

          <div id="exp-total">
            <p className=" mt-1 text-sm font-medium text-gray-500">
              {currencyFormatter(expense.total)}
            </p>
          </div>
        </div>
      </button>
    </>
  );
};
