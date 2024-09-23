import { ICourier } from "@app/interfaces";
import { useList } from "@refinedev/core";
import React from "react";
import type { BaseRecord } from "@refinedev/core";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { PiStarThin, PiStarFill, PiStarHalfFill } from "react-icons/pi";
const Rating = ({ record }: { record: ICourier }) => {
  const { data, isLoading } = useList({
    resource: "reviews",
    filters: [
      {
        field: "order.courier.id",
        operator: "eq",
        value: record?.id,
      },
    ],
  });
  //   console.log(data?.data);

  const totalStar = data?.data ? data?.data?.length * 5 : 5;
  const currentStar =
    data?.data?.reduce((acc, item) => acc + item.star, 0) || 0;

  const review = currentStar > 0 ? (currentStar / totalStar) * 5 : currentStar;

  const decimal = review.toFixed(1).toString()[2];
  const roundedValue = Math.floor(review);
  let stars = [];
  for (let i = 0; i < roundedValue; i++) {
    stars.push(
      <PiStarFill
        key={`{f${i}${record?.id}}`}
        style={{ color: "goldenrod", fontSize: "1.2rem" }}
      />
    );
  }
  let remainingstar = roundedValue;
  if (Number(decimal) >= 5) {
    remainingstar += 1;
    stars.push(
      <PiStarHalfFill
        key={`{H${record?.id}}`}
        style={{ color: "goldenrod", fontSize: "1.2rem" }}
      />
    );
  }
  for (let i = remainingstar; i < 5; i++) {
    stars.push(
      <PiStarThin key={`{E${i}${record?.id}}`} style={{ fontSize: "1.2rem" }} />
    );
  }

  //   return <div>{data?.data?.data?.star}</div>;
  return isLoading ? (
    <Spin />
  ) : (
    <Flex gap={"5px"}>
      {stars.map((item) => item)}
    </Flex>
  );
};

export default Rating;
