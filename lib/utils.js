import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "CAD",
    style: "currency",
  });

  return formatter.format(amount);
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
