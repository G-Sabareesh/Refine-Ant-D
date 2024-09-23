"use client";

import { EditOutlined } from "@ant-design/icons";
import ProductDrawerShow from "@app/components/product/ProductDrawerShow";
import ProductStatus from "@app/components/product/ProductStatus";
import { ICategory } from "@app/interfaces";
import { EditButton, NumberField, Show } from "@refinedev/antd";
import { useGo, useNavigation, useOne, useShow } from "@refinedev/core";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  List,
  theme,
  Typography,
} from "antd";
import React from "react";

const ShowProduct = () => {
  const screen = Grid.useBreakpoint();
  // console.log(screen);
  const { query } = useShow();
  console.log(query);
  const product: any = query?.data?.data;
  const { token } = theme.useToken();

  const go = useGo();
  const { editUrl } = useNavigation();

  const { data: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: product?.category?.id,
    queryOptions: {
      enabled: !!product?.category?.id,
    },
  });
  const category = categoryData?.data;
  return (
    <Show isLoading={query?.isLoading}>
      <Flex
        align="center"
        justify="space-around"
        wrap={true}
        className="position-relative w-100 rounded-2"
      >
        <Flex className="Product-Show">
          <Badge.Ribbon
            text={product?.name}
            color="volcano"
            className="fs-5 fw-semibold fst-italic position-absolute"
          >
            <Avatar
              shape="square"
              style={{
                aspectRatio: 1,
                objectFit: "contain",
                width: "255px",
                height: "255px",
                margin: "16px auto",
                borderRadius: "8px",
              }}
              src={
                product?.images?.[0].url
                // product?.images?.[0]?.file?.response.url
              }
              alt={product?.images?.[0].name}
            />
          </Badge.Ribbon>
        </Flex>
        <Flex
          vertical={true}
          className={
            screen.sm || screen.md
              ? screen.lg
                ? "rounded-2 w-75"
                : "rounded-2 w-100"
              : ""
          }
          style={{
            backgroundColor: token.colorBgContainerDisabled,
          }}
        >
          <Flex vertical={true} className="mt-2 mb-2 ms-2">
            <List
              header={
                <Typography.Text type="secondary" className="ms-2 fs-6">
                  {"Details"}
                </Typography.Text>
              }
              dataSource={[
                {
                  label: (
                    <Typography.Text type="secondary">
                      {"Price"}
                    </Typography.Text>
                  ),
                  value: (
                    <NumberField
                      value={product?.price || 0}
                      options={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                  ),
                },
                {
                  label: (
                    <Typography.Text type="secondary">
                      {"Category"}
                    </Typography.Text>
                  ),
                  value: <Typography.Text>{category?.title}</Typography.Text>,
                },
                {
                  label: (
                    <Typography.Text type="secondary">
                      {"Status"}
                    </Typography.Text>
                  ),
                  value: <ProductStatus value={!!product?.isActive} />,
                },
              ]}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      style={{
                        padding: "0 16px",
                      }}
                      avatar={item.label}
                      title={item.value}
                    />
                  </List.Item>
                );
              }}
            />
            <Divider
              style={{
                margin: 0,
                padding: 0,
              }}
            />
            <Typography.Text
              type="secondary"
              className="p-2"
              style={{ textAlign: "justify" }}
            >
              Description : {product?.description}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
      {/*<Flex align="center" justify="end">
         <Button
          icon={<EditOutlined />}
          onClick={() => {
            return go({
              to: `${editUrl("products", product?.id)}`,
              query: {
                to: "products",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        >
          Edit
        </Button>
      </Flex> */}
    </Show>
  );
};

export default ShowProduct;
