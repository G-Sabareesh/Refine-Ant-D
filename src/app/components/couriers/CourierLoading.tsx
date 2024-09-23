import { Card, Col, Flex, Row, Skeleton } from "antd";
import React from "react";

const CourierLoading = () => {
  const leftList = [1, 2, 3, 4, 5, 6];
  const rightList = [1, 2, 3, 4];
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid lightgray",
        }}
      >
        <Skeleton.Button
          size="default"
          active
          style={{ marginBottom: "20px" }}
        />
      </div>

      <Flex vertical={false} gap={"10px"} style={{ marginTop: "20px" }}>
        <Skeleton.Avatar
          size={"large"}
          style={{ width: "80px", height: "80px" }}
          active
        />
        <Skeleton.Input style={{ marginTop: "20px" }} />
      </Flex>

      <Flex vertical={false} wrap gap={"10px"} style={{ marginTop: "20px" }}>
        <Card style={{ width: "40%" }}>
          {leftList.map((item) => (
            <Flex
              gap={"20px"}
              key={`leftitem${item}`}
              style={{
                marginTop: "5px",
              }}
            >
              <Skeleton.Input active />
              <Skeleton.Input active style={{ marginBottom: "10px" }} />
            </Flex>
          ))}
          <Flex justify="space-between" style={{ marginTop: "20px" }}>
            <Skeleton.Button size="large" />
            <Skeleton.Button size="large" />
          </Flex>
          {/* <Skeleton active paragraph={{ rows: 8 }} /> */}
        </Card>
        <Card style={{ width: "50%" }}>
          {/* <Skeleton active paragraph={{ rows: 4 }} /> */}
          {rightList.map((item) => (
            <Flex
              gap={"20px"}
              key={`rightitem${item}`}
              style={{
                marginTop: "5px",
              }}
            >
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active style={{ marginBottom: "10px" }} />
            </Flex>
          ))}
        </Card>
      </Flex>
    </>
  );
};

export default CourierLoading;
