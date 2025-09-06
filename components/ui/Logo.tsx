import Link from "next/link";

// A placeholder for the real logo. We will replace this with an SVG later.
export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
        <span className="text-xl font-bold text-white-text">C</span>
      </div>
      <span className="font-montserrat text-lg font-semibold text-tertiary">
        Climate Action
      </span>
    </Link>
  );
}