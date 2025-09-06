import EventCard from '../ui/EventCard';

const events = [
  {
    month: 'Sep',
    day: '24',
    title: 'Annual General Meeting',
    description:
      'Join us for our AGM to discuss the past year and elect our new executive team. Refreshments will be provided.',
    location: 'McDougall Hall 242',
    time: '14:30',
    imageUrl: '/images/placeholder.svg',
  },
  {
    month: 'Oct',
    day: '12',
    title: 'Campus Cleanup Initiative',
    description:
      'Help us make UPEI a greener place. We will be meeting at the student center to clean up the campus grounds.',
    location: 'W.A. Murphy Student Centre',
    time: '10:00',
    imageUrl: '/images/placeholder.svg',
  },
  {
    month: 'Oct',
    day: '28',
    title: 'Guest Speaker: Dr. Jane Foster on Climate Policy',
    description:
      'Learn about the latest in climate policy from a leading expert in the field. Q&A session to follow.',
    location: 'Online via Zoom',
    time: '18:00',
    imageUrl: '/images/placeholder.svg',
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-base-bg py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-montserrat text-4xl font-medium text-tertiary sm:text-5xl">
          Upcoming events
        </h2>
        <div className="mt-12 flex flex-col gap-12">
          {events.map((event) => (
            <EventCard key={`${event.month}-${event.day}-${event.title}`} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}