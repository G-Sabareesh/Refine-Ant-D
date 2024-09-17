"use client";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Status from "@app/components/status";
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
} from "@refinedev/core";
import { Avatar, Button, Input, Space, Table, theme } from "antd";
import { Children, PropsWithChildren } from "react";

export default function UsersList() {
  const { tableProps, filters } = useTable({
    syncWithLocation: true,
  });

  const go = useGo();

  const { showUrl } = useNavigation();

  const { token } = theme.useToken();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"id"} title={"ID"} />
        <Table.Column
          align="center"
          key="avatar"
          dataIndex={"avatar"}
          title={"Avatar"}
          render={(value) => (
            <Avatar
              src={
                "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              }
              alt="sadf"
            />
          )}
        />
        <Table.Column
          title={"Name"}
          dataIndex={"fullName"}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{ color: filtered ? token.colorPrimary : undefined }}
            />
          )}
          defaultFilteredValue={getDefaultFilter(
            "fullName",
            filters,
            "contains"
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={"Enter Customer Name"} />
            </FilterDropdown>
          )}
        />
        <Table.Column title={"Ph.no"} dataIndex={"gsm"} />
        <Table.Column
          key="createdAt"
          dataIndex="createdAt"
          title={"Created at"}
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column
          dataIndex={"isActive"}
          title={"Status"}
          render={(value) => <Status value={value} />}
          sorter
        />
        <Table.Column
          fixed="right"
          title={"Actions"}
          render={(_, record) => (
            <ShowButton hideText size="small" recordItemId={record.id} />
          )}
        />
      </Table>
    </List>
  );
}
