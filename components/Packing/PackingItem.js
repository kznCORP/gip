import React, { useContext, useState } from "react";

import { AuthUserContext } from "@/lib/authContext";
import { PackingContext } from "@/lib/packingContext";

import { Trash2 } from "lucide-react";
import { initialsFormatter } from "@/lib/utils";

export const PackingItem = ({ item }) => {
  const { deletePackingItem, updateCheckbox } = useContext(PackingContext);
  const { user } = useContext(AuthUserContext);

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
    <div className="mb-4 flex gap-6">
      <div className="flex w-full justify-between rounded-xl border-l-2 border-blue-400 bg-blue-50 px-4 py-2.5">
        <div className="flex items-center justify-between border">
          <input
            type="checkbox"
            name="check"
            checked={item.checked}
            className="h-4 w-4 rounded-xl border text-white"
            onChange={() => checkBoxHandler(item)}
          />
          <h3 className="ml-24 text-sm font-medium text-gray-600">
            {item.name}
          </h3>
        </div>

        <div>
          <p className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
            {initialsFormatter(user?.displayName)}
          </p>
        </div>
      </div>

      <button type="button" onClick={() => deletePackingItemHandler(item)}>
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PackingItem;
