import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { type FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import CheckIcon from "@mui/icons-material/Check";
import ChangeEmailDialog from "../ChangeEmailDialog/ChangeEmailDialog";
import InputLabelWithLoading from "../InputLabelWithLoading/InputLabelWithLoading";

export default function ProfileForm() {
  const [whatsappLink, setWhatsappLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [lineLink, setLineLink] = useState("");
  const [viberLink, setViberLink] = useState("");
  const [updateAgentSuccess, setUpdateAgentSuccess] = useState(false);

  const { data: session } = useSession();

  const {
    isLoading: isUpdatingAgent,
    error: updateAgentError,
    mutate,
  } = api.agents.changeAgent.useMutation({
    onSuccess: () => {
      setUpdateAgentSuccess(true);
    },
  });
  const { data: agentData, isLoading: isLoadingAgent } =
    api.agents.getAgent.useQuery({
      agentId: session?.user.id ?? "",
    });
  const { firstName, lastName, user, contactInfo } = agentData?.data ?? {};

  useEffect(() => {
    setWhatsappLink(contactInfo?.whatsappLink ?? "");
    setTelegramLink(contactInfo?.telegramLink ?? "");
    setViberLink(contactInfo?.viberLink ?? "");
    setLineLink(contactInfo?.lineLink ?? "");
  }, [contactInfo]);

  const saveProfileHandler = (evt: FormEvent) => {
    evt.preventDefault();
    mutate({
      agentId: session?.user.id ?? "",
      telegramLink,
      whatsappLink,
      viberLink,
      lineLink,
    });
  };

  return (
    <div className="ml-auto mr-auto flex w-full max-w-[400px] flex-col gap-y-6 py-20 sm:py-12">
      <h1 className="mb-10 text-3xl font-bold text-neutral-900 sm:text-2xl">
        Profile
      </h1>
      <form className="flex flex-col gap-y-6" onSubmit={saveProfileHandler}>
        <TextField
          id="first-name"
          label={
            <InputLabelWithLoading
              label="First name"
              isLoading={isLoadingAgent}
            />
          }
          type="text"
          name="first-name"
          variant="outlined"
          value={firstName ?? ""}
          className="w-full"
          InputProps={{
            readOnly: true,
          }}
          disabled={isLoadingAgent || isUpdatingAgent}
        />
        <TextField
          id="last-name"
          label={
            <InputLabelWithLoading
              label="Last name"
              isLoading={isLoadingAgent}
            />
          }
          type="text"
          name="last-name"
          variant="outlined"
          value={lastName ?? ""}
          className="w-full"
          InputProps={{
            readOnly: true,
          }}
          disabled={isLoadingAgent || isUpdatingAgent}
        />
        <TextField
          id="email"
          label={
            <InputLabelWithLoading label="Email" isLoading={isLoadingAgent} />
          }
          type="email"
          name="email"
          variant="outlined"
          value={user?.email ?? ""}
          className="w-full"
          InputProps={{
            readOnly: true,
          }}
          disabled={isLoadingAgent || isUpdatingAgent}
        />
        <ChangeEmailDialog isFormLoading={isLoadingAgent || isUpdatingAgent} />
        <div className="py-4">
          <p className="text-md mb-1 font-normal text-neutral-700">
            Messengers links
          </p>
          <p className="mb-5 text-sm font-normal text-neutral-500">
            Other agents will use these links to text you about requests
          </p>
          <div className="flex flex-col gap-y-6">
            <TextField
              id="whatsapp-link"
              label={
                <InputLabelWithLoading
                  label="Whats app link"
                  isLoading={isLoadingAgent}
                />
              }
              type="text"
              name="whatsapp-link"
              variant="outlined"
              value={whatsappLink}
              onChange={(evt) => setWhatsappLink(evt.target.value)}
              className="w-full"
              disabled={isLoadingAgent || isUpdatingAgent}
            />
            <TextField
              id="telegram-link"
              label={
                <InputLabelWithLoading
                  label="Telegram link"
                  isLoading={isLoadingAgent}
                />
              }
              type="text"
              name="telegram-link"
              variant="outlined"
              value={telegramLink}
              onChange={(evt) => setTelegramLink(evt.target.value)}
              className="w-full"
              disabled={isLoadingAgent || isUpdatingAgent}
            />
            <TextField
              id="line-link"
              label={
                <InputLabelWithLoading
                  label="Line link"
                  isLoading={isLoadingAgent}
                />
              }
              type="text"
              name="line-link"
              variant="outlined"
              value={lineLink}
              onChange={(evt) => setLineLink(evt.target.value)}
              className="w-full"
              disabled={isLoadingAgent || isUpdatingAgent}
            />
            <TextField
              id="viber-link"
              label={
                <InputLabelWithLoading
                  label="Viber link"
                  isLoading={isLoadingAgent}
                />
              }
              type="text"
              name="viber-link"
              variant="outlined"
              value={viberLink}
              onChange={(evt) => setViberLink(evt.target.value)}
              className="w-full"
              disabled={isLoadingAgent || isUpdatingAgent}
            />
          </div>
        </div>
        <Button
          variant="contained"
          type="submit"
          color="indigo"
          className="w-full bg-indigo-700 normal-case"
          size="large"
          disableElevation
          disabled={isLoadingAgent || isUpdatingAgent}
          endIcon={
            (updateAgentSuccess && <CheckIcon color="inherit" />) ||
            (isUpdatingAgent && <CircularProgress size={16} color="inherit" />)
          }
        >
          Save
        </Button>
        {updateAgentError && (
          <Alert severity="error">{updateAgentError.message}</Alert>
        )}
      </form>
    </div>
  );
}
