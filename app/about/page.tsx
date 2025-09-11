import PageHero from '@/components/ui/PageHero';
import TeamSection from '@/components/about/TeamSection';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';

// Define the shape of the data we're fetching
interface TeamMember {
  _id: string;
  name: string;
  pronouns: string;
  position: string;
  bio: string;
  imageUrl: string;
}

// Create the data fetching function
async function getTeamMembers(): Promise<TeamMember[]> {
  const query = groq`*[_type == "teamMember"] | order(name asc) {
    _id,
    name,
    pronouns,
    position,
    bio,
    "image": image
  }`;
  return client.fetch(query);
}

// Make the page component async and fetch the data
export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <PageHero
        preTitle="About Us"
        title="Who We Are."
        imageUrl="/images/about-hero.png"
      />
      {/* 4. Pass the live data as a prop */}
      <MissionVisionSection />
      <TeamSection members={teamMembers} />
    </>
  );
}