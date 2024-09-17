"use client";
import { CheckCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

interface vType {
  value: boolean;
}
const Status = ({ value }: vType) => {
  return value ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      Active
    </Tag>
  ) : (
    <Tag icon={<PauseCircleOutlined />} color="warning">
      Idle
    </Tag>
  );
};

export default Status;
