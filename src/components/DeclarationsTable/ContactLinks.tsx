import { Link } from "@mui/material";
import {
  getTelegramDeepLink,
  getViberDeepLink,
  getWhatsappDeepLink,
} from "~/utils/url";

interface ContactLinksProps {
  telegramLink?: string;
  whatsappLink?: string;
  viberLink?: string;
  lineLink?: string;
}

export default function ContactLinks({
  telegramLink,
  whatsappLink,
  viberLink,
}: ContactLinksProps) {
  return (
    <div className="flex gap-2">
      {!!telegramLink && (
        <Link target="_blank" href={getTelegramDeepLink(telegramLink)}>
          TG
        </Link>
      )}
      {!!whatsappLink && (
        <Link target="_blank" href={getWhatsappDeepLink(whatsappLink)}>
          WhatsApp
        </Link>
      )}
      {!!viberLink && (
        <Link target="_blank" href={getViberDeepLink(viberLink)}>
          Viber
        </Link>
      )}
    </div>
  );
}
