import {
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { createSearchParamsString } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { TableParamsName } from "~/utils/table";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { api } from "~/utils/api";

export default function DeclarationsDistrictFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location } = getDeclarationsFiltersFromSearchParams(searchParams);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    location ?? [],
  );
  const { data: districts } = api.locationDict.getAllDistricts.useQuery();

  const onDistrictChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedDistrict = event.target.value as string[];
    setSelectedLocations([...newSelectedDistrict]);
  };

  const onDistrictClose = () => {
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          { name: DeclarationsParamsKey.location, value: selectedLocations },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  if (!districts?.data) return <div>404</div>;

  return (
    <>
      <InputLabel id="location-filter-label">Location</InputLabel>
      <Select<string[]>
        labelId="location-filter-label"
        id="location-filter"
        value={selectedLocations}
        label="Location"
        onChange={onDistrictChange}
        onClose={onDistrictClose}
        multiple
        className="w-44"
      >
        {districts.data.map(({ name, slug }) => (
          <MenuItem key={slug} value={slug}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
