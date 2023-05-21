import { deleteExpense } from "@/lib/firebase/firestore";

import { MdDelete } from "react-icons/md";

export const AllExpenseItems = ({ expense }) => {
  const date = expense?.date?.toDate().toLocaleDateString();
  const title = expense?.title;
  const amount = expense?.amount;

  return (
    <div className="mt-2 flex items-center justify-between bg-slate-200 p-4">
      <h2>{title}</h2>
      <p>{amount}</p>
      <p>{date}</p>

      <button
        onClick={() => {
          deleteExpense(expense.id);
        }}
      >
        <MdDelete />
      </button>
    </div>
  );
};
