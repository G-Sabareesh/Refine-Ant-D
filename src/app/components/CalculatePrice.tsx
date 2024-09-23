import React from "react";
import { IProduct } from "../interfaces";
import FormatAmount from "./FormatAmount";
type IPname = {
  product: IProduct[];
};
const CalculatePrice = ({ product }: IPname) => {
  let price = 0;
  product.map((item) => {
    price += item.price;
  });
  return (
    <span>
      <FormatAmount amount={price} />
    </span>
  );
};

export default CalculatePrice;
