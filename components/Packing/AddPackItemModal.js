"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { Modal } from "../Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { PackingContext } from "@/lib/packingContext";

const AddPackItemModal = ({ onShow, onClose }) => {
  const { packingItems, addPackingCategory } = useContext(PackingContext);
  const [packingCategory, setPackingCategory] = useState("");

  /**
   * You left off here
   *
   * What to do tomorrow:
   * [x] Create a Packing Categroy similar to Expenses
   * [ ] Read data from Firebase, store into app -> display UI
   *
   * [ ] Add item to an array of items within a Packing Category
   * [ ] Delete Packing Category
   * [ ] Delete an item from an array of items in Packing Category
   *
   */

  const addPackingCategoryHandler = async (e) => {
    e.preventDefault();

    try {
      if (packingCategory !== "") {
        await addPackingCategory({ packingCategory });
        setPackingCategory("");
      }
    } catch (e) {
      console.log("Error in adding a Packing Item to Firebase", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <h1>Packing List</h1>
      <form onSubmit={addPackingCategoryHandler} className="mt-6 flex gap-2">
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
        <button type="submit" className="text-md bg-blue-600 p-3">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddPackItemModal;
