"use client";

import { useList } from "@refinedev/core";
import React from "react";
import MapForComponent from "../MapForDashboard";
const DeliveryMap = () => {
  const { data } = useList({
    resource: "orders",
    config: {
      filters: [
        {
          field: "status.text",
          operator: "eq",
          value: "On The Way",
        },
      ],
      pagination: { mode: "off" },
    },
  });
  // console.log("deliveryMap", data?.data[0]);
  return data ? <MapForComponent data={data?.data} /> : "Loading...";
};

export default DeliveryMap;
