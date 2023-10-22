import { CircularProgress } from "@mui/material";
import { memo } from "react";

interface InputLabelWithLoadingProps {
  label: string;
  isLoading: boolean;
}

export default memo(function InputLabelWithLoading(
  props: InputLabelWithLoadingProps,
) {
  const { label, isLoading } = props;

  return (
    <div className="flex items-center">
      {label}{" "}
      {isLoading && (
        <div className="ml-3 inline-flex">
          <CircularProgress size={16} />
        </div>
      )}
    </div>
  );
});
