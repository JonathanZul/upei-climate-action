import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex h-[calc(100vh-80px)] min-h-[500px] items-center justify-center mt-[-8vh]">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-white-text/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="font-montserrat text-4xl font-light leading-tight text-tertiary sm:text-5xl md:text-6xl">
          Leading Change, <br />
          <span className="font-bold">Together.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-nunito text-base text-tertiary md:text-lg">
        Passionate about protecting our planet? You’re in the right place. 
        We are a welcoming community for all UPEI students who want to learn 
        about sustainability, connect with others, and take meaningful action 
        right here on campus.
        </p>
        <Link
          href="/about"
          className="mt-8 rounded-full bg-primary px-6 py-3 font-nunito text-lg text-white-text shadow-lg transition-transform duration-200 hover:scale-105"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}