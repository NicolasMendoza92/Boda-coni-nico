import { HeroSection } from "@/components/wedding/hero-section";
import { RsvpSection } from "@/components/wedding/rsvp-section";
import { LocationSection } from "@/components/wedding/location-section";
import { Footer } from "@/components/wedding/footer";
import { FadeInSection } from "@/components/wedding/fade-in-section";
import { PhotoCarousel } from "@/components/wedding/photo-carousel";
import { RegaloSection } from "@/components/wedding/regalo-section";
import { CancionesSection } from "@/components/wedding/canciones-section";

export default function WeddingPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <HeroSection />
      <FadeInSection>
        <LocationSection />
      </FadeInSection>
      <FadeInSection>
        <RsvpSection tipoInvitado="completo" horaDisplay="16:00 hs" />
      </FadeInSection>
      <FadeInSection>
        <RegaloSection />
      </FadeInSection>
      <FadeInSection>
        <CancionesSection />
      </FadeInSection>
      <FadeInSection>
        <PhotoCarousel />
      </FadeInSection>
      <Footer />
    </main>
  );
}
