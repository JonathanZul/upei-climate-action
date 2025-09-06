// components/layout/Footer.tsx
import Link from "next/link";
import Logo from "../ui/Logo";
import { Instagram, Disc } from "lucide-react"; // Using a placeholder for Discord

export default function Footer() {
  return (
    <footer className="mt-auto border-t-[15px] border-primary bg-white-text">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Column 1: Logo */}
          <div className="col-span-1">
            <Logo />
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-poppins text-lg font-medium text-tertiary">Contact</h3>
            <div className="mt-4 space-y-4">
              <p className="text-sm">
                Email:{" "}
                <a href="mailto:caas@upeisu.ca" className="text-primary hover:underline">
                  caas@upeisu.ca
                </a>
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-tertiary hover:text-primary">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-tertiary hover:text-primary">
                  <Disc size={24} /> {/* Placeholder for Discord Icon */}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Site Links */}
          <div>
            <h3 className="font-poppins text-lg font-medium text-tertiary">Site</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="/" className="text-primary hover:underline">Home</Link>
              <Link href="/about" className="text-primary hover:underline">About us</Link>
              <Link href="/events" className="text-primary hover:underline">Events</Link>
              <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="border-t-8 border-tertiary p-6 text-tertiary border-l-2 border-r-2 border-b-2 md:col-span-2 col-span-1">
            <h3 className="font-poppins text-lg font-medium">Join our newsletter</h3>
            <p className="mt-2 text-sm">
              Get emails with the latest news about events and initiatives!
            </p>
            <form className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="janedoe@upei.ca"
                  className="w-full rounded-md border-tertiary border px-3 py-1.5 text-sm placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-3 py-1.5 text-sm text-white-text transition-transform hover:scale-105"
                >
                  Join
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">No spam, we also hate it.</p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}