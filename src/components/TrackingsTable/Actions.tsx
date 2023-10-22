import { CircularProgress, Link } from "@mui/material";
import { api } from "~/utils/api";

interface ActionsProps {
  trackingId: string;
}

export default function Actions(props: ActionsProps) {
  const { trackingId } = props;
  const ctx = api.useContext();

  const { mutate: deleteTracking, isLoading: isDeletingTracking } =
    api.trackings.removeTracking.useMutation({
      onSuccess() {
        void ctx.trackings.getAllTrackings.invalidate();
      },
    });

  const deleteTrackingHandler = () => {
    deleteTracking({
      trackingId,
    });
  };

  return (
    <Link component="button" variant="body2" onClick={deleteTrackingHandler}>
      Delete {isDeletingTracking && <CircularProgress size={10} />}
    </Link>
  );
}
