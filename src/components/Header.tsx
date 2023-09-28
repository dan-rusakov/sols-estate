import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between py-4">
      <p className="text-[28px] font-semibold">Sols estate</p>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link className="text-base font-medium text-neutral-500" href="/">
              Main page
            </Link>
          </li>
          <li>
            <Link
              className="text-base font-medium text-neutral-500"
              href="/declarations"
            >
              Requests
            </Link>
          </li>
          <li>
            <Link
              className="text-base font-medium text-neutral-500"
              href="/agents"
            >
              Agents
            </Link>
          </li>
        </ul>
      </nav>
      {!session && (
        <button
          className="rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white"
          type="button"
          onClick={() => void signIn()}
        >
          Log in
        </button>
      )}
      {!!session && (
        <Link
          className="rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white"
          href="/profile"
        >
          Profile
        </Link>
      )}
    </header>
  );
}
