import PageHero from '@/components/ui/PageHero';
import EventListing from '@/components/events/EventListing';
import PastEventsList from '@/components/events/PastEventsList';
import { getUpcomingEvents, getPastEvents, getPastEventsCount } from './page.server';
import { Event } from './shared';

const transformEvent = (event: Event) => {
  const eventDate = new Date(event.date);
  return {
    ...event,
    description: event.description || '',
    month: eventDate.toLocaleString('default', { month: 'short' }),
    day: eventDate.getDate().toString(),
    time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'America/Halifax', timeZoneName: 'short' }),
  };
};

export default async function EventsPage() {
  const [upcomingEventsData, initialPastEventsData, pastEventsCount] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(0),
    getPastEventsCount(),
  ]);

  const formattedUpcomingEvents = upcomingEventsData.map(transformEvent);
  const formattedInitialPastEvents = initialPastEventsData.map(transformEvent);

  // Define the server action directly inside the Server Component
  async function fetchMorePastEvents(page: number) {
    "use server";
    const newEvents = await getPastEvents(page);
    return newEvents.map(transformEvent);
  }

  return (
    <>
      <PageHero preTitle="Events" title="What we are up to." imageUrl="/images/events-hero.jpg" />
      <EventListing title="Upcoming events" events={formattedUpcomingEvents} />
      <section className="bg-tertiary py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-montserrat text-4xl font-medium text-white-text sm:text-5xl">
            Past Events
          </h2>
          <div className="mt-12">
            {/* Pass the action down as a prop */}
            <PastEventsList 
              initialItems={formattedInitialPastEvents}
              totalItems={pastEventsCount}
              fetchNextPage={fetchMorePastEvents} 
            />
          </div>
        </div>
      </section>
    </>
  );
}