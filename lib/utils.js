import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as formatDate } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "CAD",
    style: "currency",
  });

  return formatter.format(amount).replace("CA$", "C$");
};

export const dateFormatter = (date) => {
  if (!date) {
    return "";
  }

  const newDate = new Date(date.seconds * 1000);

  if (isNaN(newDate.getTime())) {
    return "";
  }

  return formatDate(newDate, "MMMM d, yyyy");
};
