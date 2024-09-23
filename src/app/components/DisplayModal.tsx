"use client";
import { Modal } from "antd";
import React from "react";
import {
  DeleteOutlined,
  DeleteFilled,
  EditOutlined,
  EditFilled,
  InfoCircleOutlined,
  InfoCircleFilled,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

interface ModalProps {
  ModalPopup: boolean;
  // setModalPopup: (value: boolean) => void;
  ModalOkFunction: any;
  ModalCancelFunction: any;
  title: React.ReactNode;
  type?: "primary" | "danger";
  text?: "Update" | "Edit" | "Delete" | "Ok";
  Icon: "DeleteIcon" | "EditIcon" | "InfoIcon" | "CheckIcon";
  CustomIcon?: React.ReactNode;
}
const DisplayModal = ({
  ModalPopup,
  ModalOkFunction,
  ModalCancelFunction,
  title,
  text = "Ok",
  type: OkType = "primary",
  Icon,
  CustomIcon = null,
}: ModalProps) => {
  let CIcon = null;
  switch (Icon) {
    case "InfoIcon":
      CIcon = (
        <InfoCircleFilled style={{ color: "orange", fontSize: "larger" }} />
      );
      break;
    case "DeleteIcon":
      CIcon = (
        <DeleteFilled style={{ color: "orangered", fontSize: "larger" }} />
      );
      break;
    case "EditIcon":
      CIcon = <EditFilled style={{ color: "blue", fontSize: "larger" }} />;
      break;
    default:
      CIcon = (
        <CheckCircleFilled style={{ color: "green", fontSize: "larger" }} />
      );
      break;
  }
  return (
    <Modal
      width={"fit-content"}
      closable={false}
      okType={OkType}
      okText={text}
      title={
        <span>
          {CustomIcon ?? CIcon} {title}
        </span>
      }
      centered
      open={ModalPopup}
      onOk={ModalOkFunction}
      onCancel={ModalCancelFunction}
    ></Modal>
  );
};

export default DisplayModal;
