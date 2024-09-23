"use client";

import { PlusSquareOutlined, SearchOutlined } from "@ant-design/icons";
import CreateStore from "@app/components/store/CreateStore";
import StoreStatus from "@app/components/store/StoreStatus";
import { IStore } from "@app/interfaces";
import {
  CreateButton,
  FilterDropdown,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Input, Select, Table, theme } from "antd";
import React, { useState } from "react";

const StoreList = () => {
  const t = useTranslate();
  const [createStore, setCreateStore] = useState(false);
  const { tableProps, sorters, filters } = useTable<IStore>({
    filters: {
      initial: [
        {
          field: "title",
          operator: "contains",
          value: "",
        },
        {
          field: "email",
          operator: "contains",
          value: "",
        },
      ],
    },
    syncWithLocation: false,
  });

  const { token } = theme.useToken();
  return (
    <List
      headerButtons={(props) => [
        <CreateButton
          {...props.createButtonProps}
          key="create"
          size="large"
          icon={<PlusSquareOutlined />}
          onClick={() => setCreateStore(true)}
        >
          {"Add New Store"}
        </CreateButton>,
      ]}
    >
      <Table
        {...tableProps}
        rowKey={"id"}
        // pagination={{
        //   ...tableProps.pagination,
        //   showTotal: (total) => (
        //     <PaginationTotal total={total} entityName="products" />
        //   ),
        // }}
      >
        <Table.Column dataIndex={"id"} title={t("stores.fields.id")} />
        <Table.Column
          dataIndex={"title"}
          title={t("stores.fields.title")}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("stores.filter.title.placeholder")} />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={"email"}
          title={t("stores.fields.email")}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{ color: filtered ? token.colorPrimary : undefined }}
            />
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("stores.filter.email.placeholder")} />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex={"gsm"} title={t("stores.fields.phone")} />
        <Table.Column
          dataIndex={["address", "text"]}
          title={t("stores.fields.address")}
        />
        <Table.Column
          align="center"
          dataIndex={"isActive"}
          title={t("stores.fields.isActive.label")}
          render={(isActive: boolean) => <StoreStatus value={isActive} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{
                  width: "200px",
                }}
                allowClear
                placeholder={t("stores.fields.isActive.placeholder")}
              >
                <Select.Option value="true">
                  {t("stores.fields.isActive.true")}
                </Select.Option>
                <Select.Option value="false">
                  {t("stores.fields.isActive.false")}
                </Select.Option>
              </Select>
            </FilterDropdown>
          )}
        />
        <Table.Column
          align="center"
          fixed="right"
          dataIndex={"actions"}
          title={t("table.actions")}
          render={(_, record) => (
            <ShowButton hideText size="middle" recordItemId={record.id} />
          )}
        />
      </Table>
      {createStore && <CreateStore onclose={setCreateStore} />}
    </List>
  );
};

export default StoreList;
