"use client";

import { useContext, useEffect, useState } from "react";
import { Modal } from "../Modal";
import { PackingContext } from "@/lib/packingContext";
import { v4 as uuidv4 } from "uuid";

const AddPackItemModal = ({ onShow, onClose }) => {
  const { packingItems, addPackingCategory, addPackingItem } =
    useContext(PackingContext);

  const [packingCategory, setPackingCategory] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const addPackingItemHandler = async (e) => {
    e.preventDefault();

    const packingItem = packingItems.find((e) => {
      return e.id === selectedCategory;
    });

    if (!packingItem) {
      console.log("Selected category not found");
      return;
    }

    const newItem = {
      items: [
        ...packingItem.items,
        {
          id: uuidv4(),
          name: itemTitle,
          checked: false,
        },
      ],
    };

    try {
      await addPackingItem(selectedCategory, newItem);
      setSelectedCategory(null);
    } catch (e) {
      console.log("Error in adding a Packing Item Modal", e);
    }
  };

  const addPackingCategoryHandler = async (e) => {
    e.preventDefault();

    try {
      if (packingCategory !== "") {
        await addPackingCategory({ packingCategory });
        setShowCategories(false);
      }
    } catch (e) {
      console.log("Error in adding a Packing Category Modal", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <h1>Packing List</h1>
      <form onSubmit={addPackingItemHandler} className="mt-6 ">
        <div className="mb-6 flex flex-col gap-1">
          <label>Item</label>
          <input
            type="text"
            name="name"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            placeholder="Enter the name of the expense"
            id="name"
            required
            className="w-full"
          />
          <button
            className="text-md bg-blue-600 p-3"
            onClick={addPackingItemHandler}
          >
            Add Item
          </button>
        </div>

        <div className="">
          <div className="flex items-center justify-between ">
            <h4>Categories</h4>
            <button
              type="button"
              className="text-lime-400"
              onClick={() => setShowCategories(true)}
            >
              + New Category
            </button>
          </div>

          {showCategories && (
            <div className="mb-3 mt-3 flex items-center justify-between gap-4">
              <input
                type="text"
                name="name"
                value={packingCategory}
                onChange={(e) => setPackingCategory(e.target.value)}
                placeholder="Enter the name of the expense"
                id="name"
                required
                className="w-full"
              />
              <button
                type="button"
                className="rounded-3xl bg-blue-600 p-1 text-xs text-white"
                onClick={addPackingCategoryHandler}
              >
                Create
              </button>
              <button
                type="button"
                className="rounded-3xl bg-red-600 p-1 text-xs text-white"
                onClick={() => setShowCategories(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-4">
          {packingItems.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className="flex items-center justify-between rounded-2xl bg-slate-500 px-3 py-3"
                style={{
                  border:
                    category.id === selectedCategory
                      ? "1px solid white"
                      : "none",
                }}
              >
                <div>
                  <h4 className="capitalize">{category.packingCategory}</h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      </form>
    </Modal>
  );
};

export default AddPackItemModal;
