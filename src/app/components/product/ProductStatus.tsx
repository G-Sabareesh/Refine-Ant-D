import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

const ProductStatus = ({ value }: { value: boolean }) => {
  return value ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      Available
    </Tag>
  ) : (
    <Tag icon={<StopOutlined />} color="warning">
      UnAvailable
    </Tag>
  );
};

export default ProductStatus;
