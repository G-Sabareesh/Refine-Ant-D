"use client";

import { useList } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DeliveryMap = () => {
  const [isMounted, setIsMounted] = useState(false);
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Clear existing markers on re-render
    const markers: any = [];

    const { data } = useList({
      resource: "orders",
      config: {
        filters: [
          {
            field: "status.text",
            operator: "eq",
            value: "On The Way",
          },
        ],
        pagination: { mode: "off" },
      },
    });

    const dataResult = data?.data || [];

    const CourierPosition = dataResult.map(
      (item) => item?.courier?.store?.address?.coordinate || [0, 0]
    );
    const CustomerPosition = dataResult.map(
      (item) => item?.adress?.coordinate || [0, 0]
    );
    const CourierPopup = dataResult.map(
      (item) => item?.courier?.store?.address?.text
    );
    const CustomerPopup = dataResult.map((item) => item?.adress?.text);

    const BikeIcon = new L.Icon({
      iconUrl:
        "https://img.icons8.com/?size=100&id=SxC2hmS49DQd&format=png&color=000000",
      iconSize: [32, 32],
    });

    const CustomerIcon = new L.Icon({
      iconUrl:
        "https://img.icons8.com/?size=100&id=JV4CtfM2e55t&format=png&color=000000",
      iconSize: [32, 32],
    });

    // Add Courier Markers
    CourierPosition.forEach((position, index) => {
      const marker = L.marker(position, { icon: BikeIcon }).addTo(map);
      marker.bindPopup(CourierPopup[index]);
      markers.push(marker);
    });

    // Add Customer Markers
    CustomerPosition.forEach((position, index) => {
      const marker = L.marker(position, { icon: CustomerIcon }).addTo(map);
      marker.bindPopup(CustomerPopup[index]);
      markers.push(marker);
    });

    // Cleanup markers on unmount
    return () => {
      markers.forEach((marker: any) => {
        map.removeLayer(marker);
      });
    };
  }, [map]);

  const CenterPosition = [40.73061, -73.935242];

  return (
    <>
      {isMounted && (
        <MapContainer
          center={[CenterPosition[0], CenterPosition[1]]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            maxZoom={10}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </>
  );
};

export default DeliveryMap;
