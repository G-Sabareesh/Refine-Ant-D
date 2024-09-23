import { CheckCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import { ICourierStatus } from "@app/interfaces";
import { Tag } from "antd";
import React from "react";
import { RiMotorbikeLine } from "react-icons/ri";
const CourierStatus = ({ status }: { status: ICourierStatus }) => {
  switch (status?.id) {
    case 1:
      return (
        <Tag icon={<CheckCircleOutlined />} color="green">
          Available
        </Tag>
      );
    case 3:
      return (
        <Tag
          icon={<RiMotorbikeLine style={{ marginRight: "5px" }} />}
          color="blue"
        >
          On delivery
        </Tag>
      );
    default:
      return (
        <Tag icon={<PoweroffOutlined />} color="default">
          Offline
        </Tag>
      );
  }
};

export default CourierStatus;
