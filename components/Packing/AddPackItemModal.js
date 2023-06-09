"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { Modal } from "../Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { PackingContext } from "@/lib/packingContext";

const AddPackItemModal = ({ onShow, onClose }) => {
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
