"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { Navigation } from "@/components/navigation";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

/**
 * Be proud of what you've done.
 *
 * [x] Create a Packing Categroy similar to Expenses
 * [x] Read data from Firebase, store into app -> display UI
 * [x] Add item to an array of items within a Packing Category
 * [x] Delete Packing Category
 * [x] Delete an item from an array of items in Packing Category
 * [x] Add Checkbox state to Packing Items (Progress is in ViewPackingItemsModal)
 * [x] Stress test the feature, find any bugs
 * [x] Improve UI
 * [x] Optimize code for minimal read and writes to Firebase.
 *
 *
 *  Up Next.
 *
 * [ ] Create the Schedule feature
 * [ ] Take user input from client and store into Firebase
 * [ ] Read data from Firebase and display UI
 *
 */

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <Navigation />
      <Expenses />
      <PackingList />
    </>
  );
}
