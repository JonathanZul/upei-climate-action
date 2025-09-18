import Hero from '@/components/home/Hero';
import WhatsNew from '@/components/home/WhatsNew';
import CtaSection from '@/components/home/CtaSection';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { BlogPostCardProps } from '@/components/blog/BlogPostCard';
import { Post } from './blog/shared';
import { Event } from './events/shared';

// Fetch latest 3 blog posts for the WhatsNew section
async function getLatestPosts() {
  const query = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    author,
    publishedAt,
    "image": mainImage,
    excerpt,
    "slug": slug.current,
  }`;
  return client.fetch(query, {}, { next: { tags: ['post'] } });
}

// Fetch the 3 nearest upcoming events for the UpcomingEvents section
async function getUpcomingEvents() {
  const query = groq`*[_type == "event" && isUpcoming == true] | order(date asc)[0...3] {
    _id,
    title,
    "date": date,
    location,
    description,
    "image": image,
    isUpcoming
  }`;
  return client.fetch(query, {}, { next: { tags: ['event'] } });
}

// Helper to format dates
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function Home() {
  // Fetch both posts and events in parallel
  const [posts, events] = await Promise.all([
    getLatestPosts(),
    getUpcomingEvents(),
  ]);

  // Transform posts to match BlogPostCardProps
  const formattedPosts = posts.map((post: Post) => ({
    ...post,
    date: formatDate(post.publishedAt),
    tag: 'Environment', // Hardcoded for now
  }));

  // Transform events to match UpcomingEvents props
  const formattedEvents = events.map((event: Event) => {
    const eventDate = new Date(event.date);
    return {
      ...event,
      description: event.description || '',
      month: eventDate.toLocaleString('default', { month: 'short' }),
      day: eventDate.getDate().toString(),
      time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'America/Halifax', timeZoneName: 'short' }),
    };
  });

  return (
    <>
      <Hero />   
      <WhatsNew posts={formattedPosts as BlogPostCardProps[]} />
      <CtaSection />
      <UpcomingEvents events={formattedEvents}/>
    </>
  );
}