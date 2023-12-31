import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { api } from "~/utils/api";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

interface CreateDeclarationLocationProps {
  district: string | null;
  setDistrict: (district: string) => void;
  city: string | null;
  setCity: (city: string) => void;
  region: string | null;
  setRegion: (city: string) => void;
  cityRequired?: boolean;
  regionRequired?: boolean;
}

export default function CreateLocation(props: CreateDeclarationLocationProps) {
  const {
    district,
    setDistrict,
    city,
    setCity,
    region,
    setRegion,
    cityRequired,
    regionRequired,
  } = props;

  const { data: districts, isLoading: isDistrictsLoading } =
    api.locationDict.getAllDistricts.useQuery();
  const { data: cities, isLoading: isCitiesLoading } =
    api.locationDict.getAllCities.useQuery();
  const { data: regions, isLoading: isRegionsLoading } =
    api.locationDict.getAllRegions.useQuery();

  const onDistrictChange = (event: SelectChangeEvent) => {
    const newSelectedDistrict = event.target.value;
    setDistrict(newSelectedDistrict);
  };

  const onCityChange = (event: SelectChangeEvent) => {
    const newSelectedCity = event.target.value;
    setCity(newSelectedCity);
  };

  const onRegionChange = (event: SelectChangeEvent) => {
    const newSelectedRegion = event.target.value;
    setRegion(newSelectedRegion);
  };

  return (
    <div className="pb-6 pt-4">
      <p className="text-md mb-4 font-normal text-neutral-700">
        Beach / Location
        <InfoTooltip text="Select district, city and region in which you want to track the creation of requests" />
      </p>
      <div className="flex flex-col gap-y-6">
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
            value={district ?? ""}
            label="District"
            onChange={onDistrictChange}
            disabled={isDistrictsLoading}
          >
            {districts?.data.map(({ name, slug }) => (
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
            value={city ?? ""}
            label="City"
            onChange={onCityChange}
            disabled={isCitiesLoading}
            required={!!cityRequired}
          >
            {cities?.data.map(({ name, slug }) => (
              <MenuItem key={slug} value={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            value={region ?? ""}
            label="Region"
            onChange={onRegionChange}
            disabled={isRegionsLoading}
            required={!!regionRequired}
          >
            {regions?.data.map(({ name, slug }) => (
              <MenuItem key={slug} value={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
