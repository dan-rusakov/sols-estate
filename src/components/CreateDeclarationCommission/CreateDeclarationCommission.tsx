import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface CreateDeclarationCommissionProps {
  commission: number | null;
  setCommission: (commission: number) => void;
}

const commissionTypes = [0, 3, 5, 10];

export default function CreateDeclarationCommission(
  props: CreateDeclarationCommissionProps,
) {
  const { commission, setCommission } = props;

  const onCommissionChange = (event: SelectChangeEvent<number>) => {
    const newCommission = event.target.value as number;
    setCommission(newCommission);
  };

  return (
    <div className="mt-6">
      <FormControl className="w-full">
        <InputLabel id="commission-filter-label">Commission</InputLabel>
        <Select<number>
          labelId="commission-filter-label"
          id="commission-filter"
          value={commission ?? ""}
          label="commission"
          onChange={onCommissionChange}
          required
        >
          {commissionTypes.map((value) => (
            <MenuItem key={value} value={value}>
              {value}%
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
