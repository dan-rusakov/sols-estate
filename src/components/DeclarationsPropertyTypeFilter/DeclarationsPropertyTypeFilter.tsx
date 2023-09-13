import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { useState } from "react";
import { TableParamsName } from "~/utils/table";
import {
  DeclarationsParamsKey,
  propertyTypeDict,
} from "../DeclarationsTable/utils";
import { createSearchParamsString } from "~/utils/url";
import { type $Enums } from "@prisma/client";

export default function DeclarationsPropertyTypeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { propertyType } = getDeclarationsFiltersFromSearchParams(searchParams);
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    (keyof typeof $Enums.PropertyType)[]
  >(propertyType ?? []);

  const onPropertyTypeChange = (
    event: SelectChangeEvent<(keyof typeof $Enums.PropertyType)[]>,
  ) => {
    const newSelectedPropertyType = event.target
      .value as (keyof typeof $Enums.PropertyType)[];
    setSelectedPropertyType([...newSelectedPropertyType]);
  };

  const onPropertyTypeClose = () => {
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          {
            name: DeclarationsParamsKey.propertyType,
            value: selectedPropertyType,
          },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  return (
    <FormControl className="w-44">
      <InputLabel id="property-type-filter-label">Property type</InputLabel>
      <Select<(keyof typeof $Enums.PropertyType)[]>
        labelId="property-type-filter-label"
        id="property-type-filter"
        value={selectedPropertyType}
        label="Property type"
        onChange={onPropertyTypeChange}
        onClose={onPropertyTypeClose}
        multiple
        className="w-44"
      >
        {Object.entries(propertyTypeDict).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
