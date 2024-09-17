import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

const CategoryActive = ({ value }: { value: boolean }) => {
  return value ? (
    <Tag icon={<EyeOutlined />} color="success">
      Visible
    </Tag>
  ) : (
    <Tag icon={<EyeInvisibleOutlined />} color="warning">
      inVisible
    </Tag>
  );
};

export default CategoryActive;
