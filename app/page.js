"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ModalContext } from "@/lib/modalContext";

import { Sidebar } from "@/components/sidebar";
import { Navigation } from "@/components/navigation.js";
import { Schedules } from "@/components/Schedule/Schedules";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { isModalOpen } = useContext(ModalContext);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  /**
   *
   *  Current Progress:
   *  [ ] Improve Laptop and Desktop UI & Spacing (maybe extra components for pieces of information)
   *
   * */

  return (
    <>
      <div className="inline-flex w-full">
        <Sidebar />

        <div
          className={`lg:pl-52 ${isModalOpen ? "md:w-1/2 lg:w-2/3" : "w-full"}`}
        >
          <Navigation />
          <Schedules />
          <Expenses />
          <PackingList />
        </div>
      </div>
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
 * [x] Install @react-google-maps/api & use-places-autocomplete
 * [x] Load Google Maps onto the website
 * [x] Apply Searchbox Input and generate Places
 *
 * [x] Create the Schedule feature
 *    [x] Schedule Input
 *        [x] Title form
 *        [x] Location form
 *        [x] Search addresses based on location input
 *            [x] Display an Interactive Map
 *            [x] Apple Maps / Google Maps clickable link
 *        [x] Date & Time Picker
 *
 *    [x] Filter Schedules
 *    [x] Delete a Schedule
 *    [ ] Edit the Schedule
 *
 * [x] Read user input from client (title, location, dates, etc.) and store into Firebase
 * [x] Read data from Firebase and display UI
 *
 * [x] Refactor Modal to display desired design in Figma
 * [x] Move Schedule form/input into a new component (AddScheduleModal)
 * [x] Create two different Modals, one for adding and one for viewing.
 *
 * [x] Create the Packing List Feature
 * [x] Improve UI
 * [x] Input for who's bringing what.
 * [x] Colored Categories
 * [x] Reminder to Buy
 * [x] Refactor Styling to be more simple and clean.
 *
 * [x] Change Login / Logout UI
 * [x] Create list of color presets
 *      [x] Add + button that displays color input for customization
 * [x] Create choice of Icons
 *
 *
 * [x] Add media breakpoints for transitioning to Tablet View.
 *    [x] Packing List
 *    [x] Expenses
 *    [x] Schedule
 *
 * [x] Add media breakpoints for transitioning to Desktop View.
 *    [x] Packing List
 *    [x] Expenses
 *    [x] Schedule
 *
 * [x] Create a left Sidebar Menu
 *    [x] Sidebar Laptop View
 *    [x] Sidebar Desktop View
 *    [x] Sidebar Menu and Navigation containing User Profile
 *
 *
 * Up Next.
 *
 *
 *
 * [.] Stress test, bug hunt; refactor and fix.
 * [.] Optimize Read and Writes for Application
 */
