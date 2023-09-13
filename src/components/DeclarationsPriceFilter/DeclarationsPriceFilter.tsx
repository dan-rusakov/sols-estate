import { TextField } from "@mui/material";
import { useState, type ChangeEvent, useEffect } from "react";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { TableParamsName } from "~/utils/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { createSearchParamsString } from "~/utils/url";

export default function DeclarationsPriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { priceMax, priceMin } =
    getDeclarationsFiltersFromSearchParams(searchParams);

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

  return (
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
  );
}
