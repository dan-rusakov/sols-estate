import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type $Enums } from "@prisma/client";
import { api } from "~/utils/api";
import { propertyTypeDict } from "~/utils/dictionaries";

interface CreateDeclarationPropertyTypeProps {
  propertyType: keyof typeof $Enums.PropertyType | null;
  setPropertyType: (propertyType: keyof typeof $Enums.PropertyType) => void;
  villaLocation: string | null;
  setVillaLocation: (villaLocation: string) => void;
  apartmentLocation: string | null;
  setApartmentLocation: (apartmentLocation: string) => void;
}

export default function CreateDeclarationPropertyType(
  props: CreateDeclarationPropertyTypeProps,
) {
  const {
    propertyType,
    setPropertyType,
    villaLocation,
    setVillaLocation,
    apartmentLocation,
    setApartmentLocation,
  } = props;

  const { data: villaLocations, isLoading: isVillaLocationsLoading } =
    api.locationDict.getAllVillaLocations.useQuery();
  const { data: apartmentLocations, isLoading: isApartmentLocationsLoading } =
    api.locationDict.getAllApartmentLocations.useQuery();

  const onPropertyTypeChange = (
    event: SelectChangeEvent<keyof typeof $Enums.PropertyType>,
  ) => {
    const newSelectedPropertyType = event.target
      .value as keyof typeof $Enums.PropertyType;
    setPropertyType(newSelectedPropertyType);
  };

  const onVillaLocationChange = (event: SelectChangeEvent<string>) => {
    const newSelectedVillaLocation = event.target.value;
    setVillaLocation(newSelectedVillaLocation);
  };

  const onApartmentLocationChange = (event: SelectChangeEvent<string>) => {
    const newSelectedApartmentLocation = event.target.value;
    setApartmentLocation(newSelectedApartmentLocation);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <FormControl className="w-full">
        <InputLabel id="property-type-filter-label">Property type</InputLabel>
        <Select<keyof typeof $Enums.PropertyType>
          labelId="property-type-filter-label"
          id="property-type-filter"
          value={propertyType ?? ""}
          label="Property type"
          onChange={onPropertyTypeChange}
          required
        >
          {Object.entries(propertyTypeDict).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {propertyType === "VILLA" && (
        <FormControl className="w-full">
          <InputLabel id="villa-location-filter-label">
            Address{" "}
            {isVillaLocationsLoading && (
              <div className="ml-3 inline-flex">
                <CircularProgress size={16} />
              </div>
            )}
          </InputLabel>
          <Select<string>
            labelId="villa-location-filter-label"
            id="villa-location-filter"
            value={villaLocation ?? ""}
            label="Address"
            onChange={onVillaLocationChange}
            disabled={isVillaLocationsLoading}
            required
          >
            {villaLocations?.data.map(({ name, slug }) => (
              <MenuItem key={slug} value={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {propertyType === "APARTMENT" && (
        <FormControl className="w-full">
          <InputLabel id="apartment-location-filter-label">
            Address{" "}
            {isApartmentLocationsLoading && (
              <div className="ml-3 inline-flex">
                <CircularProgress size={16} />
              </div>
            )}
          </InputLabel>
          <Select<string>
            labelId="apartment-location-filter-label"
            id="apartment-location-filter"
            value={apartmentLocation ?? ""}
            label="Address"
            onChange={onApartmentLocationChange}
            disabled={isApartmentLocationsLoading}
            required
          >
            {apartmentLocations?.data.map(({ name, slug }) => (
              <MenuItem key={slug} value={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
