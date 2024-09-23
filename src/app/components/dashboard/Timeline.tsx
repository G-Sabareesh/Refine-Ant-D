import { useInfiniteList } from "@refinedev/core";
import { Flex, List, Spin, Tag } from "antd";
import { Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import relativeTime from "dayjs/plugin/relativeTime";
import OrderStatus from "../OrderStatus";
import { IOrder } from "@app/interfaces";

interface Iheight {
  height?: string;
}
const Timeline = ({ height = "500px" }: Iheight) => {
  const { data, hasNextPage, fetchNextPage, isLoading } =
    useInfiniteList<IOrder>({
      resource: "orders",
      sorters: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
      pagination: {
        pageSize: 12,
        current: 1,
      },
    });
  dayjs.extend(relativeTime);

  const orders = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      {isLoading ? (
        <Spin spinning size="large" />
      ) : (
        <div
          id="ordersscroll"
          style={{ overflow: "auto", width: "100%", height: height }}
        >
          <InfiniteScroll
            style={{ overflow: "none" }}
            dataLength={orders?.length}
            hasMore={hasNextPage || false}
            next={fetchNextPage}
            loader={
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Spin />
              </span>
            }
            scrollableTarget="ordersscroll"
            endMessage={
              <Tag style={{ display: "flex", justifyContent: "center" }}>
                You have reached the end
              </Tag>
            }
          >
            <List
              dataSource={orders}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Flex style={{ width: "100%" }}>
                      <Flex style={{ width: "40%" }} justify="start">
                        <OrderStatus record={item} />
                      </Flex>
                      <Typography.Text
                        style={{ width: "20%", textAlign: "center" }}
                      >
                        #{item?.orderNumber}
                      </Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ width: "40%", textAlign: "center" }}
                      >
                        {dayjs(item.createdAt)?.fromNow()}
                      </Typography.Text>
                    </Flex>
                  </List.Item>
                );
              }}
            ></List>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Timeline;
