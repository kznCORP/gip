import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";

import { MapPin, Map } from "lucide-react";

export const PlacesAutocomplete = ({ setSelectedLocation }) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const DEFAULT_PHOTO_URL =
    "https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg?auto=compress&cs=tinysrgb&w=600";

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const placeId = results[0].place_id;

      const details = await getDetails({ placeId });
      const { name, photos, rating, url } = details;

      const { lat, lng } = await getLatLng(results[0]);

      const selectedLocation = {
        lat: lat || "",
        lng: lng || "",
        address: address || "",
        name: name || "",
        photoUrl:
          photos?.[0]?.getUrl({ maxWidth: 600, maxHeight: 600 }) ||
          DEFAULT_PHOTO_URL,
        rating: rating || "",
        url: url || "",
      };

      const isInvalidData =
        !selectedLocation.lat ||
        !selectedLocation.lng ||
        !selectedLocation.address ||
        !selectedLocation.name;

      if (isInvalidData) {
        console.log("Invalid location data:", selectedLocation);
        return;
      }

      setSelectedLocation(selectedLocation);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="flex rounded-lg bg-white p-4">
        <div className="flex items-center justify-center rounded-lg p-1">
          <div className="h-[25px] w-[25px]">
            <Map />
          </div>
        </div>

        <input
          type="text"
          placeholder="eg. Hawaii, Paris, Japan..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="ml-4 w-full text-sm font-medium"
          style={{
            textDecoration: "unset",
            border: "unset",
            outline: "none",
            width: "100%",
          }}
          maxLength="50"
        />
      </div>

      {status === "OK" && (
        <ul className="items-left my-4 flex flex-col justify-center gap-2 rounded-lg bg-white p-4">
          {data.map(({ place_id, description }) => (
            <div
              key={place_id}
              className="flex items-center justify-start gap-2 p-2 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(description)}
            >
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <li className="ml-4 w-full border-b border-gray-200 py-2 text-xs ">
                {description}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
