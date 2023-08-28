"use client";

import { useContext, useRef, useState } from "react";
import { Modal } from "../Modal";
import { PackingContext } from "@/lib/packingContext";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { ICON_DATA } from "@/lib/icons";

import { BadgePlus, Briefcase, User, PlusCircle } from "lucide-react";
import { Icons } from "../Icons";

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
          className="flex flex-col justify-center gap-12"
        >
          {/* Item Name */}
          <div className="flex flex-col gap-4">
            <label htmlFor="title" className="font-medium">
              What are you bringing?...
            </label>

            <div className="flex rounded-lg bg-white p-4">
              <div className="flex items-center justify-center rounded-lg p-1">
                <div className="h-[25px] w-[25px]">
                  <Briefcase />
                </div>
              </div>
              <input
                type="text"
                name="title"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Taco, cat, goat, cheese, pizza..."
                id="name"
                required
                className="ml-4 w-full text-sm font-medium"
              />
            </div>
          </div>

          {/* User */}
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="font-medium">
              Who&#x27;s bringing it?...
            </label>

            <div className="flex items-center rounded-lg bg-white p-4">
              <div className="flex items-center justify-center rounded-lg p-1">
                <div className="h-[25px] w-[25px]">
                  <User />
                </div>
              </div>

              <input
                type="text"
                name="name"
                value={itemUser}
                onChange={(e) => setItemUser(e.target.value)}
                placeholder="Name..."
                id="name"
                required
                className="ml-4 w-full text-sm font-medium"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-4">
            <label htmlFor="category" className="font-medium">
              For which category?
            </label>

            <button
              type="button"
              className="flex items-center rounded-lg bg-white p-4"
              onClick={() => setShowCategories(true)}
            >
              <div className="flex items-center justify-center rounded-lg p-1">
                <div className="h-[25px] w-[25px]">
                  <BadgePlus />
                </div>
              </div>

              {/* Title */}
              <h2 className="ml-4 w-full text-start text-sm font-medium text-gray-400">
                Create new category...
              </h2>
            </button>

            {showCategories && (
              <div className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-5 text-sm ">
                <div className="flex w-full flex-col">
                  <label className="text-xs font-medium">Name</label>
                  <div className="mt-2 w-full rounded-lg border bg-white p-3 text-sm ">
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
                          type="button"
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
                    className="w-1/6 rounded-md border bg-white p-2 text-xs text-gray-500"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addPackingCategoryHandler}
                    className="w-2/6 rounded-md bg-black p-2 text-xs  text-white"
                    type="button"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {packingItems.map((category) => (
                <button
                  key={category.id}
                  className="flex  items-center justify-between rounded-lg bg-white p-2"
                  type="button"
                  style={{
                    border:
                      category.id === selectedCategory
                        ? `1px solid ${category.color}`
                        : "",
                  }}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-lg p-3"
                    style={{ backgroundColor: `${category.color}` }}
                  >
                    <div className="">
                      <Icons iconName={category.icon} iconColor="white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex w-full flex-col items-start justify-center p-4">
                    <h2 className="font-medium">{category?.packingCategory}</h2>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              className="w-1/4 rounded-md border bg-white p-3 text-gray-500"
              type="button"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              className="w-3/4 rounded-md bg-black p-3 font-medium text-white"
              type="submit"
            >
              Submit Item
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
