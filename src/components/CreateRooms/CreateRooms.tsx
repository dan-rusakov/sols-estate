import { TextField } from "@mui/material";
import { type ChangeEvent } from "react";

interface CreateRoomsProps {
  minRooms: number | null;
  setMinRooms: (rooms: number | null) => void;
  minRoomsError: boolean;
  setMinRoomsError: (error: boolean) => void;
  maxRooms: number | null;
  setMaxRooms: (rooms: number | null) => void;
  maxRoomsError: boolean;
  setMaxRoomsError: (error: boolean) => void;
}

export default function CreateRooms(props: CreateRoomsProps) {
  const {
    minRooms,
    setMinRooms,
    minRoomsError,
    setMinRoomsError,
    maxRooms,
    setMaxRooms,
    maxRoomsError,
    setMaxRoomsError,
  } = props;

  const onMinRoomsInputBlur = () => {
    if (
      typeof minRooms === "number" &&
      typeof maxRooms === "number" &&
      minRooms > maxRooms
    ) {
      setMinRoomsError(true);
      return;
    }

    resetRoomsError();
  };

  const onMinRoomsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newRooms = evt.target.value ? Number(evt.target.value) : null;
    setMinRooms(newRooms);
  };

  const onMaxRoomsInputBlur = () => {
    if (
      typeof minRooms === "number" &&
      typeof maxRooms === "number" &&
      minRooms > maxRooms
    ) {
      setMaxRoomsError(true);
      return;
    }

    resetRoomsError();
  };

  const onMaxRoomsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newRooms = evt.target.value ? Number(evt.target.value) : null;
    setMaxRooms(newRooms);
  };

  const resetRoomsError = () => {
    setMinRoomsError(false);
    setMaxRoomsError(false);
  };

  return (
    <div className="flex w-full gap-x-4">
      <TextField
        id="rooms-min-filter"
        label="Min rooms"
        type="number"
        error={minRoomsError}
        value={minRooms ?? ""}
        onChange={onMinRoomsChange}
        onBlur={onMinRoomsInputBlur}
      />
      <TextField
        id="rooms-max-filter"
        label="Max rooms"
        type="number"
        error={maxRoomsError}
        value={maxRooms ?? ""}
        onChange={onMaxRoomsChange}
        onBlur={onMaxRoomsInputBlur}
      />
    </div>
  );
}
