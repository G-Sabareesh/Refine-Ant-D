"use client";
import React from "react";
import { Bar } from "@ant-design/charts";
import dayjs from "dayjs";
import { useApiUrl, useCustom } from "@refinedev/core";
const DailyCustomer = () => {
  const today = dayjs();
  const API_URL = useApiUrl();
  const dateWeekFilter = {
    start: today.subtract(6, "days").startOf("day").format(),
    end: today.endOf("day").format(),
  };

  const { data: customerData } = useCustom({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query: dateWeekFilter,
    },
  });

  console.log(customerData);
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    xField: "year",
    yField: "value",
  };

  return <Bar {...config} />;
};

export default DailyCustomer;
