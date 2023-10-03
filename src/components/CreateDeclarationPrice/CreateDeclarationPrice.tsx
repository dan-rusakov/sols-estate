import { TextField } from "@mui/material";
import { type ChangeEvent } from "react";

interface CreateDeclarationPriceProps {
  minPrice: number | null;
  setMinPrice: (price: number | null) => void;
  minPriceError: boolean;
  setMinPriceError: (error: boolean) => void;
  maxPrice: number | null;
  setMaxPrice: (price: number | null) => void;
  maxPriceError: boolean;
  setMaxPriceError: (error: boolean) => void;
}

export default function CreateDeclarationPrice(
  props: CreateDeclarationPriceProps,
) {
  const {
    minPrice,
    setMinPrice,
    minPriceError,
    setMinPriceError,
    maxPrice,
    setMaxPrice,
    maxPriceError,
    setMaxPriceError,
  } = props;

  const onMinPriceInputBlur = () => {
    if (
      typeof minPrice === "number" &&
      typeof maxPrice === "number" &&
      minPrice > maxPrice
    ) {
      setMinPriceError(true);
      return;
    }

    resetPriceError();
  };

  const onMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newPrice = evt.target.value ? Number(evt.target.value) : null;
    setMinPrice(newPrice);
  };

  const onMaxPriceInputBlur = () => {
    if (
      typeof minPrice === "number" &&
      typeof maxPrice === "number" &&
      minPrice > maxPrice
    ) {
      setMaxPriceError(true);
      return;
    }

    resetPriceError();
  };

  const onMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newPrice = evt.target.value ? Number(evt.target.value) : null;
    setMaxPrice(newPrice);
  };

  const resetPriceError = () => {
    setMinPriceError(false);
    setMaxPriceError(false);
  };

  return (
    <div className="flex w-full gap-x-4">
      <TextField
        id="price-min-filter"
        label="Min price"
        type="number"
        error={minPriceError}
        value={minPrice ?? ""}
        onChange={onMinPriceChange}
        onBlur={onMinPriceInputBlur}
      />
      <TextField
        id="price-max-filter"
        label="Max price"
        type="number"
        error={maxPriceError}
        value={maxPrice ?? ""}
        onChange={onMaxPriceChange}
        onBlur={onMaxPriceInputBlur}
      />
    </div>
  );
}
