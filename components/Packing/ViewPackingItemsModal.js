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
      <section className="flex flex-col justify-center gap-2">
        {/* Packing Category */}
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold">
            {packingItem?.packingCategory}
          </h2>
          <button
            type="button"
            onClick={() => deletePackingCategoryHandler(packingItem.id)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className=" flex flex-col items-start">
          <div className="flex w-full items-center">
            <div className="h-[50px] w-full rounded-full bg-gray-100">
              <div
                className="flex h-[50px] w-full rounded-full"
                style={{
                  width: `${percentage(categoryItems)}%`,
                  maxWidth: "100%",
                  backgroundColor: `${packingItem.color}`,
                }}
              ></div>
            </div>
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

{
  /* <div>
  <p className="text-xs text-gray-400">{`${categoryItems}`}</p>
</div> */
}
