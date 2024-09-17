"use client";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import React, { useState } from "react";
import type { MenuProps, DropDownProps } from "antd";
import type { IOrder } from "@app/interfaces";
import { useUpdate } from "@refinedev/core";

interface IupdateData {
  id: number;
  text: string;
}
const OrderMenuButton = ({ record }: { record: IOrder }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState<IupdateData | undefined>(
    undefined
  );
  const { mutate } = useUpdate({
    resource: "orders",
    id: record?.id,
  });
  const { id, text } = record?.status;

  // handling click on menu item
  const handleClick = (
    e: React.KeyboardEvent | React.MouseEvent,
    data: { id: number; text: string }
  ) => {
    e.stopPropagation();
    setModalOpen(true);
    setUpdateData(data);
  };

  // handling update
  const handleUpdate = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    mutate({
      values: {
        status: updateData,
      },
    });
    setModalOpen(false);
  };
  const handleCancel = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setUpdateData(undefined);
    setModalOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      icon: <CheckCircleOutlined />,
      label: "Accept",
      disabled:
        text == "Delivered" ||
        text == "Cancelled" ||
        text == "Ready" ||
        text == "On The Way",
      style: {
        color: "green",
        backgroundColor:
          text == "On The Way" ||
          text == "Delivered" ||
          text == "Cancelled" ||
          text == "Ready"
            ? "rgba(0,0,0,0.03)"
            : "none",
      },
      onClick: (e) => {
        handleClick(e.domEvent, {
          id: 2,
          text: "Ready",
        });
      },
    },
    {
      key: 2,
      icon: <CloseCircleOutlined />,
      label: "Reject",
      disabled:
        text == "Cancelled" || text == "On The Way" || text == "Delivered",
      style: {
        color: "red",
        backgroundColor:
          text == "Cancelled" || text == "On The Way" || text == "Delivered"
            ? "rgba(0,0,0,0.03)"
            : "none",
        marginTop: "2px",
      },
      onClick: (e) => {
        handleClick(e.domEvent, {
          id: 5,
          text: "Cancelled",
        });
      },
    },
  ];

  return (
    <>
      <Modal
        title={
          <span>
            <span>
              <ExclamationCircleFilled
                style={{
                  color: "orangered",
                  fontSize: "1.2em",
                  marginRight: "5px",
                  marginTop: "5px",
                }}
              />
            </span>
            Are you sure want to
            {updateData?.id == 2 ? (
              <b style={{ color: "green" }}> Accept</b>
            ) : (
              <b style={{ color: "red" }}> Reject</b>
            )}{" "}
            the order
          </span>
        }
        centered
        open={modalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText={`${updateData?.id == 2 ? "Accept Order" : "Cancel Order"}`}
        okType={`${updateData?.id == 2 ? "primary" : "danger"}`}
      ></Modal>
      <Dropdown menu={{ items }} arrow={false}>
        <Button icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
      </Dropdown>
    </>
  );
};

export default OrderMenuButton;
