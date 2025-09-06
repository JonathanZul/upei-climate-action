import PageHero from '@/components/ui/PageHero';
import EventListing from '@/components/events/EventListing';

const upcomingEvents = [
    {
      month: 'Sep', day: '24', title: 'Annual General Meeting',
      description: 'Join us for our AGM to discuss the past year and elect our new executive team. Refreshments will be provided.',
      location: 'McDougall Hall 242', time: '14:30',
      imageUrl: '/images/placeholder.svg',
    },
    {
        month: 'Sep', day: '24', title: 'Annual General Meeting 2',
        description: 'Join us for our AGM to discuss the past year and elect our new executive team. Refreshments will be provided.',
        location: 'McDougall Hall 242', time: '14:30',
        imageUrl: '/images/placeholder.svg',
    },
    {
    month: 'Sep', day: '24', title: 'Annual General 3',
    description: 'Join us for our AGM to discuss the past year and elect our new executive team. Refreshments will be provided.',
    location: 'McDougall Hall 242', time: '14:30',
    imageUrl: '/images/placeholder.svg',
    },
  ];
  
  const pastEvents = [
    {
      month: 'Apr', day: '22', title: 'Earth Day Campus Cleanup',
      description: 'We collected over 50 bags of litter from around the UPEI campus. Thanks to all volunteers!',
      location: 'UPEI Campus', time: '10:00',
      imageUrl: '/images/placeholder.svg',
    },
    {
      month: 'Mar', day: '15', title: 'Documentary Screening: "Our Planet"',
      description: 'A screening of the popular nature documentary, followed by a discussion on local conservation efforts.',
      location: 'Dalton Hall 117', time: '18:30',
      imageUrl: '/images/placeholder.svg',
    },
    {
      month: 'Feb', day: '10', title: 'Sustainability Workshop',
      description: 'A hands-on workshop teaching practical ways to reduce waste and live more sustainably.',
      location: 'McDougall Hall 101', time: '15:00',
      imageUrl: '/images/placeholder.svg',
    },
  ];

export default function EventsPage() {
  return (
    <>
      <PageHero
        preTitle="Events"
        title="What we are up to."
        imageUrl="/images/events-hero.jpg"
      />
      <EventListing title="Upcoming events" events={upcomingEvents} />
      <EventListing title="Past Events" events={pastEvents} dark_palette={true} />
    </>
  );
}