import { Flex, Popover, Typography, Badge, Avatar, theme, Spin } from "antd";
// import { getUniqueListWithCount } from "../../../utils";
// import type { IOrder } from "../../../interfaces";
import { useTranslate } from "@refinedev/core";
import { getUniqueListWithCount } from "./getUniqueListWithCount";

const visibleProductCount = 4;

type Props = {
  order: any;
};

export const OrderTableColumnProducts = ({ order }: Props) => {
  // console.log(order);
  const t = useTranslate();
  const { token } = theme.useToken();

  const uniqueProducts = getUniqueListWithCount({
    list: order || [],
    field: "id",
  });
  // console.log(uniqueProducts);
  const visibleProducts = uniqueProducts.slice(0, visibleProductCount);
  const unvisibleProducts = uniqueProducts.slice(visibleProductCount);

  return !visibleProducts ? (
    <Spin />
  ) : (
    <Flex gap={12}>
      {visibleProducts.map((product) => {
        const image = product.images?.[0];
        return (
          <Popover
            key={product.id}
            content={<Typography.Text>{product.name}</Typography.Text>}
          >
            <Badge
              color="blue"
              style={{
                color: "#fff",
              }}
              count={product.count === 1 ? 0 : product.count}
            >
              <Avatar
                shape="square"
                src={image?.thumbnailUrl || image?.url}
                alt={image?.name}
              />
            </Badge>
          </Popover>
        );
      })}
      {/* {!!unvisibleProducts.length && (
        <Popover
          title={"products"}
          content={
            <Flex gap={8}>
              {unvisibleProducts.map((product) => {
                const image = product.images?.[0];
                return (
                  <Popover
                    key={product.id}
                    content={<Typography.Text>{product.name}</Typography.Text>}
                  >
                    <Badge
                      style={{
                        color: "#fff",
                      }}
                      count={product.count}
                    >
                      <Avatar
                        shape="square"
                        src={image?.thumbnailUrl || image?.url}
                        alt={image?.name}
                      />
                    </Badge>
                  </Popover>
                );
              })}
            </Flex>
          }
        >
          <Avatar
            shape="square"
            style={{
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            <Typography.Text
              style={{
                color: token.colorPrimary,
              }}
            >
              +{unvisibleProducts.length}
            </Typography.Text>
          </Avatar>
        </Popover>
      )} */}
    </Flex>
  );
};
