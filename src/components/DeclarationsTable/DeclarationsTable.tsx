import {
  DataGrid,
  type GridPaginationModel,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  cellRangeValue,
  formatDateToDateString,
  formatNumber,
  propertyTypeDict,
} from "./utils";
import ContactLinks from "./ContactLinks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { api } from "~/utils/api";
import { FiltersName } from "../DeclarationsFilters/DeclarationsFilters.types";
import { getNameFromDict } from "~/utils/dictionaries";
import { createSearchParamsString } from "~/utils/url";
import {
  TableParamsName,
  TAKE_RECORDS_AMOUNT,
  getTableParamsFromSearchParams,
} from "~/utils/table";

export default function DeclarationsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { location } = getDeclarationsFiltersFromSearchParams(searchParams);
  const { page } = getTableParamsFromSearchParams(searchParams);
  const { data: declarationsData } =
    api.declarations.getAllDeclarations.useQuery({
      location,
      page,
    });
  const [declarationsCount, declarations] = declarationsData ?? [];
  const { data: districts } = api.locationDict.getAllDistricts.useQuery();

  if (!declarations) return <div>404</div>;

  const rows = declarations.map((declaration) => ({
    id: declaration.id,
    [FiltersName.location]: getNameFromDict(
      declaration.location.district,
      districts,
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
        telegramLink={declaration.agent.contactInfo.telegramLink}
        whatsappLink={declaration.agent.contactInfo.whatsappLink}
        viberLink={declaration.agent.contactInfo.viberLink}
      />
    ),
    commission: `${declaration.commission}%`,
  }));

  const columns = [
    { field: FiltersName.location, headerName: "Location", flex: 1 },
    { field: "propertyType", headerName: "Property type", flex: 1 },
    { field: "prices", headerName: "Price", flex: 1 },
    { field: "livingDates", headerName: "Dates of stay", flex: 1 },
    { field: "rooms", headerName: "Rooms amount", flex: 1 },
    { field: "agentName", headerName: "Agent", flex: 1 },
    {
      field: "contactLinks",
      headerName: "Contacts",
      flex: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, JSX.Element>) => (
        <>{params.value}</>
      ),
    },
    {
      field: "commission",
      headerName: "Commission",
      flex: 1,
    },
  ];

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
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      paginationMode="server"
      rowCount={declarationsCount}
      onPaginationModelChange={onPageChange}
      initialState={{
        pagination: {
          paginationModel: { pageSize: TAKE_RECORDS_AMOUNT, page: 0 },
        },
      }}
      pageSizeOptions={[TAKE_RECORDS_AMOUNT]}
    />
  );
}
