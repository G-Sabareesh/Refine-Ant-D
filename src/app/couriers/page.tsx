"use client";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import CourierStatus from "@app/components/couriers/CourierStatus";
import CreateCourier from "./create/CreateCourier";
import Rating from "@app/components/couriers/Rating";
import { ICourier } from "@app/interfaces";
import { FilterDropdown, List, ShowButton, useTable } from "@refinedev/antd";
import { Show } from "@refinedev/antd";
import { getDefaultFilter } from "@refinedev/core";
import { Avatar, Button, Input, Table, theme } from "antd";
import React, { useState } from "react";
// import CreateCourier from "./create/page";

export default function ShowCouriers() {
  const { tableProps, filters } = useTable();
  const { token } = theme.useToken();
  const [createCourier, setCreateCourier] = useState<boolean>(false);
  // console.log(tableProps.dataSource);

  return (
    <>
      {createCourier ? (
        // <CreateCourier
        //   setCreateCourier={setCreateCourier}
        //   createCourier={createCourier}
        // />
        <CreateCourier
          setCreateCourier={setCreateCourier}
          createCourier={createCourier}
        />
      ) : null}
      <List
        canCreate={true}
        createButtonProps={{
          onClick: () => setCreateCourier(true),
          color: token?.colorPrimary,
        }}
        // headerButtons={() => (
        //   <Button
        //     onClick={() => setCreateCourier(true)}
        //     color={token.colorPrimary}
        //   >
        //     Create
        //   </Button>
        // )}
      >
        <Table {...tableProps}>
          <Table.Column dataIndex={"id"} title={"ID #"} />
          <Table.Column
            dataIndex={"name"}
            title={"Name"}
            defaultFilteredValue={getDefaultFilter("name", filters, "contains")}
            filterIcon={(filtered) => (
              <SearchOutlined
                style={{ color: filtered ? token.colorPrimary : undefined }}
              />
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Enter Name to Search" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            key={"avatar"}
            dataIndex={"avatar"}
            title={"Avatar"}
            render={(value) => (
              <Avatar //use value[0].url as the src
                src={
                  "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                }
                alt="profile"
              />
            )}
          />
          <Table.Column
            dataIndex={"licensePlate"}
            title={"Vehicle id"}
            filterIcon={(filtered) => (
              <SearchOutlined
                style={{ color: filtered ? token.colorPrimary : undefined }}
              />
            )}
            defaultFilteredValue={getDefaultFilter(
              "licensePlate",
              filters,
              "contains"
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Enter Vehicle id to search" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex={"gsm"}
            title={"Gsm"}
            filterIcon={(filtered) => (
              <SearchOutlined
                style={{ color: filtered ? token.colorPrimary : undefined }}
              />
            )}
            defaultFilteredValue={getDefaultFilter("gsm", filters, "contains")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Enter Gsm to search" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            key={"store.title"}
            dataIndex={["store", "title"]}
            title={"Store"}
            filterIcon={(filtered) => (
              <SearchOutlined
                style={{ color: filtered ? token.colorPrimary : undefined }}
              />
            )}
            defaultFilteredValue={getDefaultFilter(
              "store.title",
              filters,
              "contains"
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Enter Store Title to search" />
              </FilterDropdown>
            )}
          />
          <Table.Column<ICourier>
            dataIndex={""}
            title={"Rating"}
            render={(_, record) => {
              return <Rating record={record} />;
            }}
          />
          <Table.Column
            dataIndex={"status"}
            title={"Status"}
            render={(status) => {
              return <CourierStatus status={status} />;
            }}
          />
          <Table.Column
            dataIndex={""}
            title={"Actions"}
            fixed="right"
            render={(_, record) => (
              <ShowButton
                icon={<EyeOutlined />}
                hideText
                recordItemId={record?.id}
              />
            )}
          />
        </Table>
      </List>
    </>
  );
}
