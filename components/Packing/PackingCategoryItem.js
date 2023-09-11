"use client";

import React, { useContext, useState } from "react";

import { ModalContext } from "@/lib/modalContext";

import { ViewPackingModal } from "./ViewPackingModal";
import { Icons } from "../Icons";

import { ChevronDown } from "lucide-react";

export const PackingCategoryItem = ({ packingItem }) => {
  const { isModalOpen, clickedModal } = useContext(ModalContext);

  return (
    <>
      <ViewPackingModal
        onShow={isModalOpen == packingItem.id}
        onClose={() => clickedModal(false)}
        packingItem={packingItem}
      />

      <section
        type="button"
        className="cursor-pointer"
        onClick={() => clickedModal(packingItem.id)}
      >
        {/* Packing Category */}
        <div className="flex items-center justify-between gap-6 rounded-lg bg-white p-5">
          {/* Icon */}
          <div
            className="flex h-1/2 items-center justify-center rounded-lg p-4"
            style={{ backgroundColor: `${packingItem.color}` }}
          >
            <div className="h-[25px] w-[25px]">
              <Icons iconName={packingItem.icon} iconColor="white" />
            </div>
          </div>

          {/* Title */}
          <div className="flex w-full flex-col items-start justify-center">
            <h2 className="font-medium">{packingItem?.packingCategory}</h2>
            <h2 className="text-xs text-gray-400">View All</h2>
          </div>

          {/* Items */}
          <div className="flex items-center justify-center gap-4 p-5">
            <button type="button">
              <ChevronDown className="h-5 w-5" strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
