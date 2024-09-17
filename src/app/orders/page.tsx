"use client";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CalculatePrice from "@app/components/CalculatePrice";
import OrderMenuButton from "@app/components/OrderMenuButton";
import OrderStatus from "@app/components/OrderStatus";
import { OrderTableColumnProducts } from "@app/components/OrderTableColumnProduct";
import Status from "@app/components/status";
import { IOrder, IOrderStatus } from "@app/interfaces";
// import type HttpError from "@refinedev/core";
// import UserStatus from "@components/userstatus/page";
import {
  DateField,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ListButton,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import {
  type BaseRecord,
  useMany,
  useGo,
  useNavigation,
  getDefaultFilter,
  useSelect,
  BaseOption,
  BaseKey,
} from "@refinedev/core";
import { Input, MenuProps, Select, theme } from "antd";
import { Avatar, Button, Menu, Space, Table } from "antd";
import { Children, PropsWithChildren, useState } from "react";

export default function UsersList() {
  const { tableProps, filters } = useTable({
    syncWithLocation: true, //TableProps<BaseRecord>
  });
  const { token } = theme.useToken();

  const go = useGo();

  // console.log(tableProps);

  const { show } = useNavigation();

  // console.log(filters);
  const { options, onSearch } = useSelect<IOrderStatus>({
    resource: "orderStatuses",
    optionLabel: "text",
    optionValue: "text",
    defaultValue: getDefaultFilter("status.text", filters, "in"),
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record: any) => {
          // console.log(record.id);
          // console.log(record);
          return {
            onClick: () => show("orders", record?.id),
          };
        }}
      >
        <Table.Column
          key="orderNumber"
          dataIndex={"orderNumber"}
          title={"Order Id"}
          sorter
          render={(orderid) => {
            return `#${orderid}`;
          }}
        />
        <Table.Column<IOrder>
          key="status.text"
          title={"Status"}
          dataIndex={["status", "text"]}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                options={options}
                onChange={onSearch}
                placeholder="Select status to search"
                style={{ width: "200px" }}
                allowClear
                mode="tags"
              ></Select>
            </FilterDropdown>
          )}
          render={(_, record) => {
            return <OrderStatus record={record} />;
          }}
        />
        <Table.Column
          key="products"
          dataIndex="products"
          title={"products"}
          render={(record) => {
            return <OrderTableColumnProducts order={record} />;
          }}
        />
        <Table.Column
          key="store.title"
          title={"Store"}
          dataIndex={["store", "title"]}
        />
        <Table.Column
          key="products"
          title={"Amount"}
          dataIndex={"products"}
          sorter
          render={(products) => {
            return <CalculatePrice product={products} />;
          }}
        />
        <Table.Column
          key="user.fullName"
          title={"Name"}
          dataIndex={["user", "fullName"]}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          defaultFilteredValue={getDefaultFilter(
            "user.fullName",
            filters,
            "contains"
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={"Enter Customer Name : "} />
            </FilterDropdown>
          )}
        />
        <Table.Column<IOrder>
          fixed="right"
          key="status"
          title="Actions"
          dataIndex={"status"}
          render={(_, record) => {
            return <OrderMenuButton record={record} />;
          }}
        />
      </Table>
    </List>
  );
}
