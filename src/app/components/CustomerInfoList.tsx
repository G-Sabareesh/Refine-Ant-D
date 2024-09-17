"use client";
import { DateField } from "@refinedev/antd";
import { Card, List, Space, Typography, theme } from "antd";
import React from "react";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const CustomerInfoList = ({ customer }: any) => {
  console.log(customer);
  const { token } = theme.useToken();
  return (
    <Card
      bordered={false}
      styles={{
        body: {
          padding: "0 16px 0 16px",
        },
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            title: "Phone no",

            icon: <PhoneOutlined />,
            value: <Typography.Text>{customer?.gsm}</Typography.Text>,
          },
          {
            title: "Address",

            icon: <EnvironmentOutlined />,
            value: (
              <Space direction="vertical">
                {customer?.addresses.map((address: any, index: number) => {
                  const isFirst = index === 0;

                  return (
                    <Space key={index}>
                      {isFirst ? (
                        <CheckCircleOutlined
                          style={{
                            color: token.colorSuccess,
                          }}
                        />
                      ) : (
                        <RightCircleOutlined
                          style={{
                            color: token.colorTextTertiary,
                          }}
                        />
                      )}
                      <Typography.Text
                        key={index}
                        style={{
                          color: isFirst
                            ? token.colorText
                            : token.colorTextTertiary,
                        }}
                      >
                        {address.text}
                      </Typography.Text>
                    </Space>
                  );
                })}
              </Space>
            ),
          },
          //   {
          //     title: "Status",
          //     // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          //     icon: <UserOutlined />,
          //     value: <UserStatus value={!!customer?.isActive} />,
          //   },
          {
            title: "Created At",

            icon: <CalendarOutlined />,
            value: (
              <Typography.Text>
                {/* {dayjs(customer?.createdAt).format("MMMM, YYYY HH:mm A")}
                 */}
                <DateField value={customer?.createdAt} />
              </Typography.Text>
            ),
          },
        ]}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={item.icon}
                title={
                  <Typography.Text type="secondary">
                    {item.title}
                  </Typography.Text>
                }
                description={item.value}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default CustomerInfoList;
