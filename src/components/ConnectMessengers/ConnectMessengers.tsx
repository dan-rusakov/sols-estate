import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { type ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";

export default function ConnectMessengers() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [otpCode, setOtpCode] = useState<string | null>(null);

  const ctx = api.useContext();
  const { data: session } = useSession();
  const {
    mutate: verifyToken,
    isLoading: isLoadingVerificationToken,
    error: verifyTokenError,
  } = api.notification.verifyToken.useMutation({
    onSuccess() {
      handleNext();
    },
  });
  const { data: agent, isLoading: isAgentLoading } =
    api.agents.getAgent.useQuery({
      agentId: session?.user.id ?? "",
    });
  const { telegramId } = agent?.data?.notificationInfo ?? {};

  const steps = [
    {
      label: "Start a chat with Sols Estate",
      description: `Open telegram via link below and start a chat with Sols Estate`,
    },
    {
      label: "Confirm messenger account",
      description:
        "Copy the verification code Sols Estate sent you in telegram and paste it in the field below",
    },
    {
      label: "Messenger is connected",
      description: "",
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const openDialogHandler = () => {
    if (!telegramId) {
      setIsOpened(true);
    }
  };

  const closeDialog = () => {
    setIsOpened(false);
  };

  const startChatHandler = () => {
    handleNext();
  };

  const changeOTPCodeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setOtpCode(evt.target.value);
  };

  const confirmOTPCodeHandler = () => {
    if (!otpCode) {
      return;
    }

    verifyToken({
      token: otpCode,
      userId: session?.user.id ?? "",
    });
  };

  const finishConnectionHanler = () => {
    setIsOpened(false);
    void ctx.agents.getAgent.invalidate();
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
    <div className="mb-6 mt-6">
      <Button
        variant="outlined"
        color="indigo"
        className="mb-8 w-full normal-case"
        size="large"
        disableElevation
        onClick={openDialogHandler}
        disabled={isAgentLoading}
        endIcon={
          isAgentLoading && <CircularProgress size={16} color="inherit" />
        }
      >
        {telegramId ? "Messenger is connected" : "Connect messenger"}
      </Button>
      <Dialog open={isOpened} onClose={closeDialog}>
        <DialogTitle>Connect messenger</DialogTitle>
        <DialogContent className="flex w-[580px] max-w-full flex-col items-start gap-y-4">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <div className="mt-3">
                    {index === 0 && (
                      <Button
                        variant="contained"
                        color="indigo"
                        className="bg-indigo-700 normal-case"
                        onClick={startChatHandler}
                        href={env.NEXT_PUBLIC_TELEGRAM_BOT_URL}
                        target="_blank"
                      >
                        Start a chat
                      </Button>
                    )}
                    {index === 1 && (
                      <div className="max-w-[220px]">
                        <TextField
                          id="otp"
                          label="Verification code"
                          type="text"
                          className="mb-2 w-full"
                          value={otpCode ?? ""}
                          onChange={changeOTPCodeHandler}
                          disabled={isLoadingVerificationToken}
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outlined"
                            color="indigo"
                            className="w-full normal-case"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="indigo"
                            className="w-full bg-indigo-700 normal-case"
                            onClick={confirmOTPCodeHandler}
                            disabled={isLoadingVerificationToken}
                            endIcon={
                              isLoadingVerificationToken && (
                                <CircularProgress size={16} color="inherit" />
                              )
                            }
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <Button
                        variant="contained"
                        color="indigo"
                        className="bg-indigo-700 normal-case"
                        onClick={finishConnectionHanler}
                      >
                        Finish
                      </Button>
                    )}
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>
      {errorNotification(!!verifyTokenError, verifyTokenError?.message ?? "")}
    </div>
  );
}
