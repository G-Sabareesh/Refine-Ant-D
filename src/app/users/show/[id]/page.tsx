"use client";
import { useNavigation, useShow } from "@refinedev/core";
import React from "react";
import { Flex, Grid } from "antd";
import CustomerInfoSummary from "@app/components/CustomerInfoSummary";
import CustomerInfoList from "@app/components/CustomerInfoList";
import { Show } from "@refinedev/antd";
import { CustomerOrderHistory } from "@app/components/CustomerOrderHistory";

export default function UserShow() {
  //   const breakpoint = Grid.useBreakpoint();
  const { query: queryResult } = useShow();

  const { data, isLoading } = queryResult;
  const user = data?.data;
  return (
    <Show isLoading={isLoading}>
      <Flex
        vertical
        gap={32}
        style={{
          padding: "32px",
        }}
      >
        <CustomerInfoSummary customer={user} />
        <CustomerInfoList customer={user} />
        <CustomerOrderHistory customer={user} /> 
      </Flex>
    </Show>
  );
}
