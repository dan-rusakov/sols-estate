import {
  DataGrid,
  type GridPaginationModel,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { DeclarationsParamsKey } from "./utils";
import ContactLinks from "./ContactLinks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { api } from "~/utils/api";
import { getNameFromDict, propertyTypeDict } from "~/utils/dictionaries";
import { createSearchParamsString } from "~/utils/url";
import {
  TableParamsName,
  TAKE_RECORDS_AMOUNT,
  getTableParamsFromSearchParams,
  cellRangeValue,
  formatDateToDateString,
  formatNumber,
} from "~/utils/table";
import { Box } from "@mui/material";

export default function DeclarationsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location, priceMin, priceMax, roomsMin, roomsMax, propertyType } =
    getDeclarationsFiltersFromSearchParams(searchParams);
  const { page } = getTableParamsFromSearchParams(searchParams);

  const { data: declarationsData, isLoading: isDeclarationsLoading } =
    api.declarations.getAllDeclarations.useQuery({
      location,
      page,
      priceMin,
      priceMax,
      roomsMin,
      roomsMax,
      propertyType,
    });
  const { data: districts, isLoading: isDistrictsLoading } =
    api.locationDict.getAllDistricts.useQuery();
  const [declarationsCount, declarations] = declarationsData?.data ?? [];

  const rows = declarations?.map((declaration) => ({
    id: declaration.id,
    [DeclarationsParamsKey.location]: getNameFromDict(
      declaration.location.district,
      districts?.data,
    ),
    propertyType: propertyTypeDict[declaration.propertyType],
    prices: cellRangeValue(
      declaration.priceMin
        ? formatNumber(declaration.priceMin, "numeric")
        : null,
      declaration.priceMax
        ? formatNumber(declaration.priceMax, "numeric")
        : null,
    ),
    livingDates: cellRangeValue(
      declaration.checkinDate
        ? formatDateToDateString(declaration.checkinDate)
        : null,
      declaration.checkoutDate
        ? formatDateToDateString(declaration.checkoutDate)
        : null,
    ),
    rooms: cellRangeValue(declaration.roomsMin, declaration.roomsMax),
    agentName: `${declaration.agent.firstName} ${declaration.agent.lastName}`,
    contactLinks: (
      <ContactLinks
        telegramLink={declaration.agent.contactInfo?.telegramLink ?? undefined}
        whatsappLink={declaration.agent.contactInfo?.whatsappLink ?? undefined}
        lineLink={declaration.agent.contactInfo?.lineLink ?? undefined}
        viberLink={declaration.agent.contactInfo?.viberLink ?? undefined}
      />
    ),
    commission: `${declaration.commission}%`,
  }));

  const columns = [
    {
      field: DeclarationsParamsKey.location,
      headerName: "Location",
      width: 100,
    },
    { field: "propertyType", headerName: "Property type", width: 120 },
    { field: "prices", headerName: "Price", width: 150 },
    { field: "livingDates", headerName: "Dates of stay", width: 190 },
    { field: "rooms", headerName: "Rooms amount", width: 120 },
    {
      field: "commission",
      headerName: "Commission",
      width: 120,
    },
    { field: "agentName", headerName: "Agent", width: 160 },
    {
      field: "contactLinks",
      headerName: "Contacts",
      width: 190,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, JSX.Element>) => (
        <>{params.value}</>
      ),
    },
  ];

  const tablePageNumber = () => {
    const FIRST_PAGE_INDEX = 0;

    if (rows?.length) {
      return page ?? FIRST_PAGE_INDEX;
    }

    return FIRST_PAGE_INDEX;
  };

  const onPageChange = (model: GridPaginationModel) => {
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          {
            name: TableParamsName.page,
            value: model.page,
          },
        ]),
    );
  };

  return (
    <div className="relative">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          disableColumnMenu
          loading={isDeclarationsLoading || isDistrictsLoading}
          paginationMode="server"
          rowCount={declarationsCount ?? 0}
          onPaginationModelChange={onPageChange}
          pageSizeOptions={[TAKE_RECORDS_AMOUNT]}
          paginationModel={{
            pageSize: TAKE_RECORDS_AMOUNT,
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            page: tablePageNumber(),
          }}
        />
      </Box>
    </div>
  );
}
