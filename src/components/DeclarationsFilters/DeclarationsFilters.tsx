import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import { memo } from "react";
import { api } from "~/utils/api";
import { usePathname, useSearchParams } from "next/navigation";
import { FiltersName } from "./DeclarationsFilters.types";
import { createSearchParamsString } from "~/utils/filters";
import { getDeclarationsFiltersFromSearchParams } from "./utils";

export default memo(function DeclarationsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location: selectedLocation } =
    getDeclarationsFiltersFromSearchParams(searchParams);
  const { data: districts } = api.locationDict.getAllDistricts.useQuery();

  const onDistrictChange = (event: SelectChangeEvent<string>) => {
    const newSelectedDistrict = event.target.value ?? "";

    void router.push(
      pathname +
        "?" +
        createSearchParamsString(
          searchParams,
          FiltersName.location,
          newSelectedDistrict,
        ),
    );
  };

  if (!districts) return <div>404</div>;

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="location-filter-label">Location</InputLabel>
      <Select<string>
        labelId="location-filter-label"
        id="location-filter"
        value={selectedLocation}
        label="Location"
        onChange={onDistrictChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {districts.map(({ name, slug }) => (
          <MenuItem key={slug} value={slug}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
