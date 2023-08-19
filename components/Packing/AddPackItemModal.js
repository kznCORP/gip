"use client";

import { useContext, useRef, useState } from "react";
import { Modal } from "../Modal";
import { PackingContext } from "@/lib/packingContext";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { ICON_DATA } from "@/lib/icons";

import { BadgePlus, Briefcase, Users, PlusCircle } from "lucide-react";

const colorOptions = [
  { value: "#f87171" },
  { value: "#60a5fa" },
  { value: "#c084fc" },
  { value: "#4ade80" },
];

export const AddPackItemModal = ({ onShow, onClose }) => {
  const { packingItems, addPackingCategory, addPackingItem } =
    useContext(PackingContext);

  const [packingCategory, setPackingCategory] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemUser, setItemUser] = useState("");

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({ name: "sticky-note" });

  const ctgColorRef = useRef("#0000FF");

  if (!ctgColorRef.current || !ctgColorRef.current.value) {
    ctgColorRef.current = { value: "#0000FF" }; // Default color value
  }

  const setColorValue = (color) => {
    ctgColorRef.current.value = color;
  };

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
      icon: packingItem.icon,
      items: [
        ...packingItem.items,
        {
          id: uuidv4(),
          name: itemTitle,
          user: itemUser,
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
    const icon = selectedIcon.name;

    try {
      if (packingCategory !== "") {
        await addPackingCategory({ packingCategory, icon, color });
        setShowCategories(false);
      }
    } catch (e) {
      console.log("Error in adding a Packing Category Modal", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <section className="mb-10 mt-24 overflow-auto px-6">
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
                name="title"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Taco, cat, goat, cheese, pizza..."
                id="name"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Who&#x27;s bringing it?...
            </label>
            <div className="flex w-full items-center gap-4 rounded-lg border p-4 text-sm ">
              <Users className="h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                name="name"
                value={itemUser}
                onChange={(e) => setItemUser(e.target.value)}
                placeholder="Name..."
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
              <div className="flex w-full flex-col items-start gap-6 rounded-lg border p-4 text-sm ">
                <div className="flex w-full flex-col">
                  <label className="text-xs font-medium">Name</label>
                  <div className="mt-2 w-full rounded-lg border p-2 text-sm ">
                    <input
                      type="text"
                      name="name"
                      value={packingCategory}
                      onChange={(e) => setPackingCategory(e.target.value)}
                      placeholder="e.g Clothes, Technology, Utilities..."
                      id="name"
                      required
                      className="w-full text-xs"
                      style={{
                        textDecoration: "unset",
                        border: "unset",
                        outline: "none",
                        width: "100%",
                      }}
                      maxLength="50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium">Color</label>
                  <div className="mt-2 flex gap-2 ">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setColorValue(color.value)}
                      >
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: color.value }}
                        ></div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => ctgColorRef.current.click()}
                    >
                      <PlusCircle className="h-5 w-5 hover:cursor-pointer" />
                    </button>
                    <div className="relative">
                      <input
                        type="color"
                        ref={ctgColorRef}
                        className="absolute left-0 top-0 h-5 w-5 opacity-0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium">Icons</label>
                  <div className="mt-2 flex w-full flex-wrap gap-6">
                    {ICON_DATA &&
                      ICON_DATA.map((icon, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedIcon(icon)}
                        >
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={icon.imageUrl}
                              alt={`${icon.name} image`}
                              height={20}
                              width={20}
                            />
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                <div className="flex w-full gap-1">
                  <button
                    onClick={() => setShowCategories(false)}
                    className="w-1/6 rounded-md border p-2 text-xs text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addPackingCategoryHandler}
                    className="w-2/6 rounded-md bg-black p-2 text-xs  text-white"
                  >
                    Add Category
                  </button>
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
