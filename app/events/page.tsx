import PageHero from '@/components/ui/PageHero';
import EventListing from '@/components/events/EventListing';
import {client } from '@/lib/sanity';
import { groq } from 'next-sanity';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description?: string; // Optional field
  imageUrl: string;
  isUpcoming: boolean;
}

async function getEvents(): Promise<Event[]> {
  const query = groq`*[_type == "event"] | order(date desc) {
    _id,
    title,
    "date": date,
    location,
    description,
    "imageUrl": image.asset->url,
    isUpcoming
  }`;
  return client.fetch(query);
}

export default async function EventsPage() {
  // Fetch the data on the server
  const events = await getEvents();

  // Process and sort the data
  const upcomingEvents = events
    .filter((event) => event.isUpcoming)
    .map((event) => {
      const eventDate = new Date(event.date);
      return {
        ...event,
        month: eventDate.toLocaleString('default', { month: 'short' }),
        day: eventDate.getDate().toString(),
        time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    });

  const pastEvents = events
    .filter((event) => !event.isUpcoming)
    .map((event) => {
      const eventDate = new Date(event.date);
      return {
        ...event,
        month: eventDate.toLocaleString('default', { month: 'short' }),
        day: eventDate.getDate().toString(),
        time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    });

  return (
    <>
      <PageHero
        preTitle="Events"
        title="What we are up to."
        imageUrl="/images/events-hero.jpg"
      />
      {/* Pass live data to the components */}
      <EventListing title="Upcoming events" events={upcomingEvents} />
      <EventListing title="Past Events" events={pastEvents} dark_palette={true} />
    </>
  );
}