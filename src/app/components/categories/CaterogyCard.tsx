"use client";

import { IProduct } from "@app/interfaces";
import { HttpError, useList, useNavigation } from "@refinedev/core";
import { Avatar, Flex, Popover, Spin } from "antd";
import React, { useState } from "react";
import ProductDrawerShow from "../product/ProductDrawerShow";

const CaterogyCard = ({ category }: { category: any }) => {
  const [productId, setProductId] = useState<number | null>(null);
  const [drawerAction, setDrawerAction] = useState<"show" | "edit">("show");

  const { data, isLoading } = useList<IProduct>({
    resource: "products",
    queryOptions: {
      enabled: !!category?.id,
    },
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "category.id",
        operator: "eq",
        value: category?.id,
      },
    ],
  });
  const products = data?.data || [];
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <Flex gap={8} wrap="wrap">
          {products.map((product) => {
            const image = product?.images?.[0];
            return (
              <Popover key={product.id} title={product?.name}>
                <Avatar
                  shape="square"
                  src={image?.thumbnailUrl || image?.url}
                  alt={image?.name}
                  style={{
                    cursor: "pointer",
                    aspectRatio: 32 / 32,
                    width: 32,
                    height: 32,
                  }}
                  onClick={() => setProductId(product?.id)}
                />
              </Popover>
            );
          })}
        </Flex>
      )}
      {productId && drawerAction === "show" ? (
        <ProductDrawerShow id={productId} onClose={() => setProductId(null)} />
      ) : (
        ""
      )}
    </>
  );
};

export default CaterogyCard;
