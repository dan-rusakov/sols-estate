import {
  CircularProgress,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { api } from "~/utils/api";
import { PropertyTypeAnyValue } from "~/utils/entities";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

interface CreateDeclarationPropertyTypeProps {
  propertyType: string;
  setPropertyType: (propertyType: string) => void;
  complex: string | null;
  setComplex: (complex: string) => void;
}

export default function CreateDeclarationPropertyType(
  props: CreateDeclarationPropertyTypeProps,
) {
  const {
    propertyType: selectedPropertyType,
    setPropertyType,
    complex: selectedComplex,
    setComplex,
  } = props;

  const { data: complexes, isLoading: isComplexesLoading } =
    api.property.getAllComplexes.useQuery();
  const { data: propertyType, isLoading: isPropertyTypeLoading } =
    api.property.getAllPropertyType.useQuery();

  const onPropertyTypeChange = (event: SelectChangeEvent) => {
    const newPropertyType = event.target.value;

    if (!newPropertyType.length) {
      setPropertyType(PropertyTypeAnyValue);
      return;
    }

    setPropertyType(newPropertyType);
  };

  const onComplexChange = (event: SelectChangeEvent) => {
    const selectedComplexes = event.target.value;

    setComplex(selectedComplexes);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center">
        <FormControl className="w-full">
          <InputLabel id="property-type-filter-label">
            Property type{" "}
            {isPropertyTypeLoading && (
              <div className="ml-3 inline-flex">
                <CircularProgress size={16} />
              </div>
            )}
          </InputLabel>
          <Select<string>
            labelId="property-type-filter-label"
            id="property-type-filter"
            value={selectedPropertyType}
            onChange={onPropertyTypeChange}
            disabled={isPropertyTypeLoading}
            label="Property type"
          >
            <MenuItem key={PropertyTypeAnyValue} value={PropertyTypeAnyValue}>
              Any
            </MenuItem>
            {propertyType?.data.map(({ name, slug }) => (
              <MenuItem key={slug} value={slug}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InfoTooltip text="Property type with value `Any` will be equal to requests with the same value `Any`. If you want to track requests with all available property types you should create separate trackings with needed property types" />
      </div>

      <FormControl className="w-full">
        <InputLabel id="complex-filter-label">
          Complex name{" "}
          {isComplexesLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string>
          labelId="complex-filter-label"
          id="complex-filter"
          value={selectedComplex ?? ""}
          label="Complex name"
          onChange={onComplexChange}
          disabled={isComplexesLoading}
        >
          <ListSubheader>Villas</ListSubheader>
          {complexes?.data.map(({ name, id, type }) => {
            if (type.some(({ type }) => type === "villa")) {
              return (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              );
            }
          })}
          <ListSubheader>Apartments</ListSubheader>
          {complexes?.data.map(({ name, id, type }) => {
            if (type.some(({ type }) => type === "apartment")) {
              return (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
}
