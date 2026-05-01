import { HeroSection } from "@/components/wedding/hero-section";
import { RsvpSection } from "@/components/wedding/rsvp-section";
import { LocationSection } from "@/components/wedding/location-section";
import { Footer } from "@/components/wedding/footer";
import { FadeInSection } from "@/components/wedding/fade-in-section";
import { PhotoCarousel } from "@/components/wedding/photo-carousel";

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
        <PhotoCarousel />
      </FadeInSection>
      <Footer />
    </main>
  );
}
