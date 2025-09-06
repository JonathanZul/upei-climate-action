"use client";

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { HiBars3, HiXMark } from 'react-icons/hi2'; // Using Heroicons 2

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full">
      <nav
        className={`relative mx-4 ${
          isMenuOpen ? 'rounded-t-lg' : 'rounded-lg'
        } bg-white/70 shadow-md backdrop-blur-sm lg:mx-auto lg:max-w-6xl`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/h-logo.svg"
              alt="UPEI Climate Action Society Logo"
              width={24}
              height={24}
              className="h-10 w-24"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 lg:flex">
            <ul className="flex items-center space-x-8 font-poppins text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-tertiary hover:text-primary"
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
          {/* Burger Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center rounded-md p-2 text-tertiary hover:bg-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          id="mobile-menu"
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute top-full left-0 z-20 w-full rounded-b-lg bg-white/98 backdrop-blur-sm shadow-lg lg:hidden`}
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? "bg-primary text-white-text" : "text-tertiary hover:bg-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-gray-200/80 px-2 pt-3 pb-4">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-md bg-primary px-4 py-2 text-center font-poppins text-sm text-white-text"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}