import Hero from '@/components/home/Hero';
import WhatsNew from '@/components/home/WhatsNew';
import CtaSection from '@/components/home/CtaSection';
import UpcomingEvents from '@/components/home/UpcomingEvents';

export default function Home() {
  return (
    <>
      <Hero />   
      <WhatsNew />
      <CtaSection />
      <UpcomingEvents />
    </>
  );
}