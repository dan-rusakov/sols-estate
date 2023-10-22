import { type FormEvent, useState } from "react";
import CreateLocation from "../CreateLocation/CreateLocation";
import { type $Enums } from "@prisma/client";
import CreatePrice from "../CreatePrice/CreatePrice";
import CreateDeclarationDates from "../CreateDeclarationDates/CreateDeclarationDates";
import CreateRooms from "../CreateRooms/CreateRooms";
import CreateCommission from "../CreateCommission/CreateCommission";
import { Alert, Button, CircularProgress } from "@mui/material";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CreatePropertyType from "../CreatePropertyType/CreatePropertyType";

export default function CreateDeclarationForm() {
  const { data: session } = useSession();

  const {
    isLoading: isCreatingDeclaraion,
    mutate,
    error: createDeclarationError,
  } = api.declarations.addDeclaraion.useMutation({
    onSuccess() {
      setSuccessCreation(true);
      resetAllFields();
    },
  });

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
  const [checkinDate, setCheckinDate] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<string | null>(null);
  const [minRooms, setMinRooms] = useState<number | null>(null);
  const [minRoomsError, setMinRoomsError] = useState(false);
  const [maxRooms, setMaxRooms] = useState<number | null>(null);
  const [maxRoomsError, setMaxRoomsError] = useState(false);
  const [commission, setCommission] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successCreation, setSuccessCreation] = useState(false);

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
      maxRoomsError ||
      (checkinDate !== null && !dayjs(checkinDate).isValid()) ||
      (checkoutDate !== null && !dayjs(checkoutDate).isValid())
    ) {
      setValidationError("Please, check the fields for correct data");
      return false;
    }

    if (
      checkinDate !== null &&
      checkoutDate !== null &&
      dayjs(checkinDate).valueOf() > dayjs(checkoutDate).valueOf()
    ) {
      setValidationError("Check-in date must be before checkout date");
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

  const createDeclaration = (evt: FormEvent) => {
    evt.preventDefault();

    if (validateFields()) {
      setSuccessCreation(false);
      mutate({
        userId: session?.user.id ?? "",
        propertyType: propertyType!,
        priceMin: minPrice,
        priceMax: maxPrice,
        checkinDate,
        checkoutDate,
        roomsMin: minRooms,
        roomsMax: maxRooms,
        commission: commission!,
        district: district!,
        city: city!,
        region: region!,
        villaLocation,
        apartmentLocation,
      });
    }
  };

  const resetAllFields = () => {
    setDistricts(null);
    setCity(null);
    setRegion(null);
    setPropertyType(null);
    setVillaLocation(null);
    setApartmentLocation(null);
    setMinPrice(null);
    setMinPriceError(false);
    setMaxPrice(null);
    setMaxPriceError(false);
    setCheckinDate(null);
    setCheckoutDate(null);
    setMinRooms(null);
    setMinRoomsError(false);
    setMaxRooms(null);
    setMaxRoomsError(false);
    setCommission(null);
  };

  const errorNotification = (error: boolean, errorText: string) =>
    error ? <Alert severity="error">{errorText}</Alert> : null;

  return (
    <div className="ml-auto mr-auto flex w-full max-w-[400px] flex-col py-20 sm:py-12">
      <h1 className="mb-10 text-3xl font-bold text-neutral-900 sm:text-2xl">
        Create new request
      </h1>
      <form className="flex flex-col gap-y-6" onSubmit={createDeclaration}>
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
        <CreateDeclarationDates
          checkinDate={checkinDate}
          setCheckinDate={setCheckinDate}
          checkoutDate={checkoutDate}
          setCheckoutDate={setCheckoutDate}
        />
        <CreateCommission
          commission={commission}
          setCommission={setCommission}
        />
        <Button
          variant="contained"
          type="submit"
          color="indigo"
          className="w-full bg-indigo-700 normal-case"
          size="large"
          disableElevation
          disabled={isCreatingDeclaraion}
          endIcon={
            (isCreatingDeclaraion && (
              <CircularProgress size={16} color="inherit" />
            )) ||
            (successCreation && <CheckIcon color="inherit" />)
          }
        >
          Save
        </Button>
        {errorNotification(
          !!createDeclarationError || !!validationError,
          createDeclarationError?.message ?? validationError ?? "",
        )}
      </form>
    </div>
  );
}
