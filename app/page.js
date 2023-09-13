"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import Header from "@/components/Header";

import { Navigation } from "@/components/navigation.js";
import { Schedules } from "@/components/Schedule/Schedules";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  /**
   *
   *  Current Progress:
   *  See Expenses Modal for latest progression with to-do comments.
   *
   *
   *  [ Bug ]
   *  During initial render, Hydration failed because page.js' initial UI doesn't match what is in the server.
   *
   * */

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full lg:max-w-screen-md xl:max-w-screen-lg">
          <Header />
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
 *
 * Up Next.
 *
 *  [ ] Add media breakpoints for transitioning to Desktop View.
 *    [ ] Packing List
 *    [ ] Expenses
 *    [ ] Schedule
 *
 *
 * [.] Stress test, bug hunt; refactor and fix.
 * [.] Optimize Read and Writes for Application
 */
