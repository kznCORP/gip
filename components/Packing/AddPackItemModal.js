"use client";

import { useContext, useRef, useState } from "react";
import { Modal } from "../Modal";
import { PackingContext } from "@/lib/packingContext";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { BadgePlus, Briefcase, ListPlus, Plus, X } from "lucide-react";

export const AddPackItemModal = ({ onShow, onClose }) => {
  const { packingItems, addPackingCategory, addPackingItem } =
    useContext(PackingContext);

  const [packingCategory, setPackingCategory] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const ctgColorRef = useRef("#0000FF");

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
      packingCategory: packingItem.packingCategory,
      items: [
        ...packingItem.items,
        {
          id: uuidv4(),
          name: itemTitle,
          checked: false,
          bought: false,
        },
      ],
    };

    try {
      await addPackingItem(selectedCategory, newItem);
      setSelectedCategory(null);
      onClose();
    } catch (e) {
      console.log("Error in adding a Packing Item Modal", e);
    }
  };

  const addPackingCategoryHandler = async (e) => {
    e.preventDefault();

    const color = ctgColorRef.current.value;

    try {
      if (packingCategory !== "") {
        await addPackingCategory({ packingCategory, color });
        setShowCategories(false);
      }
    } catch (e) {
      console.log("Error in adding a Packing Category Modal", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <section className="mt-6 px-6">
        <form
          onSubmit={addPackingItemHandler}
          className="flex flex-col justify-center gap-10"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium">
              What are you bringing?...
            </label>
            <div className="flex w-full items-center gap-4 rounded-lg border p-4 text-sm ">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                name="name"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Taco, cat, goat, cheese, pizza..."
                id="name"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between ">
              <label className="text-sm font-medium">For which category?</label>
            </div>

            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg border p-4 text-sm"
              onClick={() => setShowCategories(true)}
            >
              <BadgePlus className="h-4 w-4 flex-shrink-0" />
              <p className="text-gray-400">Create a new category...</p>
            </button>

            {showCategories && (
              <div className="flex w-full items-center gap-2 rounded-lg border p-4 text-sm ">
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full items-center gap-4 rounded-lg border p-2 text-sm ">
                    <ListPlus className="h-4 w-4 flex-shrink-0" />
                    <input
                      type="text"
                      name="name"
                      value={packingCategory}
                      onChange={(e) => setPackingCategory(e.target.value)}
                      placeholder="Add..."
                      id="name"
                      required
                      className="w-full"
                      style={{
                        textDecoration: "unset",
                        border: "unset",
                        outline: "none",
                        width: "100%",
                      }}
                      maxLength="50"
                    />
                  </div>

                  <div>
                    <input
                      type="color"
                      ref={ctgColorRef}
                      className="hover:cursor-pointer "
                      style={{
                        appearance: "none",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                      }}
                    />
                  </div>

                  <Button onClick={addPackingCategoryHandler}>
                    <Plus className="h-5 w-5 flex-shrink-0" />
                  </Button>
                  <Button onClick={() => setShowCategories(false)}>
                    <X className="h-5 w-5 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-col gap-4">
              {packingItems.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className="flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-sm "
                  style={{
                    border:
                      category.id === selectedCategory
                        ? `1px solid ${category.color}`
                        : "1px solid #E2E8F0",
                  }}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-[15px] w-[15px] rounded-full"
                      style={{ backgroundColor: `${category.color}` }} // category.color
                    ></div>
                    <div>
                      <h4 className="font-medium capitalize">
                        {category.packingCategory}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className={cn("w-1/4 font-normal text-gray-500")}
              type="button"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button className={cn(" w-3/4")} type="submit">
              Submit Item
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
