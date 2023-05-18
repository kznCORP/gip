export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "CAD",
    style: "currency",
  });

  return formatter.format(amount);
};
