import { IOrder, IProduct } from "@app/interfaces";
import { useList, useTable } from "@refinedev/core";
import { Flex, List, Pagination, Spin, Typography } from "antd";
import React, { useState } from "react";
import CalculatePrice from "../CalculatePrice";
import OrderMenuButton from "../OrderMenuButton";
import { getUniqueListWithCount } from "../getUniqueListWithCount";

const GetProductList = ({ products }: { products: IProduct[] }) => {
  const data = getUniqueListWithCount({ list: products, field: "id" });
  return (
    <>
      {data?.map((item) => (
        <Flex key={item?.id}>
          <Typography.Text>{item?.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ marginLeft: "2px" }}>
            {" "}
            x{item?.count}
          </Typography.Text>
        </Flex>
      ))}
    </>
  );
};
const RecentOrder = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useList<IOrder>({
    resource: "orders",
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    pagination: {
      pageSize,
      current: currentPage,
    },
  });
  const OrdersData = data?.data;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <List
          style={{ width: "100%", position: "relative" }}
          dataSource={OrdersData}
          renderItem={(item) => {
            return (
              <List.Item>
                <Flex style={{ width: "100%" }}>
                  <Typography.Text style={{ width: "15%" }}>
                    #{item?.orderNumber}
                  </Typography.Text>
                  <Flex vertical={true} style={{ width: "40%" }}>
                    <Typography.Text ellipsis>
                      {item?.user?.fullName}
                    </Typography.Text>
                    <Typography.Text
                      ellipsis
                      style={{ width: "80%" }}
                      type="secondary"
                    >
                      {item?.adress.text}
                    </Typography.Text>
                  </Flex>
                  <Flex vertical={true} style={{ width: "30%" }}>
                    <GetProductList products={item?.products} />
                  </Flex>
                  <Typography.Text style={{ width: "10%" }}>
                    <CalculatePrice product={item?.products} />
                  </Typography.Text>
                  <Flex style={{ width: "5%" }} justify="center">
                    <OrderMenuButton record={item} />
                  </Flex>
                </Flex>
              </List.Item>
            );
          }}
        />
      )}
      {OrdersData ? (
        <Pagination
          style={{ position: "absolute", bottom: "20px", right: "10px" }}
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={data?.total}
          showSizeChanger={false}
        />
      ) : null}
    </>
  );
};

export default RecentOrder;
