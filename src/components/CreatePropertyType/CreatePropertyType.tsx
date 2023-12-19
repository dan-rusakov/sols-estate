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
import { api } from "~/utils/api";
import { PropertyTypeAnyValue } from "~/utils/entities";

interface CreateDeclarationPropertyTypeProps {
  propertyType: string[];
  setPropertyType: (propertyType: string[]) => void;
  complex: string[] | null;
  setComplex: (complex: string[]) => void;
}

export default function CreateDeclarationPropertyType(
  props: CreateDeclarationPropertyTypeProps,
) {
  const { propertyType: selectedPropertyType, setPropertyType } = props;

  const { data: propertyType, isLoading: isPropertyTypeLoading } =
    api.property.getAllPropertyType.useQuery();

  const onPropertyTypeChange = (event: SelectChangeEvent<string[]>) => {
    const newPropertyType = event.target.value as string[];
    const lastSelectedValue = newPropertyType[newPropertyType.length - 1];

    if (lastSelectedValue === PropertyTypeAnyValue || !newPropertyType.length) {
      setPropertyType([PropertyTypeAnyValue]);
      return;
    }

    setPropertyType(
      newPropertyType.filter((property) => property !== PropertyTypeAnyValue),
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <FormControl className="w-full">
        <InputLabel id="property-type-filter-label">
          Property type{" "}
          {isPropertyTypeLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string[]>
          labelId="property-type-filter-label"
          id="property-type-filter"
          value={selectedPropertyType}
          onChange={onPropertyTypeChange}
          disabled={isPropertyTypeLoading}
          label="Property type"
          renderValue={(selected) =>
            selected
              .map((slug) => {
                if (slug === "any") {
                  return "Any";
                }

                return propertyType?.data.find(
                  (property) => property.slug === slug,
                )?.name;
              })
              .filter(Boolean)
              .join(", ")
          }
          multiple
        >
          <MenuItem key={PropertyTypeAnyValue} value={PropertyTypeAnyValue}>
            Any
          </MenuItem>
          {propertyType?.data.map(({ name, slug }) => (
            <MenuItem key={slug} value={slug}>
              <Checkbox checked={selectedPropertyType.indexOf(slug) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
