"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Rectangle, icon, popup } from "leaflet";
import type { IOrder } from "@app/interfaces";
import { BaseRecord, useNavigation } from "@refinedev/core";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "leaflet-routing-machine";
import { UserOutlined } from "@ant-design/icons";

const MapForComponent = ({
  data,
}: {
  data: IOrder | undefined | BaseRecord;
}) => {
  const CourierPosition = Array.isArray(data)
    ? data.map((item) => item?.courier?.store?.address?.coordinate || [0, 0])
    : [];
  const CustomerPosition = Array.isArray(data)
    ? data.map((item) => item?.adress?.coordinate || [0, 0])
    : [];
  const CourierPopup = Array.isArray(data)
    ? data.map((item) => item?.courier?.store?.address?.text)
    : [];

  const CustomerPopup = Array.isArray(data)
    ? data.map((item) => item?.adress?.text)
    : [];

  // const BikeIcon = L.icon({
  //   iconUrl: "/images/marker-courier.svg", // Path to your SVG file
  //   iconSize: [32, 32], // Adjust size as needed
  //   iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  //   popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  // });
  // const CustomerIcon = new L.Icon({
  //   iconUrl: "/images/marker-customer.svg", // Path to your SVG file
  //   iconSize: [32, 32], // Adjust size as needed
  //   iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  //   popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  // });

  const BikeIcon = new L.Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=SxC2hmS49DQd&format=png&color=000000", // Replace with the path to your custom image
    iconSize: [32, 32], // Size of the icon
    // iconAnchor: position && [Number(position[0]), Number(position[1])], // Point of the icon which will correspond to marker's location
    //   popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  const CustomerIcon = new L.Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=JV4CtfM2e55t&format=png&color=000000", // Replace with the path to your custom image
    iconSize: [32, 32], // Size of the icon
    // iconAnchor: position && [Number(position[0]), Number(position[1])], // Point of the icon which will correspond to marker's location
    //   popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  const CenterPosition: any = ["40.73061", "-73.935242"];

  return (
    <>
      {CourierPosition[0] !== undefined && (
        <MapContainer
          bounds={[[CenterPosition[0], CenterPosition[1]]]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            // maxZoom={10}
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {CourierPosition.map((item, index) => (
            <Marker
              key={"Courier" + index}
              position={[item[0], item[1]]}
              icon={BikeIcon}
            >
              {CourierPopup.map((item, index) => (
                <Popup key={"CourierPopup" + index}>{item}</Popup>
              ))}
            </Marker>
          ))}
          {CustomerPosition.map((item, index) => (
            <Marker
              key={"Customer" + index}
              position={[item[0], item[1]]}
              icon={CustomerIcon}
            >
              {CustomerPopup.map((item, index) => (
                <Popup key={"CustomerPopup" + index}>{item}</Popup>
              ))}
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default MapForComponent;
