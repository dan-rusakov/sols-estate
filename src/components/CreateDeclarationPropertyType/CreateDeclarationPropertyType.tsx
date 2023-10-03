import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type $Enums } from "@prisma/client";
import { propertyTypeDict } from "~/utils/dictionaries";

interface CreateDeclarationPropertyTypeProps {
  propertyType: keyof typeof $Enums.PropertyType | null;
  setPropertyType: (propertyType: keyof typeof $Enums.PropertyType) => void;
}

export default function CreateDeclarationPropertyType(
  props: CreateDeclarationPropertyTypeProps,
) {
  const { propertyType, setPropertyType } = props;

  const onPropertyTypeChange = (
    event: SelectChangeEvent<keyof typeof $Enums.PropertyType>,
  ) => {
    const newSelectedPropertyType = event.target
      .value as keyof typeof $Enums.PropertyType;
    setPropertyType(newSelectedPropertyType);
  };

  return (
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
  );
}
