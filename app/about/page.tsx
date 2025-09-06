// app/about/page.tsx
import PageHero from '@/components/ui/PageHero';

export default function AboutPage() {
  return (
    <>
      <PageHero
        preTitle="About Us"
        title="Who We Are."
        imageUrl="/images/about-hero.png"
      />
    </>
  );
}