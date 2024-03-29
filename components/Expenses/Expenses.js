"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { PlusCircle, XCircle } from "lucide-react";

import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { AddExpenseModal } from "@/components/Expenses/AddExpenseModal";

import { FinanceContext } from "@/lib/financeContext";
import { AuthUserContext } from "@/lib/authContext";
import { ModalContext } from "@/lib/modalContext";

import { CHART_OPTIONS, currencyFormatter } from "@/lib/utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.defaults.font.family = "Arial";
ChartJS.defaults.font.weight = 700;
ChartJS.defaults.font.size = 13;

export const Expenses = () => {
  const router = useRouter();
  const { expenses } = useContext(FinanceContext);
  const { user, loading } = useContext(AuthUserContext);
  const { isModalOpen, clickedModal } = useContext(ModalContext);

  const [balance, setBalance] = useState(0);

  const lineChartData = {
    labels: expenses.map((expense) => expense.title),
    datasets: [
      {
        label: "Total: ",
        data: expenses.map((expense) => expense.total),
        backgroundColor: expenses.map((expense) => expense.color),
        base: 5,
        borderRadius: 5,
        barThickness: 75,
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

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
        onShow={isModalOpen == "add-expense-item"}
        onClose={() => clickedModal(false)}
      />

      <article className="mb-24 px-4" id="expenses">
        {/* Add Expense */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-xl  font-medium">Expenses</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              {!isModalOpen && (
                <button
                  data-modal-target="authentication-modal"
                  className="flex  items-center   gap-2   rounded-full bg-blue-600 text-sm font-medium text-white"
                  onClick={() => clickedModal("add-expense-item")}
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* <section>
          <div className="my-5 flex items-center justify-between rounded-lg bg-violet-50 p-5">
            <p className="text-xs leading-snug">
              Displays all expenses paid - organized in labels, allocating each
              expense history within the categories. For example: Food &rarr;
              Walmart: $57.12, Chipotle: $16.52, Bubble Tea: $7.84
            </p>
            <XCircle className="h-5 w-5 flex-shrink-0" />
          </div>
        </section> */}

        <section className="mb-8 mt-6 flex flex-col justify-start rounded-lg bg-white p-6">
          <div>
            <h4 className="text-sm font-medium text-gray-800">
              Total Spendings
            </h4>
            <h4 className="text-sm font-medium text-gray-300">All Expenses</h4>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-800">
              {currencyFormatter(balance)}
            </p>
          </div>

          <Bar
            data={lineChartData}
            options={CHART_OPTIONS}
            className="mt-12"
            height={75}
          />
        </section>

        {/* List of Expenses */}
        <section>
          <div className="mb-8 mt-16">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-gray-400">
                Categories
              </h4>
              <h4 className="text-xs font-medium uppercase text-gray-300">
                Expenses
              </h4>
            </div>
          </div>

          {/* Expense Container */}
          {expenses.length == 0 && (
            <button
              type="button"
              onClick={() => clickedModal("add-expense-item")}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white py-8"
            >
              <PlusCircle className="h-5 w-5" strokeWidth={2} />
              <p className="text-sm font-medium ">Add Expense</p>
            </button>
          )}

          <div className="flex flex-col flex-wrap md:flex-row ">
            {expenses.map((expense, index) => (
              <ExpenseCategoryItem key={index} expense={expense} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
};
