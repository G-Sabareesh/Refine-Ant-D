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
import DeliveryMap from "@app/components/dashboard/DeliveryMap";
import Timeline from "@app/components/dashboard/Timeline";
import TrendingProduct from "@app/components/dashboard/TrendingProduct";
import RecentOrder from "@app/components/dashboard/RecentOrder";

const Dashboard = () => {
  const { token } = theme.useToken();
  const styles = {
    body: {
      padding: 0,
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
            </Flex>{" "}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card
            style={styles.body}
            title={
              <div>
                <HistoryOutlined style={{ color: token.volcano }} /> Timeline
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
              <Timeline />
            </Flex>{" "}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} sm={24} md={12} lg={14}>
          <Card
            title={
              <div>
                <ShoppingOutlined style={{ color: token.volcano }} /> Recent
                Order
              </div>
            }
            bordered={false}
          >
            <Flex align="center" justify="center">
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
