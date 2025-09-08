import EventCard from '../ui/EventCard';

// Define the shape of the RAW event data from Sanity
interface RawEvent {
    _id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    imageUrl: string;
    isUpcoming: boolean;
  }

// Define the shape of a single event
type ProcessedEvent = {
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
};

// The component accepts the RAW data from Sanity
type EventListingProps = {
    title: string;
    events: RawEvent[]; // It receives an array of RawEvent
    dark_palette?: boolean;
  };

export default function EventListing({ title, events, dark_palette }: EventListingProps) {
    // --- 1. TRANSFORM THE DATA HERE ---
    const processedEvents: ProcessedEvent[] = events.map((event) => {
    const eventDate = new Date(event.date);
    return {
      ...event,
      description: event.description || '', // Ensure description is not undefined
      month: eventDate.toLocaleString('default', { month: 'short' }),
      day: eventDate.getDate().toString(),
      time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    });

    // --- 2. RENDER USING THE TRANSFORMED DATA ---
    const renderEvents = () => (
        <div className="mt-12 flex flex-col gap-12">
        {processedEvents.map((event) => (
            // Now, the 'event' object has the correct shape for EventCard
            <EventCard key={event.title} {...event} white_text={dark_palette} />
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