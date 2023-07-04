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

export const filterDateFormatter = (schedule) => {
  const fromDate =
    schedule.selectedDates.from instanceof Date
      ? schedule.selectedDates.from
      : schedule.selectedDates.from.toDate();

  if (!fromDate || fromDate === "" || fromDate === null) {
    throw new Error("fromDate cannot be null, empty, or a '' string");
  }
  const dateObject = new Date(fromDate);
  const month = dateObject.toLocaleString("default", { month: "short" });
  const day = dateObject.getDate();
  return { month, day };
};
