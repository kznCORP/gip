"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Expenses } from "@/components/Expenses/Expenses";

import { MdAdd } from "react-icons/md";
import AddPackItemModal from "@/components/Packing/AddPackItemModal";

export default function Home() {
  const [showAddPackListModal, setShowAddPackListModal] = useState("");

  return (
    <>
      <Navigation />
      <Expenses />

      <AddPackItemModal
        onShow={showAddPackListModal}
        onClose={() => setShowAddPackListModal(false)}
      />

      {/* Main  */}
      <main className="mt-12 px-4">
        <section>
          <h2 className="my-5 text-4xl font-bold">Packing List</h2>
        </section>

        {/* Modal Toggle */}
        <section>
          <div className="flex gap-4">
            <button
              data-modal-target="authentication-modal"
              className="text-md mb-10  flex   items-center   gap-2 rounded-lg bg-blue-600 p-3 font-medium text-white"
              onClick={() => setShowAddPackListModal(true)}
            >
              Add Packing Item <MdAdd className="text-xl" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
