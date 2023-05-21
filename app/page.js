"use client";

import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdAdd } from "react-icons/md";

import { currencyFormatter } from "@/lib/utils";
import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { Modal } from "@/components/Modal";

import { getAllExpenses } from "@/lib/firebase/firestore";

import { AllExpenseItems } from "@/components/Expenses/AllExpenseItems";
import { AddExpenseModal } from "@/components/Expenses/AddExpenseModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_DATA = [
  {
    id: 1,
    title: "Food",
    total: 300.0,
    color: "#00c8ff",
  },
  {
    id: 2,
    title: "Entertainment",
    total: 500.0,
    color: "#ff3700",
  },
  {
    id: 3,
    title: "Gas",
    total: 250.0,
    color: "#46dfb4",
  },
  {
    id: 4,
    title: "Shopping",
    total: 1000.0,
    color: "#ff00c8",
  },
  {
    id: 5,
    title: "Rentals",
    total: 450.0,
    color: "#0000ff",
  },
  {
    id: 6,
    title: "AirBnB",
    total: 1150.0,
    color: "#ff9d2c",
  },
];

export default function Home() {
  const [allExpenses, setAllExpenses] = useState([]);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAllExpenseModal, setShowAllExpenseModal] = useState(false);

  // View all Expenses from Firebase
  useEffect(() => {
    const fetchAllExpenses = async () => {
      const unsubscribe = await getAllExpenses(setAllExpenses);

      return () => unsubscribe();
    };
    fetchAllExpenses();
  }, [setAllExpenses]);

  return (
    <>
      <AddExpenseModal
        onShow={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />

      {/* View All Expenses */}
      <Modal onShow={showAllExpenseModal} onClose={setShowAllExpenseModal}>
        <h3>All Expenses will be viewed here.</h3>
        {allExpenses.map((e) => (
          <AllExpenseItems key={e.id} expense={e} />
        ))}
      </Modal>

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
            {DEFAULT_DATA.map((expense) => (
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
                labels: DEFAULT_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DEFAULT_DATA.map((expense) => expense.total),
                    backgroundColor: DEFAULT_DATA.map(
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
