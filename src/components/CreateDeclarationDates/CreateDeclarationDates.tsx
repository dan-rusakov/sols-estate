import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";

interface CreateDeclarationDatesProps {
  checkinDate: string | null;
  setCheckinDate: (date: string | null) => void;
  checkoutDate: string | null;
  setCheckoutDate: (date: string | null) => void;
}

const ISO_DATE_FORMAT = "YYYY-MM-DDT00:00:00[Z]";

export default function CreateDeclarationDates(
  props: CreateDeclarationDatesProps,
) {
  const { checkinDate, setCheckinDate, checkoutDate, setCheckoutDate } = props;

  const onCheckinDateChange = (value: Dayjs | null) => {
    console.log(value?.format(ISO_DATE_FORMAT) ?? null);
    setCheckinDate(value?.format(ISO_DATE_FORMAT) ?? null);
  };

  const onCheckoutDateChange = (value: Dayjs | null) => {
    setCheckoutDate(value?.format(ISO_DATE_FORMAT) ?? null);
  };

  return (
    <div className="flex w-full gap-x-4">
      <DatePicker
        label="Check-in date"
        views={["day", "month", "year"]}
        format="DD.MM.YYYY"
        disablePast
        maxDate={checkoutDate ? dayjs(checkoutDate) : undefined}
        value={checkinDate ? dayjs(checkinDate) : null}
        onChange={onCheckinDateChange}
      />
      <DatePicker
        label="Checkout date"
        views={["day", "month", "year"]}
        format="DD.MM.YYYY"
        disablePast
        minDate={checkinDate ? dayjs(checkinDate) : undefined}
        value={checkoutDate ? dayjs(checkoutDate) : null}
        onChange={onCheckoutDateChange}
      />
    </div>
  );
}
