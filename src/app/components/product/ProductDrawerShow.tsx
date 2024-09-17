import { ICategory, IProduct } from "@app/interfaces";
import { NumberField } from "@refinedev/antd";
import { BaseKey, useGetToPath, useGo, useOne, useShow } from "@refinedev/core";
import {
  Avatar,
  Badge,
  Card,
  Divider,
  Drawer,
  Flex,
  Grid,
  Image,
  List,
  Typography,
  theme,
} from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProductStatus from "./ProductStatus";

type Props = {
  id?: BaseKey | undefined | number;
  onClose?: () => void;
  onEdit?: () => void;
};

const ProductDrawerShow = (props: Props) => {
  const go = useGo();
  const searchParams = useSearchParams();
  const getToPath = useGetToPath();

  const { token } = theme.useToken();
  // console.log(token);

  const breakpoint = Grid.useBreakpoint();

  const { query } = useShow<IProduct>({
    resource: "products",
    id: props?.id, // when undefined, id will be read from the URL.
  });

  const product = query.data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: product?.category?.id,
    queryOptions: {
      enabled: !!product?.category?.id,
    },
  });
  const category = categoryData?.data;

  // console.log(product, category);

  const handleDrawerClose = () => {
    if (props?.onClose) {
      props.onClose();
      return;
    }

    go({
      to:
        searchParams.get("to") ??
        getToPath({
          action: "list",
        }) ??
        "",
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };
  return (
    <Drawer
      open
      onClose={handleDrawerClose}
      width={breakpoint.sm ? "450px" : "100%"}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        className="position-relative w-100 rounded-2"
        style={{
          backgroundColor: token.colorBgContainerDisabled,
        }}
      >
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
              width: "240px",
              height: "240px",
              margin: "16px auto",
              borderRadius: "8px",
            }}
            src={product?.images?.[0].url}
            alt={product?.images?.[0].name}
          />
        </Badge.Ribbon>
      </Flex>
      <Flex vertical={true} className="rounded-2">
        <Flex vertical={true} className="px-2 py-4">
          <Typography.Text
            type="secondary"
            className="p-2"
            style={{ textAlign: "justify" }}
          >
            {product?.description}
          </Typography.Text>
        </Flex>
        <Divider
          style={{
            margin: 0,
            padding: 0,
          }}
        />
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
                  <Typography.Text type="secondary">{"Price"}</Typography.Text>
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
                  <Typography.Text type="secondary">{"Status"}</Typography.Text>
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
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default ProductDrawerShow;
