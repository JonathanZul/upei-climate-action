// app/about/page.tsx
import PageHero from '@/components/ui/PageHero';
import TeamSection from '@/components/about/TeamSection';

export default function AboutPage() {
  return (
    <>
      <PageHero
        preTitle="About Us"
        title="Who We Are."
        imageUrl="/images/about-hero.png"
      />
      <TeamSection />
    </>
  );
}