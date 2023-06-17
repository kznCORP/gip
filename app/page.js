"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { Navigation } from "@/components/navigation";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

import { DatePickerWithRange } from "@/components/ui/datepicker";

/**
 * Be proud of what you've done.
 *
 * [x] Create a Packing Categroy similar to Expenses
 * [x] Read data from Firebase, store into app -> display UI
 * [x] Add item to an array of items within a Packing Category
 * [x] Delete Packing Category
 * [x] Delete an item from an array of items in Packing Category
 * [x] Add Checkbox state to Packing Items
 *
 *
 * Up Next.
 *
 * [ ] Create the Schedule feature
 *    [x] Location
 *    [x] Pick Dates and Range
 *    [ ]
 * [ ] Take user input from client and store into Firebase
 * [ ] Read data from Firebase and display UI
 *
 *
 * Always Look To.
 * [ ] Stress test the feature, find any bugs
 * [ ] Improve UI
 * [ ] Optimize code for minimal read and writes to Firebase.
 *
 */

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);

  const [title, setTitle] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <Navigation />

      <section className="mb-24 mt-5 px-4">
        <section>
          <h2 className="text-4xl font-bold">Schedule</h2>
          <p className="leading-2 mt-4 text-xs text-gray-400">
            Make planning an event so easy all you have to do is just show up.
          </p>
        </section>

        {/* Modal Toggle */}
        <section>
          <form>
            {title && (
              <label className="leading-2 text-xs text-gray-400">Title</label>
            )}
            <div className="my-2 flex items-center gap-4">
              <input
                type="text"
                placeholder="What are you thinking of doing?..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* Activity Title */}
            {title && (
              <>
                <label className="leading-2 text-xs text-gray-400">
                  Location
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Where to?..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white "
                  >
                    Search
                  </button>
                </div>
              </>
            )}

            {/* Search Results */}
            {title && searchInput && (
              <div className="mt-4">
                <p className="leading-2 mb-2 text-xs text-gray-400">Dates</p>
                <DatePickerWithRange />
              </div>
            )}
          </form>
        </section>
      </section>

      <Expenses />
      <PackingList />
    </>
  );
}
