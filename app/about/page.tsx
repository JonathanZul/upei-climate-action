// app/about/page.tsx
import PageHero from '@/components/ui/PageHero';
import TeamSection from '@/components/about/TeamSection';
import MissionVisionSection from '@/components/about/MissionVisionSection';

export default function AboutPage() {
  return (
    <>
      <PageHero
        preTitle="About Us"
        title="Who We Are."
        imageUrl="/images/about-hero.png"
      />
      <MissionVisionSection />
      <TeamSection />
    </>
  );
}