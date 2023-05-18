import { MdOutlineAdd } from "react-icons/md";

import { currencyFormatter } from "../lib/utils";

export default function Home() {
  return (
    <>
      <main className="px-4">
        <section>
          <h2 className="text-4xl font-bold">Expenses</h2>
          <div className="my-5">
            <small className="text-md text-gray-400">Total Amt. Spent</small>
            <p>{currencyFormatter(1234.56)}</p>
          </div>
        </section>

        <section>
          <button className="text-md my-5 flex   items-center   gap-2 rounded-lg bg-blue-600 p-3 font-medium text-white">
            Add Expense <MdOutlineAdd className="text-xl" />
          </button>
        </section>

        {/* List of Expenses */}
        <section>
          <h3 className="text-xl text-gray-400">List of expenses</h3>

          {/* Expense Item */}
          <div className="flex items-center justify-between rounded-lg bg-slate-600 px-2 py-3 text-white">
            {/* Price */}
            <div>
              <p className="text-sm">{currencyFormatter(500)}</p>
            </div>

            {/* Name */}
            <div>
              <p className="text-sm">Marukame Udon</p>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2">
              <div className="h-[15px] w-[15px] rounded-full bg-red-400 " />
              <p className="text-sm font-medium">Food</p>
            </div>

            {/* Date */}
            <div>
              <p className="text-sm">May 17, 2023</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
