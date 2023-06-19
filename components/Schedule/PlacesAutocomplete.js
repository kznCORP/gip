import React from "react";

import usePlacesAutocomplete from "use-places-autocomplete";

import { Input } from "../ui/input";

export const PlacesAutocomplete = ({ setSelected }) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  console.log(value);

  return (
    <>
      <Input
        type="text"
        placeholder="Search for a location..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default PlacesAutocomplete;
