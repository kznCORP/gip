"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { Navigation } from "@/components/navigation";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { Map } from "@/components/Schedule/Map";

/**
 *
 * To-Do today:
 *
 * [x] Install @react-google-maps/api & use-places-autocomplete
 * [x] Load Google Maps onto the website
 * [x] Apply Searchbox Input and generate Places
 *
 * [ ] Store data into Firebase
 *
 */

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <Navigation />

      <section className="mb-24 mt-4 px-4">
        <section>
          <h2 className="text-4xl font-bold">Schedule</h2>
        </section>

        {/* Modal Toggle */}
        <section className="mt-4">
          <form>
            <label className="leading-2 text-xs">Title</label>
            <div className="my-2 flex items-center gap-4">
              <Input
                type="text"
                placeholder="What are you thinking of doing?..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Maps & Places API */}
            <label className="leading-2 text-xs">Location</label>
            <div className="h-full w-full">
              <Map />
            </div>

            {/* Search Results */}
            <div className="mt-4">
              <p className="leading-2 mb-2 text-xs">Dates</p>
              <DatePickerWithRange />
            </div>
          </form>
        </section>
      </section>

      <Expenses />
      <PackingList />
    </>
  );
}

/**
 *
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
 *    [x] Title form
 *    [x] Location form
 *    [ ] Search addresses based on location input
 *        [x] Display an Interactive Map
 *        [ ] Apple Maps / Google Maps clickable link
 *
 * [ ] Read user input from client (title, location, dates, etc.) and store into Firebase
 * [ ] Read data from Firebase and display UI
 */
