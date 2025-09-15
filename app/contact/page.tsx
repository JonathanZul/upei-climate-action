import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-bg py-16 sm:py-24">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-tertiary/70" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-4 text-center text-white-text">
        <p className="font-poppins text-sm font-medium uppercase tracking-widest">
          Contact Us
        </p>
        <h1 className="mt-2 font-montserrat text-5xl font-bold sm:text-6xl">
          We&apos;d love to hear from you!
        </h1>

        {/* Render the Client Component */}
        <ContactForm />
      </div>
    </div>
  );
}