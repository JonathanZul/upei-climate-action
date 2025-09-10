import EventCard from '../ui/EventCard';

// Define the shape of data this component expects
type ProcessedEvent = {
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
  isUpcoming: boolean;
};

// Define the props for the UpcomingEvents component
type UpcomingEventsProps = {
  events: ProcessedEvent[];
};

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="bg-base-bg py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-montserrat text-4xl font-medium text-tertiary sm:text-5xl">
          Upcoming events
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