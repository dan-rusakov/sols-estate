import { FormControl } from "@mui/material";
import { memo } from "react";
import PriceFilter from "../DeclarationsPriceFilter/DeclarationsPriceFilter";
import DistrictFilter from "../DeclarationsDistrictFilter/DeclarationsDistrictFilter";
import RoomsFilter from "../DeclarationsRoomsFilter/DeclarationsRoomsFilter";

export default memo(function DeclarationsFilters() {
  return (
    <FormControl fullWidth className="flex flex-row gap-8">
      <DistrictFilter />
      <PriceFilter />
      <RoomsFilter />
    </FormControl>
  );
});
