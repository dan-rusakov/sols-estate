import Link from "next/link";

export default function TrackingsActions() {
  return (
    <Link
      className="rounded-md border border-neutral-900 px-4 py-2 text-center text-base font-medium text-neutral-900"
      href="/trackings/create"
    >
      New tracking
    </Link>
  );
}
