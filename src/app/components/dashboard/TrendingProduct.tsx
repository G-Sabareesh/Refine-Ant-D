"use client";

import { ITrendingProducts } from "@app/interfaces";
import { useSelect, useSimpleList } from "@refinedev/antd";
import { Avatar, Badge, Flex, List, Typography, theme } from "antd";
import React from "react";

const TrendingProduct = () => {
  const { listProps } = useSimpleList<ITrendingProducts>({
    resource: "trendingProducts",
    pagination: { pageSize: 5, current: 1 },
    syncWithLocation: false,
  });

  const { token } = theme.useToken();

  const {
    selectProps: { options },
  } = useSelect({
    resource: "categories",
  });
  // console.log(options?.[0]);

  // console.log(listProps?.dataSource);
  return (
    <List
      className="w-100"
      {...listProps}
      pagination={false}
      bordered={false}
      renderItem={(item, index) => {
        return (
          <Flex align="center" justify="start" className="w-100 p-2 ">
            <Flex>
              <Badge count={item.id} color="volcano" style={{ color: "white" }}>
                <Avatar
                  src={item.product.images[0].url}
                  shape="square"
                  size={90}
                />
              </Badge>
            </Flex>
            <Flex vertical className="ms-4 w-100">
              <span
                className="rounded-4 text-light"
                style={{
                  width: "fit-content",
                  backgroundColor: token.volcano,
                }}
              >
                &nbsp;
                {options?.[item?.product?.category?.id - 1]?.label}
                &nbsp;
              </span>
              <span className="text-start w-100 fs-5">{item.product.name}</span>
              <span className="mb-2 fw-bold text-secondary">
                ${item.product.price * item.orderCount}
              </span>
              <span className="text-secondary">
                Ordered
                <Typography.Text className="fw-bold">
                  {" "}
                  {item.orderCount}{" "}
                </Typography.Text>
                times
              </span>
            </Flex>
          </Flex>
        );
      }}
    />
  );
};

export default TrendingProduct;
