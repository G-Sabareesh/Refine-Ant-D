import React from "react";

const FormatAmount = ({ amount }: { amount: number }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return <div>{formatted}</div>;
};

export default FormatAmount;
