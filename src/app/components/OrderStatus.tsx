import React from "react";
import type { IOrder, IOrderStatus } from "../interfaces";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

const OrderStatus = ({ record }: { record: IOrder }) => {
  const { id, text } = record?.status;
  switch (id) {
    case 1:
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="default">
          {text || "pending"}
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<ClockCircleOutlined />} color="warning">
          {text || "ready"}
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {text || "On the way"}
        </Tag>
      );
    case 4:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {text || "Delivered"}
        </Tag>
      );
    default:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {text || "Cancelled"}
        </Tag>
      );
  }
};

export default OrderStatus;
