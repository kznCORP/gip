"use client";

import { useContext } from "react";
import { PackingContext } from "@/lib/packingContext";

import { Icons } from "../Icons";

export const ProgressIcons = ({ item, index }) => {
  const { getPackedItemsForCategory } = useContext(PackingContext);

  const progressCount = getPackedItemsForCategory(item.id);

  return (
    <div
      className={`relative flex h-24 flex-col items-center justify-center gap-2 bg-gray-100 ${
        (index + 1) % 4 !== 0 ? "border-r border-dotted border-gray-300" : ""
      }
${index >= 4 && index < 7 ? "border-t border-dotted border-gray-300" : ""}
${index === 7 ? "border-t border-dotted border-gray-300" : ""} `}
    >
      {index >= 4 && (
        <div className="absolute left-1/2 w-[90%] -translate-x-1/2 border-t border-dotted border-gray-300"></div>
      )}
      {(index + 1) % 4 !== 0 && (
        <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
      )}
      {index >= 4 && index < 7 && (
        <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
      )}

      <Icons iconName={item.icon} />
      <p className="text-sm font-medium">{progressCount}</p>
    </div>
  );
};

export default ProgressIcons;

// <div className="mb-4 mt-8 grid grid-cols-4">
//   {/* Div #1 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #2 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #3 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #4 */}
//   <div className="relative col-span-1 h-24 bg-gray-100"></div>
//   {/* Div #5 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute left-1/2 w-[90%] -translate-x-1/2 border-t border-dotted border-gray-300"></div>
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #6 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute left-1/2 w-[90%] -translate-x-1/2 border-t border-dotted border-gray-300"></div>
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #7 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute left-1/2 w-[90%] -translate-x-1/2 border-t border-dotted border-gray-300"></div>
//     <div className="absolute right-0 top-1/2 h-[90%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
//   </div>
//   {/* Div #8 */}
//   <div className="relative col-span-1 h-24 bg-gray-100">
//     <div className="absolute left-1/2 w-[90%] -translate-x-1/2 border-t border-dotted border-gray-300"></div>
//   </div>
// </div>;
