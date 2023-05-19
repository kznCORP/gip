"use client";

import { useState, useRef } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MdOutlineAdd } from "react-icons/md";

import { currencyFormatter } from "@/lib/utils";
import { ExpenseCategoryItem } from "@/components/Expenses/ExpenseCategoryItem";
import { Modal } from "@/components/Modal";

import { addNewExpense } from "@/lib/firebase/firestore";

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
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAllExpenseModal, setShowAllExpenseModal] = useState(false);
  const amountRef = useRef();
  const title = useRef();

  // Add a new Expense to Firebase
  const addExpenseHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      title: title.current.value,
      amount: amountRef.current.value,
      date: new Date(),
    };

    addNewExpense(newExpense.title, newExpense.amount, newExpense.date);
  };

  return (
    <>
      {/* Add Expenses */}
      <Modal onShow={showAddExpenseModal} onClose={setShowAddExpenseModal}>
        <form onSubmit={addExpenseHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Name of Expense</label>
            <input
              type="text"
              name="title"
              ref={title}
              placeholder="Enter the name of the expense"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter Amount"
              required
            />
          </div>
          <button type="submit" className="text-md bg-blue-600 p-3">
            Submit
          </button>
        </form>
      </Modal>

      {/* View All Expenses */}
      <Modal onShow={showAllExpenseModal} onClose={setShowAllExpenseModal}>
        <h3>All Expenses will be viewed here.</h3>
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
              Add Expense <MdOutlineAdd className="text-xl" />
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
