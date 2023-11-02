import { type FormEvent, useState } from "react";
import CreatePrice from "../CreatePrice/CreatePrice";
import CreateRooms from "../CreateRooms/CreateRooms";
import CreateCommission from "../CreateCommission/CreateCommission";
import { Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ConnectMessengers from "../ConnectMessengers/ConnectMessengers";
import { PropertyTypeAnyValue } from "~/utils/entities";
import CreateLocationSingle from "../CreateLocation/CreateLocationSingle";
import CreatePropertyTypeSingle from "../CreatePropertyType/CreatePropertyTypeSingle";

export default function CreateTrackingForm() {
  const [district, setDistricts] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [propertyType, setPropertyType] =
    useState<string>(PropertyTypeAnyValue);
  const [complex, setComplex] = useState<string | null>(null);
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
    if (minPriceError || maxPriceError || minRoomsError || maxRoomsError) {
      setValidationError("Please, check the fields for correct data");
      return false;
    }

    if (!contactInfo?.telegramLink) {
      setValidationError("Please, connect messenger");
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
          districtSlug: district,
          citySlug: city,
          regionSlug: region,
          propertyTypeSlug: propertyType,
          complexId: complex,
          commission: commission,
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
        <div className="pb-3">
          <Alert severity="info">
            <AlertTitle>What is a traking</AlertTitle>
            <p className="text-base">
              You can create tracking to get notifications if somebody creates a
              request that fits your criteria. Leave certain fields empty if you
              want to track by all values or select specific ones if you want to
              track certain requests.
            </p>
          </Alert>
        </div>
        <CreatePropertyTypeSingle
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          complex={complex}
          setComplex={setComplex}
        />
        <CreateLocationSingle
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
