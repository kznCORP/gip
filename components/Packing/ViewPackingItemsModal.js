import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";
import { AuthUserContext } from "@/lib/authContext";
import { Trash2 } from "lucide-react";

export const ViewPackingItemsModal = ({ packingItem }) => {
  const { deletePackingItem, deletePackingCategory, updateCheckbox } =
    useContext(PackingContext);
  const { user } = useContext(AuthUserContext);

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
      <div className="flex items-center gap-4 border-b p-4">
        <h2 className="text-xl font-bold ">{packingItem?.packingCategory}</h2>
        <button
          type="button"
          onClick={() => deletePackingCategoryHandler(packingItem.id)}
        >
          <Trash2 />
        </button>
      </div>

      <div>
        {packingItem &&
          packingItem.items &&
          packingItem.items.map((item) => {
            return (
              <div
                key={item.id}
                className="mb-2 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="check"
                    checked={item.checked}
                    className="h-5 w-5 rounded border text-white checked:bg-blue-600 hover:appearance-none hover:ring-2 hover:ring-blue-600"
                    onChange={() => checkBoxHandler(item)}
                  />
                  <h3>{item.name}</h3>
                </div>
                <h3>{user?.displayName}</h3>
                <button
                  type="button"
                  onClick={() => deletePackingItemHandler(item)}
                >
                  <Trash2 />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};
