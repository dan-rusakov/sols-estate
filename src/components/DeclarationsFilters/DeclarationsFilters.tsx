import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import { memo, useState, type ChangeEvent, useEffect } from "react";
import { api } from "~/utils/api";
import { usePathname, useSearchParams } from "next/navigation";
import { createSearchParamsString } from "~/utils/url";
import { getDeclarationsFiltersFromSearchParams } from "./utils";
import { TableParamsName } from "~/utils/table";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";

export default memo(function DeclarationsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location, priceMax, priceMin } =
    getDeclarationsFiltersFromSearchParams(searchParams);
  const { data: districts } = api.locationDict.getAllDistricts.useQuery();

  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    location ?? [],
  );
  const [minPrice, setMinPrice] = useState<number | null>(priceMin);
  const [minPriceError, setMinPriceError] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(priceMax);
  const [maxPriceError, setMaxPriceError] = useState(false);

  useEffect(() => {
    if (minPrice && maxPrice && minPrice > maxPrice) {
      setMinPriceError(true);
      setMaxPriceError(true);
    }
  }, []);

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

  const onMinPriceInputBlur = () => {
    if (minPrice && maxPrice && minPrice > maxPrice) {
      setMinPriceError(true);
      return;
    }

    applyNewPrice();
  };

  const onMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newPrice = evt.target.value ? Number(evt.target.value) : null;
    setMinPrice(newPrice);
  };

  const onMaxPriceInputBlur = () => {
    if (minPrice && maxPrice && minPrice > maxPrice) {
      setMaxPriceError(true);
      return;
    }

    applyNewPrice();
  };

  const onMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newPrice = evt.target.value ? Number(evt.target.value) : null;
    setMaxPrice(newPrice);
  };

  const applyNewPrice = () => {
    setMinPriceError(false);
    setMaxPriceError(false);
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          { name: DeclarationsParamsKey.priceMin, value: minPrice },
          { name: DeclarationsParamsKey.priceMax, value: maxPrice },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  if (!districts?.data) return <div>404</div>;

  return (
    <FormControl fullWidth className="flex flex-row gap-8">
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
      <div className="flex gap-1">
        <TextField
          id="price-min-filter"
          label="Min price"
          type="number"
          className="w-32"
          error={minPriceError}
          value={minPrice ?? ""}
          onChange={onMinPriceChange}
          onBlur={onMinPriceInputBlur}
        />
        <TextField
          id="price-max-filter"
          label="Max price"
          type="number"
          className="w-32"
          error={maxPriceError}
          value={maxPrice ?? ""}
          onChange={onMaxPriceChange}
          onBlur={onMaxPriceInputBlur}
        />
      </div>
    </FormControl>
  );
});
