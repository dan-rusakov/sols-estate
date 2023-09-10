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
import { useChangingPage } from "~/hooks/useChangingPage";

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

  const tableUpdating = useChangingPage();

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
    <div className="relative">
      {tableUpdating && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-70">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-indigo-700 text-gray-200 dark:text-neutral-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
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
    </div>
  );
}
