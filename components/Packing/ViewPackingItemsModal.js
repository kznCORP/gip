import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";
import { Trash2 } from "lucide-react";
import PackingItem from "./PackingItem";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingCategory } = useContext(PackingContext);

  const deletePackingCategoryHandler = async () => {
    try {
      await deletePackingCategory(packingItem.id);
    } catch (e) {
      console.log("Error in deleting Packing Category", e);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center gap-4 rounded-xl border p-6">
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
              <PackingItem item={item} key={index} />
            ))}
        </div>
      </section>
    </>
  );
};
