"use client";

import { useRef, useState } from "react";

import { Modal } from "../Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

const AddPackItemModal = ({ onShow, onClose }) => {
  const [packingItem, setPackingItem] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([]);

  // You left off here
  const addPackItemHandler = async (e) => {
    e.preventDefault();

    try {
      if (packingItem !== "") {
        const collectionRef = collection(db, "packing-items");
        await addDoc(collectionRef, { packingItem, checked: false });
        setPackingItem("");
      }
    } catch (e) {
      console.log("Error in adding a Packing Item to Firebase", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <h1>Packing List</h1>
      <form onSubmit={addPackItemHandler} className="mt-6 flex gap-2">
        <input
          type="checkbox"
          name="status"
          value={checkboxValues}
          onChange={(e) => setCheckboxValues(e.target.checked)}
        />
        <input
          type="text"
          name="name"
          value={packingItem}
          onChange={(e) => setPackingItem(e.target.value)}
          placeholder="Enter the name of the expense"
          id="name"
          required
          className="w-1/2"
        />
        <button type="submit" className="text-md bg-blue-600 p-3">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddPackItemModal;
