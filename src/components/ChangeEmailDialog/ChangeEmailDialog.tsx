import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { signOut } from "next-auth/react";

interface ChangeEmailDialogProps {
  isFormLoading: boolean;
}

export default function ChangeEmailDialog(props: ChangeEmailDialogProps) {
  const { isFormLoading } = props;

  const {
    isLoading: isUpdatingEmail,
    error: updateEmailError,
    mutate,
  } = api.user.changeUserEmail.useMutation({
    onSuccess: async () => {
      try {
        setIsSigningOut(true);
        await signOut({
          callbackUrl: "/auth/signin",
        });
      } catch (err) {
        setSignOutError(String(err));
      } finally {
        setIsSigningOut(false);
      }
    },
  });
  const { data: session } = useSession();

  const [isOpened, setIsOpened] = useState(false);
  const [email, setEmail] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string>();

  const openDialog = () => {
    setIsOpened(true);
  };

  const closeDialog = () => {
    setIsOpened(false);
  };

  const changeEmail = () => {
    mutate({
      userId: session?.user.id ?? "",
      email,
    });
  };

  const errorNotification = (error: boolean, errorText: string) =>
    error ? (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
      >
        <Alert severity="error">{errorText}</Alert>
      </Snackbar>
    ) : null;

  return (
    <>
      <Button
        variant="outlined"
        color="indigo"
        className="mb-8 w-full normal-case "
        size="large"
        disableElevation
        disabled={isFormLoading}
        onClick={openDialog}
      >
        Change email
      </Button>
      <Dialog open={isOpened} onClose={closeDialog}>
        <form onSubmit={changeEmail}>
          <DialogTitle>Change your email</DialogTitle>
          <DialogContent className="flex flex-col items-start gap-y-4">
            <DialogContentText>
              To change this email, please enter your new address here. We will
              send confirmation email to you.
            </DialogContentText>
            <TextField
              autoFocus
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              variant="outlined"
              className="mt-4 w-80"
              disabled={isUpdatingEmail ?? isSigningOut}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="indigo"
              className="normal-case "
              disableElevation
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="indigo"
              className="ml-2 bg-indigo-700 normal-case"
              disableElevation
              disabled={isUpdatingEmail ?? isSigningOut}
              endIcon={
                (isUpdatingEmail ?? isSigningOut) && (
                  <CircularProgress size={16} color="inherit" />
                )
              }
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {errorNotification(
        !!updateEmailError || !!signOutError,
        updateEmailError?.message ?? signOutError ?? "",
      )}
    </>
  );
}
