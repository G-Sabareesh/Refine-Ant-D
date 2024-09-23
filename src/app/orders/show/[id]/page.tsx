"use client";
import MapComponent from "@app/components/showorder/Map";
import OrderDetails from "@app/components/showorder/OrderDetails";
import ShowSteps from "@app/components/showorder/Steps";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Flex } from "antd";
import Card from "antd/es/card/Card";
import React from "react";
import type { BaseRecord } from "@refinedev/core";
import OrderTabel from "@app/components/showorder/OrderTabel";
export default function OrdersShow() {
  const { query } = useShow();
  // console.log(query);
  const data = query?.data?.data?.events;
  const status = query?.data?.data?.status.text;

  return (
    <Show
      goBack={null}
      title={`Order #${query?.data?.data?.orderNumber ?? ""}`}
      breadcrumb={null}
      isLoading={query.isLoading}
    >
      <Flex
        gap={"middle"}
        justify="space-around"
        className="d-flex flex-column w-100"
      >
        <Card className="w-100 orderCard1">
          <ShowSteps data={data} status={status} />
        </Card>
        <Card className="w-100 orderCard2">
          <MapComponent data={query?.data?.data} />
        </Card>
        <Card className="w-100 orderCard2">
          <OrderTabel data={query?.data?.data?.products} />
        </Card>
        <Card className="w-100 orderCard2">
          <OrderDetails record={query?.data?.data} />
        </Card>
      </Flex>
    </Show>
  );
}
