// app/subscribe/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/ui/NewsletterForm'; // We are reusing our existing component

export default function SubscribePage() {
  return (
    <div className="w-full max-w-md lg:max-w-lg">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <Link href="/">
          <Image
            src="/images/h-logo.svg" // Assuming your logo is here
            alt="UPEI Climate Action Association Logo"
            width={192} // Larger size for a landing page
            height={64}
            className="h-16 w-auto"
          />
        </Link>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl bg-white-text p-8 shadow-2xl border-t-8 border-primary">
        <div className="text-center">
          <h1 className="font-poppins text-2xl font-bold text-tertiary">
            Join our newsletter
          </h1>
          <p className="mt-2 text-base text-tertiary">
            Get emails with the latest news about events and initiatives!
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-tertiary/80 hover:text-primary hover:underline">
          ← Back to the main site
        </Link>
      </div>
    </div>
  );
}