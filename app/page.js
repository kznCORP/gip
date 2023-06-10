"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { Navigation } from "@/components/navigation";
import { Expenses } from "@/components/Expenses/Expenses";
import AddPackItemModal from "@/components/Packing/AddPackItemModal";

import { MdAdd } from "react-icons/md";
import { PackingContext } from "@/lib/packingContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { packingItems } = useContext(PackingContext);

  const [showAddPackListModal, setShowAddPackListModal] = useState("");

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

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

        {/* Packing List */}
        <section>
          <h3 className="mb-6 text-lg text-gray-500">List of Items</h3>
          {/* Expense Container */}
          <div className="flex flex-col gap-4">
            {packingItems.map((item) => (
              <div key={item.id}>
                <h1>{item.packingCategory}</h1>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
