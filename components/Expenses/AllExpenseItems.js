import React from "react";

export const AllExpenseItems = ({ expense }) => {
  return (
    <div className="mt-2 flex items-center justify-between bg-slate-200 p-4">
      <h2>{expense.title}</h2>
      <p>{expense.amount}</p>
      <p>{expense.date.toDate().toLocaleDateString()}</p>
    </div>
  );
};
