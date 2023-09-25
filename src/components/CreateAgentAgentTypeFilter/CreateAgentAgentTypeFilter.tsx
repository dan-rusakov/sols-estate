import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { agentTypeDict } from "../AgentsTable/utils";
import { type AgentType } from "~/utils/dictionaries";
import { $Enums } from "@prisma/client";

interface CreateAgentAgentTypeFilterProps {
  selectedAgentType?: AgentType;
  setSelectedAgentType: (agentType: AgentType) => void;
  agencyName?: string;
  setAgencyName: (agencyName: string) => void;
  selectedAgentTypeError: boolean;
  agencyNameError: boolean;
}

export default function CreateAgentAgentTypeFilter({
  selectedAgentType,
  setSelectedAgentType,
  agencyName,
  setAgencyName,
  selectedAgentTypeError,
  agencyNameError,
}: CreateAgentAgentTypeFilterProps) {
  const agentTypes = Object.entries(agentTypeDict).map(([key, value]) => ({
    name: value,
    slug: key,
  }));

  const onAgentTypeChange = (evt: SelectChangeEvent<AgentType>) => {
    const newAgentType = evt.target.value;

    if (newAgentType in $Enums.AgentType) {
      setSelectedAgentType(newAgentType as AgentType);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <FormControl className="w-full">
        <InputLabel id="agent-filter-label" className="flex items-center">
          Agent type
        </InputLabel>
        <Select<AgentType>
          labelId="agent-filter-label"
          id="agent-filter"
          value={selectedAgentType ?? ""}
          label="Agent type"
          onChange={onAgentTypeChange}
          required
          error={selectedAgentTypeError}
        >
          {agentTypes.map(({ name, slug }) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedAgentType === "AGENCY" && (
        <TextField
          id="agency-name"
          label="Agency name"
          type="text"
          name="agency-name"
          variant="outlined"
          value={agencyName}
          onChange={(evt) => setAgencyName(evt.target.value)}
          className="w-full"
          required
          error={agencyNameError}
        />
      )}
    </div>
  );
}
