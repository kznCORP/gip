import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";
import { Trash2 } from "lucide-react";
import PackingItem from "./PackingItem";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingCategory, getPackedPercentageForCategory } =
    useContext(PackingContext);

  const categoryPercentage = getPackedPercentageForCategory(packingItem.id);

  const deletePackingCategoryHandler = async () => {
    try {
      await deletePackingCategory(packingItem.id);
    } catch (e) {
      console.log("Error in deleting Packing Category", e);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center gap-4 rounded-xl border px-6 py-8">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">
            {packingItem?.packingCategory}
          </h2>
          <button
            type="button"
            onClick={() => deletePackingCategoryHandler(packingItem.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div>
          <p className="text-xs text-gray-400">Things to bring</p>
        </div>

        <div>
          {packingItem &&
            packingItem.items &&
            packingItem.items.map((item, index) => (
              <PackingItem category={packingItem} item={item} key={index} />
            ))}
        </div>

        <div className="flex items-center">
          <div className="h-2 w-2/3 rounded bg-gray-100">
            <div
              className="h-2 rounded bg-orange-300 "
              style={{
                width: `${categoryPercentage}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
          <p className="ml-2 text-xs font-medium text-gray-400">{`${categoryPercentage.toFixed(
            0
          )}%`}</p>
        </div>
      </section>
    </>
  );
};
