"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthUserContext } from "@/lib/authContext";
import { PackingContext } from "@/lib/packingContext";
import { ModalContext } from "@/lib/modalContext";

import { AddPackItemModal } from "@/components/Packing/AddPackItemModal";
import { PackingCategoryItem } from "@/components/Packing/PackingCategoryItem";

import { PlusCircle, XCircle } from "lucide-react";
import ProgressIcons from "./ProgressIcons";

export const PackingList = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { isModalOpen, clickedModal } = useContext(ModalContext);
  const { packingItems, getTotalPackedPercentage, getUnboughtItems } =
    useContext(PackingContext);

  const totalPercentage = getTotalPackedPercentage();
  const unboughtItems = getUnboughtItems();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <AddPackItemModal
        onShow={isModalOpen == "add-packing-item"}
        onClose={() => clickedModal(false)}
      />

      <article className="mb-24 px-4" id="packing-list">
        {/* Add Packing Item */}
        <section className="sticky top-0 z-10 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-xl font-medium">Packing List</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              {!isModalOpen && (
                <button
                  data-modal-target="authentication-modal"
                  className="flex  items-center   gap-2   rounded-full bg-blue-600 text-sm font-medium text-white"
                  onClick={() => clickedModal("add-packing-item")}
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
              Displays items needed to be brought and bought throughout the
              course of the events and activities planned.
            </p>
            <XCircle className="h-5 w-5 flex-shrink-0" />
          </div>
        </section> */}

        {/* Today's Progress */}
        <section className="mb-8 mt-6 flex flex-col justify-start rounded-lg bg-white px-6 py-8 ">
          <h4 className="text-sm font-medium text-gray-800">Total Progress</h4>
          <h4 className="text-sm font-medium text-gray-300">All Items</h4>

          <div className="mb-4 mt-8 grid grid-cols-4">
            {packingItems.map((item, index) => (
              <ProgressIcons
                item={item}
                index={index}
                key={index}
                categoriesLength={packingItems.length}
              />
            ))}
          </div>
        </section>

        {/* Packing List */}
        <section>
          <div className="mb-8 mt-16">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-gray-400">
                Categories
              </h4>
              <h4 className="text-xs font-medium uppercase text-gray-300">
                Packing List
              </h4>
            </div>
          </div>
          <div className="flex flex-col flex-wrap md:flex-row">
            {packingItems.map((item, index) => (
              <PackingCategoryItem key={index} packingItem={item} />
            ))}
          </div>
        </section>

        {packingItems.length == 0 && (
          <button
            type="button"
            onClick={() => clickedModal("add-packing-item")}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white py-8"
          >
            <PlusCircle className="h-5 w-5" strokeWidth={2} />
            <p className="text-sm font-medium">Add Item</p>
          </button>
        )}

        <section>
          <div className="mb-8 mt-16">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-gray-400">
                Things to Buy
              </h4>
              <h4 className="text-xs font-medium uppercase text-gray-300">
                Packing List
              </h4>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4">
            {unboughtItems.map((item) => (
              <div
                key={item.id}
                className="rounded-full bg-indigo-100 px-4 py-2"
              >
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
};
