import { useContext } from "react";
import { PackingContext } from "@/lib/packingContext";

import { Icons } from "../Icons";

export const ProgressIcons = ({ item, index, categoriesLength }) => {
  const { getPackedItemsForCategory } = useContext(PackingContext);

  const progressCount = getPackedItemsForCategory(item.id);

  const shouldAddBottomBorder = index < 4 && categoriesLength > 4; // Check if the index is 0, 1, 2, or 3
  const shouldAddBorderRight = (index + 1) % 4 !== 0; // Check if the index is not a multiple of 4

  return (
    <div
      className={`relative flex h-24 flex-col items-center justify-center gap-4`}
    >
      {shouldAddBottomBorder && ( // Add bottom border for the first 4 divs
        <div className="absolute bottom-0 left-1/2 w-[97%] -translate-x-1/2 border-b border-dotted border-gray-300"></div>
      )}
      {shouldAddBorderRight && ( // Add border right for the divs that are not multiples of 4
        <div className="absolute right-0 top-1/2 h-[97%] w-1 -translate-y-1/2 border-r border-dotted border-gray-300"></div>
      )}

      <Icons iconName={item.icon} />
      <p className="text-sm font-medium">{progressCount}</p>
    </div>
  );
};

export default ProgressIcons;
