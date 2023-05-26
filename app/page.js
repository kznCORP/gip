"use client";

import { useContext, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdAdd } from "react-icons/md";

import { currencyFormatter } from "@/lib/utils";
import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { AddExpenseModal } from "@/components/Expenses/AddExpenseModal";
import { ViewExpenseHistoryModal } from "@/components/Expenses/ViewExpenseHistoryModal";

import { financeContext } from "@/lib/financeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAllExpenseModal, setShowAllExpenseModal] = useState(false);

  const { expenses, expCategory } = useContext(financeContext);

  return (
    <>
      <AddExpenseModal
        onShow={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpenseHistoryModal
        onShow={showAllExpenseModal}
        onClose={() => setShowAllExpenseModal(false)}
      />

      {/* Main  */}
      <main className="px-4">
        <section>
          <h2 className="text-4xl font-bold">Expenses</h2>
          <div className="my-5">
            <small className="text-md text-gray-400">Total Amt. Spent</small>
            <p className="text-lg font-bold">{currencyFormatter(2345.78)}</p>
          </div>
        </section>

        {/* Modal Toggle */}
        <section>
          <div className="flex gap-4">
            <button
              data-modal-target="authentication-modal"
              className="text-md mb-10  flex   items-center   gap-2 rounded-lg bg-blue-600 p-3 font-medium text-white"
              onClick={() => setShowAddExpenseModal(true)}
            >
              Add Expense <MdAdd className="text-xl" />
            </button>
            <button
              data-modal-target="authentication-modal"
              className="text-md mb-10  flex   items-center   gap-2 rounded-lg p-3 font-medium text-blue-600 underline"
              onClick={() => setShowAllExpenseModal(true)}
            >
              View All Expenses
            </button>
          </div>
        </section>

        {/* List of Expenses */}
        <section>
          <h3 className="mb-6 text-lg text-gray-500">List of expenses</h3>
          <div className="mb-4 flex justify-between ">
            <small className=" text-md text-gray-400">Category</small>
            <small className=" text-md text-gray-400 ">Total</small>
          </div>
          {/* Expense Container */}
          <div className="flex flex-col gap-4">
            {expCategory.map((expense) => (
              <ExpenseCategoryItem
                key={expense.id}
                title={expense.title}
                {...expense}
              />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="py-10">
          <h3 className="mb-6 text-lg text-gray-500">Charts</h3>

          <div>
            <Doughnut
              data={{
                labels: expCategory.map((expense) => expense.title),
                datasets: [
                  {
                    label: "expenses",
                    data: expCategory.map((expense) => expense.total),
                    backgroundColor: expCategory.map(
                      (expense) => expense.color
                    ),
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
