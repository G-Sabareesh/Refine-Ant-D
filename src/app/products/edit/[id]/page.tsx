"use client";

import { Edit } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import React from "react";

const ShowProduct = () => {
  const { query } = useShow();
  console.log(query);
  return <Edit>dskldjkf</Edit>;
};

export default ShowProduct;
