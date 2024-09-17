"use client";

import CategoryActive from "@app/components/categories/CategoryActive";
import CaterogyCard from "@app/components/categories/CaterogyCard";
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";
import React from "react";

const CategoriesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  // console.log(tableProps);
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"id"} title={"ID"} />
        <Table.Column dataIndex={"title"} title={"Title"} />
        <Table.Column
          dataIndex={"id"}
          title={"Product"}
          render={(_, record) => <CaterogyCard category={record} />}
        />
        <Table.Column
          align="center"
          dataIndex={"isActive"}
          title={"Status"}
          render={(value) => <CategoryActive value={value} />}
        />
      </Table>
    </List>
  );
};

export default CategoriesList;
