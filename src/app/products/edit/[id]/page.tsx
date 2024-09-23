"use client";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ICategory, IProduct } from "@app/interfaces";
import {
  Edit,
  NumberField,
  SaveButton,
  getValueFromEvent,
  useForm,
} from "@refinedev/antd";
import {
  HttpError,
  useApiUrl,
  useSelect,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Upload,
  InputNumber,
  Segmented,
  Select,
  message,
  theme,
} from "antd";
import React, { useState } from "react";

import type { GetProp, UploadFile, UploadProps } from "antd";

// interface refineCoreProps {
//   resource: string;
//   action: string;
//   id: any;
// }
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ShowProduct = () => {
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as FileType);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  const apiUrl = useApiUrl();
  const { query: data } = useShow();

  const t = useTranslate();

  const { token } = theme.useToken();

  const { formProps, saveButtonProps, formLoading } = useForm<IProduct>({
    resource: "products",
    id: data?.data?.data.id, // when undefined, id will be read from the URL.
    action: "edit",
    redirect: "list",
  });

  const categorySelectProps = useSelect<ICategory>({
    resource: "categories",
  });

  // console.log("casdffsds", categorySelectProps);

  // console.log("fffff", formProps);
  // console.log("sssss", saveButtonProps);

  // const [fileList, setFileList] = useState([]);

  // const handleChange = (info: any) => {
  //   setFileList(info.fileList);

  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  // const uploadButton =
  //   fileList.length > 0 ? (
  //     <div>
  //       <div style={{ marginTop: 8 }}>Change</div>
  //     </div>
  //   ) : (
  //     <div>
  //       <PlusOutlined />
  //       <div style={{ marginTop: 8 }}>Upload</div>
  //     </div>
  //   );

  // const getValueFromEvent = (e: any) => {
  //   console.log(e);
  //   // if (Array.isArray(e)) {
  //   //   return e;
  //   // }
  //   return e && e.fileList
  //     ? e.fileList
  //         .map((file: any) => {
  //           if (file.status === "done") {
  //             return {
  //               uid: file.uid,
  //               name: file.name,
  //               type: file.type,
  //               size: file.size,
  //               lastModified: file.lastModified,
  //               lastModifiedDate: file.lastModifiedDate,
  //               url: file.response.url, // Extract URL from response
  //             };
  //           }
  //           return null; // Skip if not done
  //         })
  //         .filter(Boolean)
  //     : [];
  // };
  const images = Form.useWatch("images", formProps.form);
  // console.log(images)
  // const image = images?.[0]?.file?.response || null;
  const image = images?.[0] || null;
  const previewImageURL = image?.url || image?.response?.url;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("products.fields.images.label")}
          name="images"
          className="w-100"
          rules={[{ required: true }]}
        >
          <Upload.Dragger
            name="file"
            action={`${apiUrl}/media/upload`}
            maxCount={1}
            accept=".png,.jpg,.jpeg"
            // className={styles.uploadDragger}
            showUploadList={false}
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
              <Avatar
                shape="square"
                style={{
                  aspectRatio: 1,
                  objectFit: "contain",
                  width: "200px",
                  height: "200px",
                  marginTop: previewImageURL ? undefined : "auto",
                  transform: previewImageURL ? undefined : "translateY(50%)",
                }}
                src={previewImageURL || "/images/product-default-img.png"}
                alt="Product Image"
              />
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
          </Upload.Dragger>
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
          name="description"
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
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={t("products.fields.isActive.label")}
          rules={[{ required: true }]}
          name={"isActive"}
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
    </Edit>
  );
};

export default ShowProduct;
