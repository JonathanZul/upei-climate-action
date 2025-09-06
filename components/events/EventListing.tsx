import EventCard from '../ui/EventCard';

// Define the shape of a single event
type Event = {
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
};

// Define the props our component will accept
type EventListingProps = {
  title: string;
  events: Event[];
  dark_palette?: boolean; // Optional prop to alternate layout
};

export default function EventListing({ title, events, dark_palette }: EventListingProps) {
    if(!dark_palette) {
        return (
            <section className="bg-base-bg py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <h2 className="text-center font-montserrat text-4xl font-medium text-tertiary sm:text-5xl">
                {title}
                </h2>
                <div className="mt-12 flex flex-col gap-12">
                {events.map((event) => (
                    <EventCard key={event.title} {...event} />
                ))}
                </div>
            </div>
            </section>
        );
    }

    else {
        return (
            <section className="bg-tertiary py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <h2 className="text-center font-montserrat text-4xl font-medium text-white-text sm:text-5xl">
                {title}
                </h2>
                <div className="mt-12 flex flex-col gap-12">
                {events.map((event) => (
                    <EventCard key={event.title} {...event} white_text={true} />
                ))}
                </div>
            </div>
            </section>
        );
    }

}