import React, { useContext } from "react";
import { PackingContext } from "@/lib/packingContext";
import { Trash2 } from "lucide-react";
import PackingItem from "./PackingItem";

import { Icons } from "../Icons";

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
      <section>
        {/* Packing Category */}
        <div className="flex justify-between gap-6 rounded-lg bg-white p-5 shadow">
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-lg p-4"
            style={{ backgroundColor: `${packingItem.color}` }}
          >
            <div className="h-[25px] w-[25px]">
              <Icons iconName={packingItem.icon} iconColor="white" />
            </div>
          </div>

          {/* Title */}
          <div className="flex w-full flex-col items-start justify-center">
            <h2 className="font-medium">{packingItem?.packingCategory}</h2>
            <h2 className="text-xs text-gray-400">View All</h2>
          </div>

          {/* Items */}
          <div className="flex items-center justify-center gap-4 p-5">
            <button
              type="button"
              onClick={() => deletePackingCategoryHandler(packingItem.id)}
            >
              <Trash2 className="h-4 w-4" strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Packing Items */}
        {/* <div>
          {packingItem && 
            packingItem.items &&
            packingItem.items.map((item) => (
              <PackingItem category={packingItem} item={item} key={item.id} />
            ))}
        </div> */}
      </section>
    </>
  );
};
