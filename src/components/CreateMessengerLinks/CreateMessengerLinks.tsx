import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import InputLabelWithLoading from "../InputLabelWithLoading/InputLabelWithLoading";

interface CreateMessengerLinksProps {
  telegramLink: string | null;
  setTelegramLink: (link: string | null) => void;
}

export default function CreateMessengerLinks(props: CreateMessengerLinksProps) {
  const { telegramLink, setTelegramLink } = props;

  const { data: session } = useSession();
  const { data: agentData, isLoading: isLoadingAgent } =
    api.agents.getAgent.useQuery({
      agentId: session?.user.id ?? "",
    });
  const { contactInfo } = agentData?.data ?? {};

  useEffect(() => {
    setTelegramLink(contactInfo?.telegramLink ?? null);
  }, [contactInfo?.telegramLink]);

  return (
    <div className="mb-6 mt-6">
      <p className="text-md mb-4 font-normal text-neutral-700">
        Messengers links
      </p>
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
        value={telegramLink ?? ""}
        onChange={(evt) => setTelegramLink(evt.target.value)}
        className="w-full"
        disabled={isLoadingAgent}
        required
      />
    </div>
  );
}
