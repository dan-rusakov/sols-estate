import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { commissionTypeDict, commissionValues } from "~/utils/dictionaries";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

interface CreateCommissionProps {
  commission: number | null;
  setCommission: (commission: number) => void;
}

export default function CreateCommission(props: CreateCommissionProps) {
  const { commission, setCommission } = props;

  const onCommissionChange = (event: SelectChangeEvent<number>) => {
    const newCommission = event.target.value as number;
    setCommission(newCommission);
  };

  return (
    <div className="mt-6 flex items-center">
      <FormControl className="flex-grow">
        <InputLabel id="commission-filter-label">Commission</InputLabel>
        <Select<number>
          labelId="commission-filter-label"
          id="commission-filter"
          value={commission ?? ""}
          label="commission"
          onChange={onCommissionChange}
          required
        >
          {commissionValues.map((value) => (
            <MenuItem key={value} value={value}>
              {commissionTypeDict[value]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InfoTooltip text="Select the amount of commission you will ask from other agent who will take your request" />
    </div>
  );
}
