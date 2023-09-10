import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { api } from "~/utils/api";
import { usePathname, useSearchParams } from "next/navigation";
import { FiltersName } from "./DeclarationsFilters.types";
import { createSearchParamsString } from "~/utils/url";
import { getDeclarationsFiltersFromSearchParams } from "./utils";
import { TableParamsName } from "~/utils/table";

export default memo(function DeclarationsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location } = getDeclarationsFiltersFromSearchParams(searchParams);
  const { data: districts } = api.locationDict.getAllDistricts.useQuery();

  const [selectedLocations, setSelectedLocations] =
    useState<string[]>(location);

  const onDistrictChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedDistrict = event.target.value as string[];
    setSelectedLocations([...newSelectedDistrict]);
  };

  const onDistrictClose = () => {
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          { name: FiltersName.location, value: selectedLocations },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  if (!districts) return <div>404</div>;

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="location-filter-label">Location</InputLabel>
      <Select<string[]>
        labelId="location-filter-label"
        id="location-filter"
        value={selectedLocations}
        label="Location"
        onChange={onDistrictChange}
        onClose={onDistrictClose}
        multiple
      >
        {districts.map(({ name, slug }) => (
          <MenuItem key={slug} value={slug}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
