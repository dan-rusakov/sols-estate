import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { api } from "~/utils/api";

interface CreateAgentLegalAddressFilterProps {
  selectedRegion?: string;
  setSelectedRegion: (region: string) => void;
  selectedCity?: string;
  setSelectedCity: (city: string) => void;
  selectedDistrict?: string;
  setSelectedDistrict: (district: string) => void;
  selectedRegionError: boolean;
  selectedCityError: boolean;
  selectedDistrictError: boolean;
}

export default function CreateAgentLegalAddressFilter({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedRegionError,
  selectedCityError,
  selectedDistrictError,
}: CreateAgentLegalAddressFilterProps) {
  const { data: regions, isLoading: isRegionsLoading } =
    api.legalAddressDict.getAllRegions.useQuery();
  const { data: cities, isLoading: isCitiesLoading } =
    api.legalAddressDict.getAllCities.useQuery();
  const { data: districts, isLoading: isDistrictsLoading } =
    api.legalAddressDict.getAllDistricts.useQuery();

  const onRegionChange = (event: SelectChangeEvent<string>) => {
    const newSelectedRegion = event.target.value;
    setSelectedRegion(newSelectedRegion);
  };

  const onCityChange = (event: SelectChangeEvent<string>) => {
    const newSelectedCity = event.target.value;
    setSelectedCity(newSelectedCity);
  };

  const onDistrictChange = (event: SelectChangeEvent<string>) => {
    const newSelectedDistrict = event.target.value;
    setSelectedDistrict(newSelectedDistrict);
  };

  return (
    <>
      <FormControl className="w-full">
        <InputLabel id="region-filter-label" className="flex items-center">
          Region{" "}
          {isRegionsLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string>
          labelId="region-filter-label"
          id="region-filter"
          value={selectedRegion ?? ""}
          label="Region"
          onChange={onRegionChange}
          disabled={isRegionsLoading}
          required
          error={selectedRegionError}
        >
          {regions?.data.map(({ name, slug }) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-full">
        <InputLabel id="city-filter-label" className="flex items-center">
          City{" "}
          {isCitiesLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string>
          labelId="city-filter-label"
          id="city-filter"
          value={selectedCity ?? ""}
          label="City"
          onChange={onCityChange}
          disabled={isCitiesLoading}
          required
          error={selectedCityError}
        >
          {cities?.data.map(({ name, slug }) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-full">
        <InputLabel id="district-filter-label" className="flex items-center">
          District{" "}
          {isDistrictsLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string>
          labelId="district-filter-label"
          id="district-filter"
          value={selectedDistrict ?? ""}
          label="District"
          onChange={onDistrictChange}
          disabled={isDistrictsLoading}
          required
          error={selectedDistrictError}
        >
          {districts?.data.map(({ name, slug }) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
