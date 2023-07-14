import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";
import { Trash2 } from "lucide-react";
import PackingItem from "./PackingItem";

import { percentage } from "@/lib/utils";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingCategory, getPackedItemsForCategory } =
    useContext(PackingContext);

  const categoryItems = getPackedItemsForCategory(packingItem.id);

  const deletePackingCategoryHandler = async () => {
    try {
      await deletePackingCategory(packingItem.id);
    } catch (e) {
      console.log("Error in deleting Packing Category", e);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center gap-6 rounded-xl bg-gray-50 px-6 py-8 drop-shadow">
        {/* Packing Category */}
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">
            {packingItem?.packingCategory}
          </h2>
          <button
            type="button"
            onClick={() => deletePackingCategoryHandler(packingItem.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col items-start">
          <div>
            <p className="mb-4 text-xs text-gray-400">{`${categoryItems} items`}</p>
          </div>
          <div className="flex w-full items-center">
            <div className="h-2 w-2/3 rounded bg-gray-100">
              <div
                className="h-2 rounded bg-blue-400 "
                style={{
                  width: `${percentage(categoryItems)}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Packing Items */}
        <div>
          {packingItem &&
            packingItem.items &&
            packingItem.items.map((item) => (
              <PackingItem category={packingItem} item={item} key={item.id} />
            ))}
        </div>
      </section>
    </>
  );
};
