"use client";

import React, { useContext, useState } from "react";

import { ModalContext } from "@/lib/modalContext";

import { ViewExpenseModal } from "./ViewExpenseModal";
import { Icons } from "../Icons";

import { currencyFormatter } from "@/lib/utils";

export const ExpenseCategoryItem = ({ expense }) => {
  const { isModalOpen, clickedModal } = useContext(ModalContext);

  return (
    <>
      <ViewExpenseModal
        onShow={isModalOpen == expense.id}
        onClose={() => clickedModal(false)}
        expense={expense}
      />

      <section
        type="button"
        className={`cursor-pointer ${
          isModalOpen ? "my-2 md:w-full" : "p-2 md:w-1/2"
        }`}
        onClick={() => clickedModal(expense.id)}
      >
        <div className="flex w-full items-center justify-between gap-6 rounded-lg bg-white p-5">
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
      </section>
    </>
  );
};
