// app/contact/page.tsx
import { Instagram } from 'lucide-react';
// Note: We'll use a placeholder for the Discord icon.
// In a real project, you might use a library like `react-icons` for brand icons.
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-bg py-16 sm:py-24 mt-[-8vh]">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-tertiary/70" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-4 pt-8 text-center text-white-text">
        <p className="font-poppins text-sm font-medium uppercase tracking-widest">
          Contact Us
        </p>
        <h1 className="mt-2 font-montserrat text-5xl font-bold sm:text-6xl">
          We'd love to hear from you!
        </h1>

        {/* Contact Card */}
        <div className="mx-auto mt-12 w-full max-w-4xl rounded-2xl bg-white-text/95 p-8 text-left text-tertiary shadow-2xl backdrop-blur-sm sm:p-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left Column: Form */}
            <form className="flex flex-col space-y-8">
              <div>
                <label htmlFor="name" className="font-poppins text-sm">Full Name</label>
                <input type="text" id="name" className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="font-poppins text-sm">E-mail</label>
                <input type="email" id="email" className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="font-poppins text-sm">Message</label>
                <textarea id="message" rows={3} className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none" />
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105"
              >
                Send Message
              </button>
            </form>

            {/* Right Column: Contact Info */}
            <div className="flex flex-col space-y-6 mt-[-4px]">
              <div>
                <h3 className="font-poppins text-2xl font-bold">Contact</h3>
                <a href="mailto:caas@upeisu.ca" className="mt-2 inline-block text-lg text-primary hover:underline">
                  caas@upeisu.ca
                </a>
              </div>
              <div className="space-y-4">
                <a href="#" className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg px-4 py-3 font-poppins text-sm font-semibold text-white-text transition-transform hover:scale-105">
                  <Instagram />
                  <span>Follow Us on Instagram</span>
                </a>
                <a href="#" className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg px-4 py-3 font-poppins text-sm font-semibold text-tertiary transition-transform hover:scale-105">
                  <MessageCircle /> {/* Placeholder for Discord */}
                  <span>Join Our Discord Server</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}