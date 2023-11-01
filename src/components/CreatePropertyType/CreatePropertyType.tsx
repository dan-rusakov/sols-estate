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

interface CreateDeclarationPropertyTypeProps {
  propertyType: string[];
  setPropertyType: (propertyType: string[]) => void;
  complex: string[] | null;
  setComplex: (complex: string[]) => void;
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

  const onComplexChange = (event: SelectChangeEvent<string[]>) => {
    const selectedComplexes = event.target.value as string[];

    setComplex(selectedComplexes);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <FormControl className="w-full">
        <InputLabel id="property-type-filter-label">
          Property type{" "}
          {isPropertyTypeLoading && (
            <div className="ml-36 inline-flex">
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
          multiple
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
      <FormControl className="w-full">
        <InputLabel id="complex-filter-label">
          Complex name{" "}
          {isComplexesLoading && (
            <div className="ml-3 inline-flex">
              <CircularProgress size={16} />
            </div>
          )}
        </InputLabel>
        <Select<string[]>
          labelId="complex-filter-label"
          id="complex-filter"
          value={selectedComplex ?? []}
          label="Complex name"
          onChange={onComplexChange}
          multiple
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
