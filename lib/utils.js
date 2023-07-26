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

export const timeFormatter = (timestamp) => {
  if (!timestamp || !timestamp.seconds) {
    return "";
  }

  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  let formattedHours;
  if ((hours >= 1 && hours <= 9) || (hours >= 13 && hours <= 21)) {
    formattedHours = String(hours % 12);
  } else {
    formattedHours = String(hours).padStart(2, "0");
  }
  formattedHours = formattedHours === "0" ? "12" : formattedHours;

  return `${formattedHours}:${minutes} ${ampm}`;
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

export const initialsFormatter = (name) => {
  // Check if the name parameter is undefined or empty
  if (!name || typeof name !== "string") {
    return "";
  }

  // Split the string into an array of names
  var names = name.split(" ");

  // Initialize an empty string to store the initials
  var initials = "";

  // Loop through each name and append the first character to the initials string
  for (var i = 0; i < names.length; i++) {
    initials += names[i].charAt(0);
  }

  return initials;
};

export const percentage = (items) => {
  const [numerator, denominator] = items.split("/").map(Number);
  const percentage = (numerator / denominator) * 100;

  return percentage.toFixed(2);
};

export const CHART_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },

  // Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: false,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};
