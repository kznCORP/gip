import React, { useContext } from "react";
import { ModalContext } from "@/lib/modalContext";
import { ArrowLeftCircle } from "lucide-react";

export const Modal = ({ onShow, onClose, children }) => {
  const { isModalClicked } = useContext(ModalContext);

  console.log(isModalClicked);
  /**
   *
   *  Create a global state variable that checks viewport (mobile, tablet, desktop)
   *
   *  If Modal is clicked, update global state in reference to specific viewport
   *
   *  If viewport is mobile, display Modal's width to 100%
   *
   *  If viewport is tablet, display Modal's width to 50% and on the right.
   *
   *  If viewport is desktop, display Modal's width to 20% and on the right.
   *
   *
   *  [isModalClicked, setIsModalClicked] = useState(false);
   *
   *  Once you click a Modal; run setIsModalClicked(!isModalClicked);
   *
   *  For all components, check isModalClicked
   *
   *  If yes, apply styles according to viewport width
   *
   *  `${ isModalClicked ? "md:w-1/2 lg:w-1/5" : "md:w-full lg:w-full"}`
   *
   *
   * */

  return (
    <>
      {onShow && (
        <div
          className="fixed bottom-0 right-0 top-0 z-50 h-full w-full
          overflow-y-auto border md:w-1/2 md:border-l md:shadow"
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div className="mt-4 px-6 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeftCircle
                className="h-6 w-6 flex-shrink-0"
                strokeWidth={2}
                color="black"
              />
              <p className="text-xs font-medium">Go Back</p>
            </button>
          </div>

          {children}
        </div>
      )}
    </>
  );
};
