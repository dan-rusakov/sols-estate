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
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { createSearchParamsString } from "~/utils/url";
import { type $Enums } from "@prisma/client";
import { type PropertyTypeAny } from "~/utils/entities";
import { propertyTypeDict } from "~/utils/dictionaries";

export default function DeclarationsPropertyTypeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { propertyType } = getDeclarationsFiltersFromSearchParams(searchParams);
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    (keyof typeof $Enums.PropertyType | PropertyTypeAny)[]
  >(propertyType ?? []);

  const onPropertyTypeChange = (
    event: SelectChangeEvent<
      (keyof typeof $Enums.PropertyType | PropertyTypeAny)[]
    >,
  ) => {
    const newSelectedPropertyType = event.target.value as (
      | keyof typeof $Enums.PropertyType
      | PropertyTypeAny
    )[];
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
    <FormControl className="w-44 sm:w-full">
      <InputLabel id="property-type-filter-label">Property type</InputLabel>
      <Select<(keyof typeof $Enums.PropertyType | PropertyTypeAny)[]>
        labelId="property-type-filter-label"
        id="property-type-filter"
        value={selectedPropertyType}
        label="Property type"
        onChange={onPropertyTypeChange}
        onClose={onPropertyTypeClose}
        multiple
      >
        <MenuItem key={"any"} value={"any"}>
          Any
        </MenuItem>
        {Object.entries(propertyTypeDict).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
