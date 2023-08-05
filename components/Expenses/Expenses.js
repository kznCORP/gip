"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Doughnut, Line } from "react-chartjs-2";
import { PlusCircle, TrendingUp, XCircle, Lightbulb } from "lucide-react";

import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { CHART_OPTIONS, currencyFormatter } from "@/lib/utils";
import { AddExpenseModal } from "@/components/Expenses/AddExpenseModal";

import { FinanceContext } from "@/lib/financeContext";
import { AuthUserContext } from "@/lib/authContext";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

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

  const lineChartData = {
    labels: expenses.reduce((labels, expense) => {
      expense.items.forEach((item) => {
        const cumulativeBalance =
          labels.length > 0
            ? labels[labels.length - 1] + item.amount
            : item.amount;
        labels.push(cumulativeBalance);
      });
      return labels;
    }, []),
    datasets: [
      {
        data: expenses.reduce((labels, expense) => {
          expense.items.forEach((item) => {
            const cumulativeBalance =
              labels.length > 0
                ? labels[labels.length - 1] + item.amount
                : item.amount;
            labels.push(cumulativeBalance);
          });
          return labels;
        }, []),
        fill: false,
        borderColor: "rgba(74,222,128,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <AddExpenseModal
        onShow={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />

      <section className="relative mb-24 px-4" id="expenses">
        {/* Add Expense */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-3xl  font-medium">Expenses</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              <button
                data-modal-target="authentication-modal"
                className="flex  items-center   gap-2   rounded-full bg-blue-600 text-sm font-medium text-white"
                onClick={() => setShowAddExpenseModal(true)}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="my-5 flex items-center justify-between rounded-lg bg-violet-50 p-5">
            <p className="text-xs leading-snug">
              Displays all expenses paid - organized in labels, allocating each
              expense history within the categories. For example: Food &rarr;
              Walmart: $57.12, Chipotle: $16.52, Bubble Tea: $7.84
            </p>
            <XCircle className="h-5 w-5 flex-shrink-0" />
          </div>
        </section>

        {/* Total Spendings */}
        <section>
          <div className="my-6 rounded-lg bg-gray-900 p-6">
            <h3 className="text-sm font-medium text-white">Total Spendings</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xl font-medium text-white">
                {currencyFormatter(balance)}
              </p>
              <TrendingUp className=" h-8 w-8 text-green-400" />
            </div>

            {expenses.length > 0 && (
              <Line
                data={lineChartData}
                options={CHART_OPTIONS}
                className="mt-5"
                height={100}
              />
            )}
          </div>
        </section>

        {/* List of Expenses */}
        <section>
          <div className="mb-8 mt-10 flex justify-between ">
            <h4 className="text-lg font-medium  text-gray-800">Categories</h4>
          </div>
          {/* Expense Container */}
          <div className="flex flex-col">
            {expenses.length == 0 && (
              <button
                type="button"
                onClick={() => setShowAddExpenseModal(true)}
                className="flex items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 p-10"
              >
                <PlusCircle className="h-4 w-4 text-gray-400" strokeWidth={2} />
                <p className="text-sm text-gray-400">Add New Expense</p>
              </button>
            )}

            {expenses.map((expense, index) => (
              <ExpenseCategoryItem key={index} expense={expense} />
            ))}
          </div>
        </section>

        {/* Charts */}
        {expenses.length > 0 && (
          <section className="mt-24">
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
                options={{
                  responsive: true,
                  elements: {
                    arc: {
                      borderWidth: 5, // Customize the border width of the arcs
                      borderColor: "#ffffff", // Customize the border color of the arcs
                    },
                  },
                }}
                height={200}
              />
            </div>
          </section>
        )}
      </section>
    </>
  );
};
