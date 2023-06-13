import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";
import { MdDelete } from "react-icons/md";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingItem, deletePackingCategory, updateCheckbox } =
    useContext(PackingContext);

  const deletePackingCategoryHandler = async () => {
    try {
      await deletePackingCategory(packingItem.id);
    } catch (e) {
      console.log("Error in deleting Packing Category", e);
    }
  };

  const deletePackingItemHandler = async (item) => {
    try {
      const updatedItems = packingItem.items.filter((i) => i.id !== item.id);

      const updatedPackingItems = {
        items: [...updatedItems],
      };

      await deletePackingItem(packingItem.id, updatedPackingItems);
    } catch (e) {
      console.log("Error in deleting Packing Item", e);
    }
  };

  const checkBoxHandler = async (item) => {
    try {
      const updatedItem = {
        ...item,
        checked: !item.checked,
      };
      await updateCheckbox(packingItem.id, updatedItem);
    } catch (e) {
      console.log("Error in item checkbox", e);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">{packingItem?.packingCategory}</h2>
        <button
          type="button"
          onClick={() => deletePackingCategoryHandler(packingItem.id)}
        >
          <MdDelete />
        </button>
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
                <input
                  type="checkbox"
                  name="check"
                  checked={item.checked}
                  onChange={() => checkBoxHandler(item)}
                />
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
