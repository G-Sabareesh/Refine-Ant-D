import { Flex } from "antd";
import React from "react";
import { PiStarFill, PiStarThin } from "react-icons/pi";

const Star = ({ value }: { value: number }) => {
  let stars = [];
  for (let i = 0; i < value; i++) {
    stars.push(
      <PiStarFill
        key={`{f${i}${Math.floor(Math.random() * 10)}}`}
        style={{ color: "goldenrod", fontSize: "1.2rem" }}
      />
    );
  }
  for (let i = value; i < 5; i++) {
    stars.push(
      <PiStarThin key={`{E${i}${value}}`} style={{ fontSize: "1.2rem" }} />
    );
  }
  return <Flex gap="5px">{stars?.map((item) => item)}</Flex>;
};

export default Star;
