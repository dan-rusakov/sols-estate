import { memo } from "react";
import PriceFilter from "../DeclarationsPriceFilter/DeclarationsPriceFilter";
import DistrictFilter from "../DeclarationsDistrictFilter/DeclarationsDistrictFilter";
import RoomsFilter from "../DeclarationsRoomsFilter/DeclarationsRoomsFilter";
import PropertyTypeFilter from "../DeclarationsPropertyTypeFilter/DeclarationsPropertyTypeFilter";

export default memo(function DeclarationsFilters() {
  return (
    <div className="flex w-full flex-row flex-wrap gap-x-8 gap-y-5">
      <DistrictFilter />
      <PriceFilter />
      <RoomsFilter />
      <PropertyTypeFilter />
    </div>
  );
});
