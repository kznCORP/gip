"use client";

import React, { useContext, useState } from "react";
import { PackingContext } from "@/lib/packingContext";

import { Modal } from "../Modal";
import { AddPackItemModal } from "./AddPackItemModal";
import { Icons } from "../Icons";

import { PlusCircle, Trash2 } from "lucide-react";
import PackingItem from "./PackingItem";

export const ViewPackingModal = ({ onShow, onClose, packingItem }) => {
  const { deletePackingCategory, getUnpackedItemsForCategory } =
    useContext(PackingContext);

  const [showAddPackListModal, setShowAddPackListModal] = useState(false);

  //Delete Packing Category from Firebase
  const deletePackingCategoryHandler = async () => {
    try {
      await deletePackingCategory(packingItem.id);
    } catch (e) {
      console.log("Error in deleting Packing Category", e);
    }
  };

  return (
    <>
      <AddPackItemModal
        onShow={showAddPackListModal}
        onClose={() => setShowAddPackListModal(false)}
      />

      <Modal onShow={onShow} onClose={onClose}>
        <section className="mb-10 mt-12 px-6">
          {/* Title */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8">
            <div
              className="flex h-1/2 items-center justify-center rounded-lg p-4 "
              style={{ backgroundColor: `${packingItem.color}` }}
            >
              <div className="h-[25px] w-[25px]">
                <Icons iconName={packingItem.icon} iconColor="white" />
              </div>
            </div>

            <h2 className="mt-3 text-center text-lg font-medium">
              {packingItem.packingCategory}
            </h2>

            <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
              Packing Category
            </p>
          </div>

          {/* Total Transactions */}
          <div className="mt-4 flex h-24 gap-4">
            <div className="flex w-4/5 flex-col items-center justify-center rounded-lg bg-white">
              <p className="text-lg font-medium">
                {getUnpackedItemsForCategory(packingItem.id)}
              </p>
              <p
                className="uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                Items to Bring
              </p>
            </div>

            <button
              type="button"
              className="flex h-full w-1/5 items-center justify-center self-center rounded-lg bg-white"
              onClick={() => {
                onClose();
                setShowAddPackListModal(true);
              }}
            >
              <PlusCircle className="h-6 w-6 flex-shrink-0" />
            </button>
          </div>

          <div className="mt-4 rounded-lg bg-white pb-5">
            {packingItem.items.length > 0 ? (
              <h3
                className="pt-6 text-center font-medium uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                All Items
              </h3>
            ) : (
              <h3
                className="flex h-24 items-center justify-center font-medium uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                No Packing Items Found
              </h3>
            )}

            {packingItem.items.map((item) => (
              <PackingItem category={packingItem} item={item} key={item.id} />
            ))}
          </div>
        </section>

        <div className="bottom-0 mt-24 flex items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded p-4 text-xs text-red-400 hover:bg-rose-500 hover:text-white"
            onClick={() => deletePackingCategoryHandler()}
          >
            Delete Category
            <Trash2 className="ml-1 h-4 w-4 flex-shrink-0 text-red-400" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ViewPackingModal;
