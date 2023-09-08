import Link from "next/link";

export default function Header() {
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
            <a className="text-base font-medium text-neutral-500" href="#!">
              Agents
            </a>
          </li>
        </ul>
      </nav>
      <a
        className="rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white"
        href="#!"
      >
        Log in
      </a>
    </header>
  );
}
