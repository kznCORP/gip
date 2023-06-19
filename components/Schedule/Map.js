import React, { useMemo, useState } from "react";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatlng } from "use-places-autocomplete";

import { PlacesAutocomplete } from "./PlacesAutocomplete";

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const initialCenter = useMemo(() => ({ lat: 49.1915, lng: -122.8009 }), []);
  const [selected, setSelected] = useState(null);

  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="my-2">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        center={initialCenter}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: 250 }}
        mapId="10c669e44c484b19"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};
