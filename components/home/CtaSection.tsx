// components/home/CtaSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-tertiary text-white-text">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-1 flex-col items-start justify-center gap-8 lg:gap-12 px-6 py-16 text-left lg:px-12">
            <p className="font-poppins text-sm font-medium uppercase tracking-wider">
              Want to make a difference?
            </p>
            <h2 className="font-montserrat text-4xl font-medium leading-tight sm:text-5xl">
              Contribute to a sustainable tomorrow
            </h2>
            <p className="font-nunito text-lg">
               Joining our club is the easiest way to connect with
               other students who care about the environment. We 
               organize hands-on events, workshops, and campaigns 
               that make a real, positive impact right here on 
               campus. Everyone is welcome, no experience needed!
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
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}