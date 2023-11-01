import { IconButton, Tooltip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip(props: InfoTooltipProps) {
  const { text } = props;

  return (
    <Tooltip title={<p className="text-base">{text}</p>}>
      <IconButton aria-label="Adding location info">
        <ErrorOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
