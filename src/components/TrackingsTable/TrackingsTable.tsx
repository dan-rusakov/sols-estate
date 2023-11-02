import { Box } from "@mui/material";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import {
  TAKE_RECORDS_AMOUNT,
  cellRangeValue,
  formatNumber,
  getCommissionLabel,
} from "~/utils/table";
import Actions from "./Actions";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function TrackingsTable() {
  const { data: session } = useSession();

  const { data: trackingsData, isLoading: isTrackingsLoading } =
    api.trackings.getAllTrackings.useQuery({
      userId: session?.user.id ?? "",
    });
  const [trackingsCount, trackings] = trackingsData?.data ?? [];

  const rows = trackings?.map((tracking) => ({
    id: tracking.id,
    location: tracking.district?.name ?? "—",
    propertyType:
      tracking.propertyType === null ? "Any" : tracking.propertyType.name,
    prices: cellRangeValue(
      tracking.priceMin ? formatNumber(tracking.priceMin, "numeric") : null,
      tracking.priceMax ? formatNumber(tracking.priceMax, "numeric") : null,
    ),

    complex_name: tracking.complex?.name ?? "—",
    commission: tracking.commission
      ? getCommissionLabel(tracking.commission)
      : "—",
    rooms: cellRangeValue(tracking.roomsMin, tracking.roomsMax),
    actions: <Actions trackingId={tracking.id} />,
  }));

  const columns = [
    {
      field: "location",
      headerName: "Location",
      width: 100,
    },
    {
      field: "complex_name",
      headerName: "Complex name",
      width: 190,
    },
    { field: "propertyType", headerName: "Property type", width: 120 },
    { field: "prices", headerName: "Price", width: 150 },
    {
      field: "commission",
      headerName: "Commission",
      width: 120,
    },
    { field: "rooms", headerName: "Rooms amount", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, JSX.Element>) => (
        <>{params.value}</>
      ),
    },
  ];

  return (
    <div className="relative mb-16">
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          disableColumnMenu
          loading={isTrackingsLoading}
          paginationMode="server"
          rowCount={trackingsCount ?? 0}
          pageSizeOptions={[TAKE_RECORDS_AMOUNT]}
          paginationModel={{
            pageSize: TAKE_RECORDS_AMOUNT,
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            page: 0,
          }}
        />
      </Box>
    </div>
  );
}
