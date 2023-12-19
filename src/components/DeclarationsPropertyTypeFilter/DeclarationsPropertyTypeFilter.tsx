import {
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
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
import { api } from "~/utils/api";

export default function DeclarationsPropertyTypeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { propertyType: propertyTypeFromURL } =
    getDeclarationsFiltersFromSearchParams(searchParams);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>(
    propertyTypeFromURL ?? [],
  );

  const { data: propertyTypes, isLoading } =
    api.property.getAllPropertyType.useQuery();

  const onPropertyTypeChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedPropertyType = event.target.value as string[];
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
      <InputLabel id="property-type-filter-label">
        Property type{" "}
        {isLoading && (
          <div className="ml-3 inline-flex">
            <CircularProgress size={16} />
          </div>
        )}
      </InputLabel>
      <Select<string[]>
        labelId="property-type-filter-label"
        id="property-type-filter"
        value={selectedPropertyType}
        label="Property type"
        onChange={onPropertyTypeChange}
        onClose={onPropertyTypeClose}
        multiple
        renderValue={(selected) =>
          selected
            .map((slug) => {
              if (slug === "any") {
                return "Any";
              }

              return propertyTypes?.data.find(
                (property) => property.slug === slug,
              )?.name;
            })
            .filter(Boolean)
            .join(", ")
        }
        disabled={isLoading}
      >
        <MenuItem key={"any"} value={"any"}>
          <Checkbox checked={selectedPropertyType.indexOf("any") > -1} />
          <ListItemText primary={"Any"} />
        </MenuItem>
        {propertyTypes?.data.map(({ name, slug }) => (
          <MenuItem key={slug} value={slug}>
            <Checkbox checked={selectedPropertyType.indexOf(slug) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
