"use client";
import {
  CloudUploadOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ICourier } from "@app/interfaces";
import { Create, Edit, getValueFromEvent, useForm } from "@refinedev/antd";
import {
  HttpError,
  useApiUrl,
  useNavigation,
  useSelect,
  useShow,
} from "@refinedev/core";
import type { BaseRecord } from "@refinedev/core";
import {
  Avatar,
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  Select,
  Typography,
  Upload,
  theme,
} from "antd";
import React from "react";

interface CourierProps {
  setCreateCourier: (value: boolean) => void;
  createCourier: boolean;
}
const CreateCourier: React.FC<CourierProps> = ({
  setCreateCourier,
  createCourier,
}) => {
  const apiUrl = useApiUrl();
  const { formProps, saveButtonProps, formLoading, onFinish } =
    useForm<ICourier>({
      resource: "couriers", // when undefined, id will be read from the URL.
      action: "create",
    });

  const vehicleProps = useSelect({
    resource: "vehicles",
    optionLabel: "model",
    optionValue: "id",
  });
  const { options } = useSelect({
    resource: "stores",
  });
  const { list } = useNavigation();
  // console.log("store", storeProps);

  //   for manually change values before updating and add onfinish attribute to form with this function
  //   const handleSubmit = (values: any) => {
  //     console.log("1", values);
  //     const val = {
  //       ...data,
  //       store: {
  //         ...data?.store,
  //         id: values?.store?.id,
  //       },
  //       vehicle: {
  //         ...data?.vehicle,
  //         model: values.vehicle?.model,
  //       },
  //     };
  //     console.log("final", val);
  //     onFinish(val);
  //   };
  const { token } = theme.useToken();
  const images = Form.useWatch("images", formProps.form);
  const image = images?.[0] || null;
  const previewImageURL = image?.url || image?.response?.url;

  return (
    <Drawer
      onClose={() => {
        setCreateCourier(false);
        list("couriers");
      }}
      open={createCourier}
      size="default"
    >
      <Create saveButtonProps={saveButtonProps} goBack={null}>
        <Form
          {...formProps}
          // onFinish={handleSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
        >
          <Form.Item
            name="images"
            getValueFromEvent={getValueFromEvent}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Flex vertical>
              <Typography.Text className="mb-2">
                <span className="text-danger">*</span> Image
              </Typography.Text>
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
                      width: "100px",
                      height: "100px",
                      border: previewImageURL ? "" : "1px solid #44454770",
                    }}
                    className="position-relative d-flex align-items-center justify-content-center rounded-pill overflow-hidden p-0 m-0"
                  >
                    <Avatar
                      shape="square"
                      style={{
                        aspectRatio: 1,
                        objectFit: "contain",
                        width: previewImageURL ? "100px" : "50px",
                        height: previewImageURL ? "100px" : "50px",
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
                        fontSize: "5px",
                        cursor: "pointer",
                        opacity: 0.5,
                      }}
                    >
                      <CloudUploadOutlined />
                    </div>
                  </Flex>
                </Flex>
              </Upload>
            </Flex>
          </Form.Item>

          <Form.Item
            label={"Name"}
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
            label={"Gsm"}
            name="gsm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Email"}
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Address"}
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Account Number"}
            name="accountNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Store"}
            name={["store", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select options={options} />
          </Form.Item>

          <Form.Item
            label={"Vehicle"}
            name={["vehicle", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...vehicleProps} />
          </Form.Item>
          <Form.Item
            label={"Vehicle Id"}
            name="licensePlate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};

export default CreateCourier;
