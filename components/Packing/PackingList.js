"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { PackingContext } from "@/lib/packingContext";
import { AddPackItemModal } from "@/components/Packing/AddPackItemModal";
import { ViewPackingItemsModal } from "@/components/Packing/ViewPackingItemsModal";

import { PlusCircle, XCircle } from "lucide-react";

export const PackingList = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { packingItems, getTotalPackedPercentage, getUnboughtItems } =
    useContext(PackingContext);

  const [showAddPackListModal, setShowAddPackListModal] = useState("");

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
        onShow={showAddPackListModal}
        onClose={() => setShowAddPackListModal(false)}
      />
      <section className="mb-48 px-4" id="packing-list">
        {/* Add Packing Item */}
        <section className="sticky top-0 z-10 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-3xl font-medium">Packing List</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              <button
                data-modal-target="authentication-modal"
                className="flex  items-center   gap-2   rounded-full bg-blue-600 text-sm font-medium text-white"
                onClick={() => setShowAddPackListModal(true)}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Today's Progress */}
        <section className="mb-8 mt-6 flex flex-col justify-start rounded-lg bg-white p-6 shadow">
          <h4 className="text-sm font-medium text-gray-800">Total Progress</h4>
          <h4 className="text-sm font-medium text-gray-300">All Items</h4>

          <div className="mb-4 mt-8 grid grid-cols-4  gap-1">
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
            <div className="col-span-1 h-16 bg-gray-100"></div>
          </div>
        </section>

        {/* Packing List */}
        <section>
          <div className="mb-8 mt-16">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">
                All Categories
              </h4>
              <h4 className="text-sm font-medium text-gray-300">
                Packing List
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {packingItems.map((item, index) => (
              <ViewPackingItemsModal key={index} packingItem={item} />
            ))}
          </div>
        </section>

        {packingItems.length == 0 && (
          <button
            type="button"
            onClick={() => setShowAddPackListModal(true)}
            className="flex w-full items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 p-10"
          >
            <PlusCircle className="h-4 w-4 text-gray-400" strokeWidth={2} />
            <p className="text-sm text-gray-400">Add New Packing Item</p>
          </button>
        )}

        <section>
          <div className="mb-8 mt-16 ">
            <h4 className="text-sm font-medium text-gray-700">Items to Buy</h4>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4">
            {unboughtItems.map((item) => (
              <div
                key={item.id}
                className="rounded-full bg-indigo-100 px-4 py-2"
              >
                <p className="text-xs font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};
