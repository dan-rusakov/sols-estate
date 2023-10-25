import { type FormEvent, useState } from "react";
import CreatePropertyType from "../CreatePropertyType/CreatePropertyType";
import { type $Enums } from "@prisma/client";
import CreateLocation from "../CreateLocation/CreateLocation";
import CreatePrice from "../CreatePrice/CreatePrice";
import CreateRooms from "../CreateRooms/CreateRooms";
import CreateCommission from "../CreateCommission/CreateCommission";
import { Alert, Button, CircularProgress } from "@mui/material";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ConnectMessengers from "../ConnectMessengers/ConnectMessengers";

export default function CreateTrackingForm() {
  const [district, setDistricts] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<
    keyof typeof $Enums.PropertyType | null
  >(null);
  const [villaLocation, setVillaLocation] = useState<string | null>(null);
  const [apartmentLocation, setApartmentLocation] = useState<string | null>(
    null,
  );
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [minPriceError, setMinPriceError] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [maxPriceError, setMaxPriceError] = useState(false);
  const [minRooms, setMinRooms] = useState<number | null>(null);
  const [minRoomsError, setMinRoomsError] = useState(false);
  const [maxRooms, setMaxRooms] = useState<number | null>(null);
  const [maxRoomsError, setMaxRoomsError] = useState(false);
  const [commission, setCommission] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createTrackingError, setCreateTrackingError] = useState<string | null>(
    null,
  );

  const router = useRouter();
  const { data: session } = useSession();

  const { mutateAsync: addTracking, isLoading: isCreatingTracking } =
    api.trackings.addTracking.useMutation();
  const { data: agentData } = api.agents.getAgent.useQuery({
    agentId: session?.user.id ?? "",
  });
  const { contactInfo } = agentData?.data ?? {};

  const validateFields = (): boolean => {
    if (
      propertyType === null ||
      commission === null ||
      district === null ||
      city === null ||
      region === null ||
      minPriceError ||
      maxPriceError ||
      minRoomsError ||
      maxRoomsError
    ) {
      setValidationError("Please, check the fields for correct data");
      return false;
    }

    if ((contactInfo?.telegramLink ?? null) === null) {
      setValidationError("Please, connect messenger");
      return false;
    }

    if (propertyType === "VILLA" && villaLocation === null) {
      setValidationError("Please, select villa location");
      return false;
    }

    if (propertyType === "APARTMENT" && apartmentLocation === null) {
      setValidationError("Please, select apartment location");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const createTrackingHandler = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await Promise.all([
        addTracking({
          userId: session?.user.id ?? "",
          district: district!,
          city: city!,
          region: region!,
          propertyType: propertyType!,
          commission: commission!,
          villaLocation,
          apartmentLocation,
          priceMin: minPrice,
          priceMax: maxPrice,
          roomsMin: minRooms,
          roomsMax: maxRooms,
        }),
      ]);
      void router.push("/trackings");
    } catch (err) {
      setCreateTrackingError(String(err));
    }
  };

  const errorNotification = (error: boolean, errorText: string) =>
    error ? <Alert severity="error">{errorText}</Alert> : null;

  return (
    <div className="ml-auto mr-auto flex w-full max-w-[400px] flex-col py-20 sm:py-12">
      <h1 className="mb-10 text-3xl font-bold text-neutral-900 sm:text-2xl">
        Create new tracking
      </h1>
      <form
        className="flex flex-col gap-y-6"
        onSubmit={(evt) => void createTrackingHandler(evt)}
      >
        <CreatePropertyType
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          villaLocation={villaLocation}
          setVillaLocation={setVillaLocation}
          apartmentLocation={apartmentLocation}
          setApartmentLocation={setApartmentLocation}
        />
        <CreateLocation
          district={district}
          setDistrict={setDistricts}
          city={city}
          setCity={setCity}
          region={region}
          setRegion={setRegion}
        />
        <CreatePrice
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          minPriceError={minPriceError}
          setMinPriceError={setMinPriceError}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          maxPriceError={maxPriceError}
          setMaxPriceError={setMaxPriceError}
        />
        <CreateRooms
          minRooms={minRooms}
          setMinRooms={setMinRooms}
          minRoomsError={minRoomsError}
          setMinRoomsError={setMinRoomsError}
          maxRooms={maxRooms}
          setMaxRooms={setMaxRooms}
          maxRoomsError={maxRoomsError}
          setMaxRoomsError={setMaxRoomsError}
        />
        <CreateCommission
          commission={commission}
          setCommission={setCommission}
        />
        <ConnectMessengers />
        <Button
          variant="contained"
          type="submit"
          color="indigo"
          className="w-full bg-indigo-700 normal-case"
          size="large"
          disableElevation
          disabled={isCreatingTracking}
          endIcon={
            isCreatingTracking && <CircularProgress size={16} color="inherit" />
          }
        >
          Save
        </Button>
        {errorNotification(
          !!createTrackingError || !!validationError,
          createTrackingError ?? validationError ?? "",
        )}
      </form>
    </div>
  );
}
