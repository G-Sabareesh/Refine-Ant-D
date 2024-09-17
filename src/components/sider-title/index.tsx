"use client";
import { useLink, useTranslate } from "@refinedev/core";
import { Flex, Typography, theme } from "antd";
import React from "react";
export interface ICollapsed {
  collapsed: boolean;
}
import { SiCodechef } from "react-icons/si";
export const CustomHeader: React.FC<ICollapsed> = ({ collapsed = false }) => {
  const { Title } = Typography;
  const translate = useTranslate();
  const Link = useLink();

  const { token } = theme.useToken();

  return (
    <Flex className="h-100 d-flex align-items-center">
      <Link
        to="/"
        className="d-flex align-items-center justify-content-center gap-2 h-100"
      >
        <SiCodechef size={35} color={token.colorPrimaryText} />
        {!collapsed && (
          <Title
            className="d-flex align-items-center fs-4 h-100 m-0"
            color={token.colorPrimaryText}
            style={{
              color: token.colorPrimaryText,
            }}
          >
            {translate("sider.title")}
          </Title>
        )}
      </Link>
    </Flex>
  );
};
