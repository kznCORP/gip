import React from "react";
import { Map } from "react-map-gl";

export const Location = () => {
  return (
    <Map
      reuseMaps
      initialViewState={{
        longitude: -123.11,
        latitude: 49.24,
        zoom: 8,
      }}
      style={{ width: "100%", height: 250 }}
      mapStyle="mapbox://styles/jayfillon/clj0npv4c00gn01pw2fq20p9n"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}
    />
  );
};
