import { Link } from "@mui/material";

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
  lineLink,
}: ContactLinksProps) {
  return (
    <div className="flex gap-2">
      {!!telegramLink && <Link href={telegramLink}>TG</Link>}
      {!!whatsappLink && <Link href={whatsappLink}>WhatsApp</Link>}
      {!!lineLink && <Link href={lineLink}>Line</Link>}
      {!!viberLink && <Link href={viberLink}>Viber</Link>}
    </div>
  );
}
