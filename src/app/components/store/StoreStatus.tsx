"use client";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

const StoreStatus = ({ value }: { value: boolean }) => {
  return value ? (
    <Tag
      icon={<CheckCircleOutlined />}
      color="success"
      style={{ width: "70px" }}
    >
      Open
    </Tag>
  ) : (
    <Tag icon={<StopOutlined />} color="default" style={{ width: "70px" }}>
      Closed
    </Tag>
  );
};

export default StoreStatus;
