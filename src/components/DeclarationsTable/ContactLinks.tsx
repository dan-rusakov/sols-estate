import { Link } from "@mui/material";

interface ContactLinksProps {
  telegramLink: string;
  whatsappLink: string;
  viberLink: string;
}

export default function ContactLinks({
  telegramLink,
  whatsappLink,
  viberLink,
}: ContactLinksProps) {
  return (
    <div className="flex gap-2">
      <Link href={telegramLink}>TG</Link>
      <Link href={whatsappLink}>WhatsApp</Link>
      <Link href={viberLink}>Viber</Link>
    </div>
  );
}
