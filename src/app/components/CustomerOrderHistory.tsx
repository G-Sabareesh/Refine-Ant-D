import { NumberField, useTable } from "@refinedev/antd";
// import type { IUser, IOrder, IOrderFilterVariables } from "../../../interfaces";
import { type HttpError, useNavigation, useTranslate } from "@refinedev/core";
import { Table, Typography } from "antd";
import { OrderTableColumnProducts } from "./OrderTableColumnProduct";
import OrderStatus from "./OrderStatus";
import { IOrder } from "@app/interfaces";
// import { OrderStatus, OrderTableColumnProducts } from "../../order";

type Props = {
  customer?: any;
};

export const CustomerOrderHistory = ({ customer }: Props) => {
  const t = useTranslate();
  const { show } = useNavigation();

  const { tableProps } = useTable({
    resource: "orders",
    initialSorter: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    permanentFilter: [
      {
        field: "user.id",
        operator: "eq",
        value: customer?.id,
      },
    ],
    initialPageSize: 4,
    queryOptions: {
      enabled: customer !== undefined,
    },
    syncWithLocation: false,
  });

  return (
    <Table
      {...tableProps}
      rowKey="id"
      //   onRow={(record) => {
      //     return {
      //       onClick: () => {
      //         show("orders", record?.id);
      //       },
      //     };
      //   }}
      pagination={{
        ...tableProps.pagination,
        hideOnSinglePage: true,
      }}
    >
      <Table.Column
        title={`orders #`}
        dataIndex="id"
        key="id"
        render={(value) => (
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            #{value}
          </Typography.Text>
        )}
      />
      <Table.Column<IOrder>
        key="status"
        dataIndex="status"
        title={"status"}
        render={(_, record) => {
          return <OrderStatus record={record} />;
        }}
      />
      <Table.Column
        key="products"
        dataIndex="products"
        title={"products"}
        render={(products) => {
          return <OrderTableColumnProducts order={products} />;
        }}
      />
      <Table.Column
        dataIndex="amount"
        align="end"
        title={"amount"}
        render={(amount) => {
          return (
            <NumberField
              value={amount}
              style={{
                whiteSpace: "nowrap",
              }}
              options={{
                style: "currency",
                currency: "USD",
              }}
            />
          );
        }}
      />
      <Table.Column
        key="store.title"
        dataIndex={["store", "title"]}
        title={"store"}
      />
    </Table>
  );
};
