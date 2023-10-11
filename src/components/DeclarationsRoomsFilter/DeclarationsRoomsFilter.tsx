import { TextField } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getDeclarationsFiltersFromSearchParams } from "../DeclarationsFilters/utils";
import { type ChangeEvent, useEffect, useState } from "react";
import { createSearchParamsString } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { TableParamsName } from "~/utils/table";

export default function DeclarationsRoomsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { roomsMin, roomsMax } =
    getDeclarationsFiltersFromSearchParams(searchParams);

  const [minRooms, setMinRooms] = useState<number | null>(roomsMin);
  const [minRoomsError, setMinRoomsError] = useState(false);
  const [maxRooms, setMaxRooms] = useState<number | null>(roomsMax);
  const [maxRoomsError, setMaxRoomsError] = useState(false);

  useEffect(() => {
    if (minRooms && maxRooms && minRooms > maxRooms) {
      setMinRoomsError(true);
      setMaxRoomsError(true);
    }
  }, []);

  const onMinRoomsInputBlur = () => {
    if (minRooms && maxRooms && minRooms > maxRooms) {
      setMinRoomsError(true);
      return;
    }

    applyNewRooms();
  };

  const onMinRoomsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newRooms = evt.target.value ? Number(evt.target.value) : null;
    setMinRooms(newRooms);
  };

  const onMaxRoomsInputBlur = () => {
    if (minRooms && maxRooms && minRooms > maxRooms) {
      setMaxRoomsError(true);
      return;
    }

    applyNewRooms();
  };

  const onMaxRoomsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newRooms = evt.target.value ? Number(evt.target.value) : null;
    setMaxRooms(newRooms);
  };

  const applyNewRooms = () => {
    setMinRoomsError(false);
    setMaxRoomsError(false);
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          { name: DeclarationsParamsKey.roomsMin, value: minRooms },
          { name: DeclarationsParamsKey.roomsMax, value: maxRooms },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  return (
    <div className="flex gap-1 sm:w-full">
      <TextField
        id="rooms-min-filter"
        label="Min rooms"
        type="number"
        className="w-32 sm:w-full"
        error={minRoomsError}
        value={minRooms ?? ""}
        onChange={onMinRoomsChange}
        onBlur={onMinRoomsInputBlur}
      />
      <TextField
        id="rooms-max-filter"
        label="Max rooms"
        type="number"
        className="w-32 sm:w-full"
        error={maxRoomsError}
        value={maxRooms ?? ""}
        onChange={onMaxRoomsChange}
        onBlur={onMaxRoomsInputBlur}
      />
    </div>
  );
}
