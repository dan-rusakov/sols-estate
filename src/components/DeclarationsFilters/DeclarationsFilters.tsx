import { memo } from "react";
import PriceFilter from "../DeclarationsPriceFilter/DeclarationsPriceFilter";
import DistrictFilter from "../DeclarationsDistrictFilter/DeclarationsDistrictFilter";
import RoomsFilter from "../DeclarationsRoomsFilter/DeclarationsRoomsFilter";
import PropertyTypeFilter from "../DeclarationsPropertyTypeFilter/DeclarationsPropertyTypeFilter";

export default memo(function DeclarationsFilters() {
  return (
    <div className="flex w-full flex-row gap-8">
      <DistrictFilter />
      <PriceFilter />
      <RoomsFilter />
      <PropertyTypeFilter />
    </div>
  );
});
