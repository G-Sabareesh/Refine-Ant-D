"use client";

import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { IStore } from "@app/interfaces";
import { SaveButton, useForm } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import {
  Avatar,
  Button,
  Drawer,
  Flex,
  Form,
  Grid,
  Input,
  Segmented,
  Typography,
  theme,
} from "antd";
import React from "react";
type ICreateStore = {
  onclose: any;
};

const CreateStore = ({ onclose }: ICreateStore) => {
  const breakpoint = Grid.useBreakpoint();
  const { token } = theme.useToken();
  const t = useTranslate();
  const { formProps, saveButtonProps, formLoading } = useForm<IStore>({
    resource: "stores",
    action: "create",
    redirect: "list",
  });
  console.log(formProps);
  return (
    <Drawer
      open
      onClose={() => onclose(false)}
      width={breakpoint.sm ? "450px" : "100%"}
      loading={formLoading}
    >
      <Flex justify="center" align="center" className="mb-5" vertical>
        <Avatar
          shape="square"
          src="https://img.icons8.com/?size=100&id=123497&format=png&color=d84a1b"
          size={100}
        />
        <Typography.Text className="display-6" style={{ color: token.volcano }}>
          Add New Store
        </Typography.Text>
      </Flex>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Store Name" name="title" rules={[{ required: true }]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name={["address", "text"]}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={2}
            maxLength={300}
            showCount
            style={{ resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Phone No" name="gsm" rules={[{ required: true }]}>
          <Input placeholder="111 111 11 11" />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={"isActive"}
          rules={[{ required: true }]}
        >
          <Segmented
            options={[
              {
                label: t("stores.fields.isActive.true"),
                value: true,
              },
              {
                label: t("stores.fields.isActive.false"),
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Form>

      <Flex justify="space-between">
        <Button icon={<CloseOutlined />} onClick={() => onclose(false)}>
          Cancel
        </Button>
        <SaveButton
          {...saveButtonProps}
          htmlType="submit"
          type="primary"
          icon={<SaveOutlined />}
        >
          Save
        </SaveButton>
      </Flex>
    </Drawer>
  );
};

export default CreateStore;
