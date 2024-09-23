import { IOrder, IOrderStatus, IProduct } from "@app/interfaces";
import { NumberField, useTable } from "@refinedev/antd";
import { Avatar, Flex, Table, Typography } from "antd";
import React from "react";

import { getUniqueListWithCount } from "./UniqueOrderProduct";

const OrderTabel = ({ data }: { data: any }) => {
  // console.log(data);
  const products = data || [];
  const uniqueProducts = getUniqueListWithCount({
    list: products,
    field: "id",
  });

  return (
    <Table
      dataSource={uniqueProducts}
      pagination={false}
      rowKey={"id"}
      footer={(products) => {
        return (
          <Flex justify="flex-end" gap={16}>
            <Typography.Text>Total</Typography.Text>
            <NumberField
              value={products.reduce(
                (acc, product) => acc + product.count * product.price,
                0
              )}
              options={{ style: "currency", currency: "USD" }}
            />
          </Flex>
        );
      }}
    >
      <Table.Column
        title="Product"
        dataIndex={"name"}
        key={"name"}
        render={(_, record) => {
          return (
            <>
              <Avatar src={record?.images?.[0]?.url} shape="square" size={35} />
              <Typography.Text className="px-3">{record?.name}</Typography.Text>
            </>
          );
        }}
      />
      <Table.Column title="Quantity" dataIndex={"count"} align="right" />
      <Table.Column
        align="right"
        title="Price"
        dataIndex={"price"}
        render={(_, record) => {
          return (
            <NumberField
              value={record?.price}
              options={{ style: "currency", currency: "USD" }}
            />
          );
        }}
      />
      <Table.Column
        align="right"
        title="Total"
        dataIndex={"id"}
        render={(_, record) => {
          return (
            <NumberField
              value={record?.count * record?.price}
              options={{ style: "currency", currency: "USD" }}
            />
          );
        }}
      />
    </Table>
  );
};

export default OrderTabel;
