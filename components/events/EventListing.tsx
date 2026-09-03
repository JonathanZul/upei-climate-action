import EventCard from '../ui/EventCard';
import { type FormattedEvent } from '@/app/events/shared';

type EventListingProps = {
    title: string;
    events: FormattedEvent[]; // It receives an array of FormattedEvent
    dark_palette?: boolean;
  };

export default function EventListing({ title, events, dark_palette }: EventListingProps) {
    const renderEvents = () => (
      <div className="mt-12 flex flex-col gap-12">
        {events.map((event) => (
          <EventCard
            key={event._id}
            {...event}
            event={event}
            white_text={dark_palette}
          />
        ))}
      </div>
    );

    if (dark_palette) {
      return (
        <section className="bg-tertiary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center font-montserrat text-4xl font-medium text-white-text sm:text-5xl">
              {title}
            </h2>
            {renderEvents()}
          </div>
        </section>
      );
    }

    return (
      <section className="bg-base-bg py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-montserrat text-4xl font-medium text-tertiary sm:text-5xl">
            {title}
          </h2>
          {renderEvents()}
        </div>
      </section>
    );
  }