import { HeroSection } from "@/components/wedding/hero-section";
import { RsvpSection } from "@/components/wedding/rsvp-section";
import { LocationSection } from "@/components/wedding/location-section";
import { Footer } from "@/components/wedding/footer";
import { FadeInSection } from "@/components/wedding/fade-in-section";
import { PhotoCarousel } from "@/components/wedding/photo-carousel";
import InfoSection from "@/components/wedding/info-section";
import { RegaloSection } from "@/components/wedding/regalo-section";


export default function WeddingPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <HeroSection />
      <FadeInSection>
        <LocationSection />
      </FadeInSection>
      <FadeInSection>
        <RsvpSection />
      </FadeInSection>
       <FadeInSection>
        <RegaloSection />
      </FadeInSection>
      <FadeInSection>
        <PhotoCarousel />
      </FadeInSection>
       <FadeInSection>
        <InfoSection />
      </FadeInSection>
      <Footer />
    </main>
  );
}
