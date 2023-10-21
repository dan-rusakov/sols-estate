import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const openMenuHandler = () => {
    setIsMenuOpened((prev) => !prev);
  };

  return (
    <header className="relative flex items-center justify-between py-4 lg:justify-start">
      <p className="text-[28px] font-semibold xl:text-2xl lg:mr-auto sm:text-xl">
        Sols estate
      </p>
      <nav className="lg:hidden">
        <ul className="flex gap-5">
          <li>
            <Link className="text-base font-medium text-neutral-500" href="/">
              Main page
            </Link>
          </li>
          <li>
            <Link
              className="text-base font-medium text-neutral-500"
              href="/trackings"
            >
              Trackings
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
          className="rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white sm:hidden"
          type="button"
          onClick={() => void signIn()}
        >
          Log in
        </button>
      )}
      {!!session && (
        <div>
          <Link
            className="mr-4 rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white sm:hidden"
            href="/declarations/create"
          >
            New request
          </Link>
          <Link
            className="rounded-md border border-neutral-900 px-4 py-2 text-center text-base font-medium text-neutral-900 sm:hidden"
            href="/profile"
          >
            Profile
          </Link>
        </div>
      )}
      <button
        type="button"
        onClick={openMenuHandler}
        className="ml-8 hidden flex-col items-center justify-center lg:flex"
      >
        <span
          className={`block h-[1px] w-6 rounded-sm bg-neutral-900 
                    transition-all duration-150 ease-out ${
                      isMenuOpened ? "translate-y-[6.5px] rotate-45" : ""
                    }`}
        ></span>
        <span
          className={`my-[6px] block h-[1px] w-6 rounded-sm 
                    bg-neutral-900 transition-all duration-150 ease-out ${
                      isMenuOpened ? "opacity-0" : "opacity-100"
                    }`}
        ></span>
        <span
          className={`block h-[1px] w-6 rounded-sm bg-neutral-900 
                    transition-all duration-150 ease-out ${
                      isMenuOpened ? "-translate-y-[6.5px] -rotate-45" : ""
                    }`}
        ></span>
      </button>
      {isMenuOpened && (
        <div className="absolute bottom-0 left-0 z-10 hidden w-full translate-y-full bg-white pb-12 pt-6 lg:block">
          <ul className="flex flex-col gap-5">
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
            {!session && (
              <li className="hidden sm:block">
                <button
                  className="inline-block rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white"
                  type="button"
                  onClick={() => void signIn()}
                >
                  Log in
                </button>
              </li>
            )}
            {!!session && (
              <>
                <li className="hidden sm:block">
                  <Link
                    className="text-base font-medium text-neutral-500"
                    href="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="hidden sm:block">
                  <Link
                    className="mr-4 inline-block rounded-md bg-neutral-900 px-4 py-2 text-center text-base font-medium text-white"
                    href="/declarations/create"
                  >
                    New request
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
