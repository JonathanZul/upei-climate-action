"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';
import { HiXMark } from "react-icons/hi2";

const NEWSLETTER_POPUP_KEY = 'newsletterPopupDismissed';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the popup before
    const dismissed = localStorage.getItem(NEWSLETTER_POPUP_KEY);
    if (!dismissed) {
      // Show the popup after a delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5-second delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Remember the user's choice
    localStorage.setItem(NEWSLETTER_POPUP_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-md w-full m-4 p-8 bg-white-text rounded-lg shadow-2xl border-t-8 border-primary">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-tertiary">
          <HiXMark size={24} />
        </button>
        <h3 className="font-poppins text-2xl font-bold text-tertiary">Join our newsletter</h3>
        <p className="mt-2 text-base text-tertiary">Get emails with the latest news about events and initiatives!</p>
        <div className="flex items-center justify-center">
          <Image
            src="/images/h-logo.svg"
            alt="UPEI Climate Action Society Logo"
            width={48}
            height={48}
            className="h-24 w-48"
          />
        </div>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}