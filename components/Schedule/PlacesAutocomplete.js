import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Input } from "../ui/input";
import { MapPin } from "lucide-react";

export const PlacesAutocomplete = ({ setSelected }) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    setSelected({ lat, lng });
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search for a location..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {status === "OK" && (
        <ul className="items-left my-4 flex flex-col justify-center gap-2 rounded-lg border border-gray-200 p-4">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="border-b border-gray-200 p-2 hover:cursor-pointer hover:bg-gray-100"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PlacesAutocomplete;
