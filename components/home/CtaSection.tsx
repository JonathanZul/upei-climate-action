// components/home/CtaSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-tertiary text-white-text">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-16 text-left lg:px-12">
            <p className="font-poppins text-sm font-medium uppercase tracking-wider">
              Want to make a difference?
            </p>
            <h2 className="font-montserrat text-4xl font-medium leading-tight sm:text-5xl">
              Contribute to a sustainable tomorrow
            </h2>
            <p className="font-nunito text-lg">
              Lorem ipsum dolor sit amet consectetur. Viverra molestie mauris
              feugiat risus in sit tincidunt mi. Mauris integer mauris arcu
              faucibus interdum vivamus.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105"
            >
              Join Us!
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1">
            <Image
              src="/images/contribute.jpg"
              alt="Club members participating in an event"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}