import React from "react";
import { IProduct } from "../interfaces";
type IPname = {
  product: IProduct[];
};
const CalculatePrice = ({ product }: IPname) => {
  let price = 0;
  product.map((item) => {
    price += item.price;
  });
  return <span>{price}</span>;
};

export default CalculatePrice;
