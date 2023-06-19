import React from "react";

export const Location = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -123.11,
    latitude: 49.24,
    zoom: 8,
  });

  return (
    <>
      <h2>Hello Map</h2>
    </>
  );
};
