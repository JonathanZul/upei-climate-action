// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaDiscord } from 'react-icons/fa'; // Using Font Awesome for brands
import NewsletterForm from '../ui/NewsletterForm';

export default function Footer() {
  return (
    <footer className="mt-auto border-t-[15px] border-primary bg-white-text">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Column 1: Logo */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/h-logo.svg"
                alt="UPEI Climate Action Society Logo"
                width={24}
                height={24}
                className="h-20 w-48"
              />
            </Link>
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
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center space-x-3">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/upei.climate/" className="text-tertiary group flex space-x-3 items-center" aria-label="Instagram">
                    <FaInstagram size={24} className="group-hover:text-primary" />
                    <span className="bg-tertiary group-hover:bg-primary text-white-text text-xs w-16 text-center py-1 rounded-2xl">Follow</span>
                  </a>
                </div>
                <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/mCNdKGcBBb" className="text-tertiary group flex space-x-3 items-center" aria-label="Discord">
                  <FaDiscord size={24} className="group-hover:text-primary" />
                  <span className="bg-tertiary group-hover:bg-primary text-white-text text-xs w-16 text-center py-1 rounded-2xl">Join</span>
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
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}