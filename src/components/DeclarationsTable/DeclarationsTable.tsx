import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import { type RouterOutputs } from "~/utils/api";
import {
  cellRangeValue,
  formatDateToDateString,
  formatNumber,
  propertyTypeDict,
} from "./utils";
import ContactLinks from "./ContactLinks";

type Declarations = RouterOutputs["declarations"]["getAllDeclarations"];
interface DeclarationsTableProps {
  declarations?: Declarations;
}

export default function DeclarationsTable({
  declarations,
}: DeclarationsTableProps) {
  if (!declarations) return <div>404</div>;

  const rows = declarations.map((declaration) => ({
    id: declaration.id,
    location: declaration.location.district,
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
    { field: "location", headerName: "Location", flex: 1 },
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

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      pageSizeOptions={[10, 25, 50]}
    />
  );
}
