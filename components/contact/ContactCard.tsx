import { Instagram, Disc } from 'lucide-react'; // Using a placeholder for Discord

export default function ContactCard() {
  return (
    <section className="bg-tertiary py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-xl bg-white-text p-8 shadow-lg md:grid md:grid-cols-2 md:gap-12 md:p-12">
          {/* Form Section */}
          <div className="flex flex-col">
            <h2 className="font-montserrat text-3xl font-medium text-tertiary">
              Send a Message
            </h2>
            <form className="mt-8 flex flex-col gap-8">
              <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Full Name"
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent p-0 pb-2 focus:border-primary focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent p-0 pb-2 focus:border-primary focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows={4}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent p-0 pb-2 focus:border-primary focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105 sm:w-auto sm:px-8"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="mt-12 flex flex-col justify-center md:mt-0">
            <h2 className="font-montserrat text-3xl font-medium text-tertiary">
              Contact
            </h2>
            <p className="mt-4 font-nunito text-base text-tertiary">
              Email:{" "}
              <a href="mailto:caas@upeisu.ca" className="text-primary hover:underline">
                caas@upeisu.ca
              </a>
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg py-3 font-poppins text-base font-medium text-tertiary shadow-md transition-transform duration-200 hover:scale-105"
              >
                <Instagram />
                <span>Follow Us on Instagram</span>
              </a>
              <a
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg py-3 font-poppins text-base font-medium text-tertiary shadow-md transition-transform duration-200 hover:scale-105"
              >
                <Disc /> {/* Placeholder for Discord icon */}
                <span>Join Our Discord Server</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}