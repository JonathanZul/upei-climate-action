"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl">
      <nav className="mx-4 rounded-lg bg-white/70 px-4 py-2.5 shadow-md backdrop-blur-sm sm:px-6">
        <div className="flex flex-wrap items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <ul className="hidden items-center space-x-8 font-poppins text-sm font-medium lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block py-2 pr-4 pl-3 transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-tertiary hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-4 py-2 font-poppins text-sm text-white-text transition-transform duration-200 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}