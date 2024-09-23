"use client";

import { CloudUploadOutlined } from "@ant-design/icons";
import { IProduct } from "@app/interfaces";
import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { useApiUrl, useSelect, useTranslate } from "@refinedev/core";
import {
  Avatar,
  Flex,
  Form,
  Input,
  InputNumber,
  Segmented,
  Select,
  theme,
  Upload,
} from "antd";
import React from "react";

const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm<IProduct>({
    redirect: "list",
  });
  const t = useTranslate();
  // console.log(formProps);
  const apiUrl = useApiUrl();
  const { token } = theme.useToken();

  const images = Form.useWatch("images", formProps.form);

  const selectCategory = useSelect({
    resource: "categories",
  });
  // console.log(images)
  // const image = images?.[0]?.file?.response || null;
  const image = images?.[0] || null;
  const previewImageURL = image?.url || image?.response?.url;
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("products.fields.images.label")}
          name="images"
          getValueFromEvent={getValueFromEvent}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload
            action={`${apiUrl}/media/upload`}
            // listType="picture-card"
            // onChange={onChange}
            // onPreview={onPreview}
            showUploadList={false}
            maxCount={1}
          >
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              <Flex
                vertical
                align="center"
                justify="center"
                style={{
                  width: "200px",
                  height: "200px",
                  border: previewImageURL ? "" : "1px solid #44454770",
                }}
                className="position-relative d-flex align-items-center justify-content-center rounded-2 p-0 m-0"
              >
                <Avatar
                  shape="square"
                  style={{
                    aspectRatio: 1,
                    objectFit: "contain",
                    width: previewImageURL ? "200px" : "100px",
                    height: previewImageURL ? "200px" : "100px",
                    marginTop: "auto",
                    transform: previewImageURL ? "" : "translateY(-50%)",
                  }}
                  src={
                    previewImageURL ||
                    "https://img.icons8.com/?size=100&id=kq0iMadL2AjZ&format=png&color=393939"
                  }
                  alt="Product Image"
                />
                <div
                  className="position-absolute d-flex align-items-center justify-content-center rounded-bottom p-1 fs-6"
                  style={{
                    bottom: "0",
                    width: "100%",
                    backgroundColor: token.volcano,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <CloudUploadOutlined className="fs-4 px-2" />{" "}
                  <span>{!previewImageURL ? "Upload" : "Change"}</span>
                </div>
              </Flex>
              {/* <Button
                icon={<UploadOutlined />}
                style={{
                  marginTop: "auto",
                  marginBottom: "16px",
                  backgroundColor: token.colorBgContainer,
                  ...(!!previewImageURL && {
                    position: "absolute",
                    bottom: 0,
                  }),
                }}
              >
                {t("products.fields.images.description")}
              </Button> */}
            </Flex>
          </Upload>
        </Form.Item>
        <Form.Item
          label={t("products.fields.name")}
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("products.fields.description")}
          name={"description"}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            rows={1}
            maxLength={200}
            showCount
            style={{ resize: "none" }}
          />
        </Form.Item>
        <Form.Item
          label={t("products.fields.price")}
          name={"price"}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "150px" }} />
        </Form.Item>
        <Form.Item
          label={t("products.fields.category")}
          rules={[{ required: true }]}
          name={["category", "id"]}
        >
          <Select {...selectCategory} />
        </Form.Item>
        <Form.Item
          label={t("products.fields.isActive.label")}
          name={"isActive"}
          rules={[{ required: true }]}
        >
          <Segmented
            options={[
              {
                label: t("products.fields.isActive.true"),
                value: true,
              },
              {
                label: t("products.fields.isActive.false"),
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default CreateProduct;
