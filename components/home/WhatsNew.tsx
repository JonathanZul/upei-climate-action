// components/home/WhatsNew.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function WhatsNew() {
  return (
    <section className="bg-base-bg py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-montserrat text-3xl font-medium tracking-wide text-tertiary sm:text-4xl">
          What’s New
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Featured Post */}
          <div className="flex flex-col gap-3">
            <Image
              src="images/placeholder.svg"
              alt="Featured announcement placeholder"
              width={500}
              height={300}
              className="h-auto w-full rounded-md object-cover"
            />
            <p className="font-nunito text-sm font-semibold uppercase tracking-wider text-secondary">
              September 15, 2024
            </p>
            <h3 className="font-poppins text-xl font-bold text-tertiary">
              This would be the title of the announcement or event highlight, try
              to keep titles between 30 and 120 characters.
            </h3>
          </div>

          {/* Right Column: Smaller Posts & Button */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-10">
              {/* Post 1 */}
              <div className="flex flex-col gap-3">
                <p className="font-nunito text-sm font-semibold uppercase tracking-wider text-secondary">
                  September 11, 2024
                </p>
                <h3 className="font-poppins text-xl font-bold text-tertiary">
                  This would be the title of the announcement or event highlight.
                </h3>
              </div>
              {/* Post 2 */}
              <div className="flex flex-col gap-3">
                <p className="font-nunito text-sm font-semibold uppercase tracking-wider text-secondary">
                  September 11, 2024
                </p>
                <h3 className="font-poppins text-xl font-bold text-tertiary">
                  Another highlight, keeping the title concise and engaging.
                </h3>
              </div>
            </div>
            <div className="text-center lg:text-left flex items-center justify-center">
              <Link
                href="/blog"
                className="inline-block rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105"
              >
                See more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}