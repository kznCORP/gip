import React, { useContext, useState } from "react";

import { PackingContext } from "@/lib/packingContext";

import { Circle, CheckCircle, Trash2, ShoppingBag } from "lucide-react";
import { initialsFormatter } from "@/lib/utils";

export const PackingItem = ({ category, item }) => {
  const { deletePackingItem, updateCheckbox, updateBought } =
    useContext(PackingContext);

  const [authorColor, setAuthorColor] = useState(() => {
    const storedColor = localStorage.getItem(`author_color_${item.user}`);
    if (storedColor) {
      return storedColor;
    }

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    localStorage.setItem(`author_color_${item.user}`, randomColor);
    return randomColor;
  });

  const deletePackingItemHandler = async (item) => {
    try {
      const updatedItems = category.items.filter((i) => i.id !== item.id);
      const updatedPackingItems = {
        items: [...updatedItems],
      };

      await deletePackingItem(category.id, updatedPackingItems);
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
      await updateCheckbox(category.id, updatedItem);
    } catch (e) {
      console.log("Error in item checkbox", e);
    }
  };

  const needToBuyHandler = async (item) => {
    try {
      const updatedItem = {
        ...item,
        bought: !item.bought,
      };
      await updateBought(category.id, updatedItem);
    } catch (e) {
      console.log("Error in item checkbox", e);
    }
  };

  return (
    <div className="mt-2 flex w-full justify-between px-6 py-4">
      <div className="flex items-center justify-start gap-3">
        <button
          type="button"
          onClick={() => checkBoxHandler(item)}
          className={`${
            item.checked ? "text-blue-500" : "text-gray-900"
          } h-auto w-auto p-1 text-xs`}
        >
          {item.checked ? (
            <CheckCircle className="h-5 w-5" strokeWidth={2.75} />
          ) : (
            <Circle className="h-5 w-5" strokeWidth={2.75} />
          )}
        </button>

        <button
          type="button"
          onClick={() => needToBuyHandler(item)}
          className={`${
            item.bought ? "text-blue-500" : "text-gray-900"
          } h-auto w-auto whitespace-nowrap p-1 text-xs`}
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={2.75} />
        </button>

        <h3 className="ml-4 text-sm font-medium text-gray-600">{item.name}</h3>
      </div>

      <div className="flex items-center gap-4">
        <p
          style={{ backgroundColor: authorColor }}
          className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        >
          {initialsFormatter(item.user)}
        </p>

        <button type="button" onClick={() => deletePackingItemHandler(item)}>
          <Trash2 className="h-4 w-4" strokeWidth={0.75} />
        </button>
      </div>
    </div>
  );
};

export default PackingItem;
