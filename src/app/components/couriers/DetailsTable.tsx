import { useList } from "@refinedev/core";
import { Table, Tag } from "antd";
import React from "react";
import Star from "./Star";
import { useNavigation } from "@refinedev/core";

const DetailsTable = ({ courier }: any) => {
  const { show } = useNavigation();
  const { data } = useList({
    resource: "reviews",
    filters: [
      {
        field: "order.courier.id",
        operator: "eq",
        value: courier?.id,
      },
    ],
    queryOptions: {
      enabled: !!courier,
    },
  });
  // console.log("userid", id);
  // console.log("courierdata", data);
  const columns = [
    {
      title: "Reviews",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
  ];
  const tabledata: any[] = [];
  data?.data?.map((item) => {
    // console.log("item", item);
    // console.log("comment", item.comment);
    // console.log("star", item.star);
    // console.log("oredrid", item.order.id);
    tabledata.push({
      key: item?.order?.id,
      review: item?.comment[0],
      rating: <Star value={item?.star} />,
      order: <Tag color={"default"}># {item?.order?.id}</Tag>,
    });
  });
  return (
    <Table
      columns={columns}
      dataSource={tabledata}
      pagination={false}
      onRow={(record: any) => {
        // console.log("record", record);
        return {
          onClick: () => show("orders", record?.key),
        };
      }}
    />
  );
};

export default DetailsTable;
