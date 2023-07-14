import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";

import { PackingContext } from "@/lib/packingContext";
import { AddPackItemModal } from "@/components/Packing/AddPackItemModal";
import { ViewPackingItemsModal } from "@/components/Packing/ViewPackingItemsModal";

import { PlusCircle, XCircle } from "lucide-react";

export const PackingList = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { packingItems, getTotalPackedPercentage } = useContext(PackingContext);

  const [showAddPackListModal, setShowAddPackListModal] = useState("");

  const totalPercentage = getTotalPackedPercentage();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <AddPackItemModal
        onShow={showAddPackListModal}
        onClose={() => setShowAddPackListModal(false)}
      />
      <section className="my-12 px-4">
        {/* Add Packing Item */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
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

        {/* Tips / Helpful Insight */}
        <section>
          <div className="my-5 flex items-center justify-between rounded-lg bg-amber-100 p-5">
            <p className="text-xs leading-snug">
              Displays items needed to be brought throughout the course of the
              event/activity planned.
            </p>
            <XCircle className="h-5 w-5 flex-shrink-0" />
          </div>
        </section>

        {/* Today's Progress */}
        <section>
          <div className="my-6 rounded-lg bg-gray-900 p-6">
            <h4 className="text-sm text-white">Today&apos;s Progress •</h4>
            <div className="mt-10 flex flex-col items-start justify-between gap-4">
              <div className="flex items-end">
                <h3 className="text-3xl font-bold text-white">{`${totalPercentage.toFixed(
                  0
                )}%`}</h3>
                <p className="mb-1 ml-2 text-xs text-gray-400">
                  of all items packed.
                </p>
              </div>

              <div className="h-5 w-full rounded bg-gray-100">
                <div
                  className="h-5 rounded bg-green-400 "
                  style={{
                    width: `${totalPercentage}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Packing List */}
        <section>
          <div className="mb-8 mt-10 flex justify-between ">
            <h4 className="text-md font-medium  text-gray-800">Labels •</h4>
          </div>
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
