import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { PlacesAutocomplete } from "./PlacesAutocomplete";

const libraries = ["places"];
const initialCenter = { lat: 49.1915, lng: -122.8009 };

export const Location = ({ selectedLocation, setSelectedLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [center, setCenter] = useState(initialCenter);

  useEffect(() => {
    setSelectedLocation(center);

    if (selectedLocation) {
      setCenter(selectedLocation);
      setSelectedLocation(selectedLocation);
    }
  }, [center, selectedLocation, setSelectedLocation]);

  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <PlacesAutocomplete setSelectedLocation={setSelectedLocation} />
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: 250 }}
        mapId="10c669e44c484b19"
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </>
  );
};
