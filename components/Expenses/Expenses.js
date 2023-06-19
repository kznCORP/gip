"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdAdd } from "react-icons/md";

import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { currencyFormatter } from "@/lib/utils";
import { AddExpenseModal } from "@/components/Expenses/AddExpenseModal";

import { FinanceContext } from "@/lib/financeContext";
import { AuthUserContext } from "@/lib/authContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Expenses = () => {
  const router = useRouter();
  const { expenses } = useContext(FinanceContext);
  const { user, loading } = useContext(AuthUserContext);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }

    const newBalance = expenses.reduce((total, e) => {
      return (total += e.total);
    }, 0);

    setBalance(newBalance);
  }, [expenses, router, user, loading]);

  return (
    <>
      <AddExpenseModal
        onShow={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />

      <section className="px-4">
        <section>
          <h2 className="text-4xl font-bold">Expenses</h2>
          <div className="my-5">
            <small className="text-md text-gray-400">Total Amt. Spent</small>
            <p className="text-lg font-bold">{currencyFormatter(balance)}</p>
          </div>
        </section>

        {/* Modal Toggle */}
        <section>
          <div className="flex gap-4">
            <button
              data-modal-target="authentication-modal"
              className="text-md mb-5  flex   items-center   gap-2 rounded-lg bg-blue-600 p-3 font-medium text-white"
              onClick={() => setShowAddExpenseModal(true)}
            >
              Add Expense <MdAdd className="text-xl" />
            </button>
          </div>
        </section>

        {/* List of Expenses */}
        <section>
          <div className="my-8 flex justify-between ">
            <small className=" text-md text-gray-400">Category</small>
            <small className=" text-md text-gray-400 ">Total</small>
          </div>
          {/* Expense Container */}
          <div className="flex flex-col gap-4">
            {expenses.map((expense, index) => (
              <ExpenseCategoryItem key={index} expense={expense} />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="py-10">
          <h3 className="mb-6 text-lg text-gray-500">Charts</h3>

          <div>
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
        </section>
      </section>
    </>
  );
};
