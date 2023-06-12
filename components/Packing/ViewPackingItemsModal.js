import React, { useContext } from "react";
import { PackingContext } from "@/lib/packingContext";
import { MdDelete } from "react-icons/md";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingItem } = useContext(PackingContext);

  const deletePackingItemHandler = async (item) => {
    try {
      // Remove item from list
      const updatedItems = packingItem.items.filter((i) => i.id !== item.id);

      const updatedPackingItems = {
        items: [...updatedItems],
      };

      await deletePackingItem(packingItem.id, updatedPackingItems);
    } catch (e) {
      console.log("Error in deleting Packing Item", e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{packingItem?.packingCategory}</h2>
      </div>

      <div>
        {packingItem &&
          packingItem.items &&
          packingItem.items.map((item) => {
            return (
              <div
                key={item.id}
                className="mb-2 flex items-center justify-between gap-4 bg-slate-300 text-black"
              >
                <h3>{item.name}</h3>
                <button
                  type="button"
                  onClick={() => deletePackingItemHandler(item)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};
