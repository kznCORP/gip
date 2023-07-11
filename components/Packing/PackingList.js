import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { PackingContext } from "@/lib/packingContext";
import { AddPackItemModal } from "@/components/Packing/AddPackItemModal";
import { ViewPackingItemsModal } from "@/components/Packing/ViewPackingItemsModal";

import { PlusCircle } from "lucide-react";

export const PackingList = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { packingItems } = useContext(PackingContext);

  const [showAddPackListModal, setShowAddPackListModal] = useState("");

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  /**
   * PACKING LIST TIME
   *
   * [ ] Add isBought feature
   * [ ] Revamp Add Modal UI
   * [ ]
   *
   */

  return (
    <>
      <AddPackItemModal
        onShow={showAddPackListModal}
        onClose={() => setShowAddPackListModal(false)}
      />
      <section className="my-12 px-4">
        {/* Add Packing Item */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between border-b border-gray-300 pb-3 ">
            <h2 className="text-xl font-medium">Packing List</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              <button
                data-modal-target="authentication-modal"
                className="flex  items-center   gap-2   rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                onClick={() => setShowAddPackListModal(true)}
              >
                <PlusCircle className="h-5 w-5" /> Add Item
              </button>
            </div>
          </div>
        </section>

        {/* Packing List */}
        <section>
          <div className="flex flex-col gap-4">
            {packingItems.map((item, index) => (
              <ViewPackingItemsModal key={index} packingItem={item} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};
