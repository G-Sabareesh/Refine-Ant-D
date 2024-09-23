"use client";
import React from "react";
import { Row, Col, Card, theme, List, Flex } from "antd";
import {
  ClockCircleFilled,
  DollarOutlined,
  HistoryOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DailyRevenue from "@app/components/dashboard/DailyRevenue";
import DailyOrder from "@app/components/dashboard/DailyOrder";
import DailyCustomer from "@app/components/dashboard/DailyCustomer";
// import DeliveryMap from "@app/components/dashboard/DeliveryMap";

const DeliveryMap = dynamic(
  () => import("@app/components/dashboard/DeliveryMap"),
  {
    ssr: false,
  }
);
import Timeline from "@app/components/dashboard/Timeline";
import TrendingProduct from "@app/components/dashboard/TrendingProduct";
import RecentOrder from "@app/components/dashboard/RecentOrder";
import dynamic from "next/dynamic";

const Dashboard = () => {
  const { token } = theme.useToken();
  const timelineStyles = {
    body: {
      padding: 0,
    },
  };
  const RecentOrderStyles = {
    body: {
      paddingBottom: "60px",
    },
  };
  return (
    <List>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            title={
              <div>
                <DollarOutlined style={{ color: token.volcano }} /> Daily
                Revenue
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <DailyRevenue />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            title={
              <div>
                <ShoppingOutlined style={{ color: token.volcano }} /> Daily
                Order
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <DailyOrder />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            title={
              <div>
                <UserOutlined style={{ color: token.volcano }} /> Daily Customer
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <DailyCustomer />
            </Flex>{" "}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} sm={24} md={12} lg={14}>
          <Card
            title={
              <div>
                <HistoryOutlined style={{ color: token.volcano }} /> Delivery
                Map
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <DeliveryMap />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card
            style={timelineStyles.body}
            title={
              <div>
                <HistoryOutlined style={{ color: token.volcano }} /> Timeline
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center" vertical>
              <Timeline />
            </Flex>{" "}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} sm={24} md={12} lg={14}>
          <Card
            style={RecentOrderStyles?.body}
            title={
              <div>
                <ShoppingOutlined style={{ color: token.volcano }} /> Recent
                Order
              </div>
            }
            bordered={false}
          >
            <Flex vertical>
              <RecentOrder />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card
            title={
              <div>
                <RiseOutlined style={{ color: token.volcano }} /> Trending
                Product
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <TrendingProduct />
            </Flex>{" "}
          </Card>
        </Col>
      </Row>
    </List>
  );
};

export default Dashboard;
