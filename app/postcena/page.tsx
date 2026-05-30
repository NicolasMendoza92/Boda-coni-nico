import { HeroSection } from "@/components/wedding/hero-section";
import { RsvpSection } from "@/components/wedding/rsvp-section";
import { LocationSection } from "@/components/wedding/location-section";
import { Footer } from "@/components/wedding/footer";
import { FadeInSection } from "@/components/wedding/fade-in-section";
import { PhotoCarousel } from "@/components/wedding/photo-carousel";
import { RegaloSection } from "@/components/wedding/regalo-section";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function WeddingPagePostCena() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <HeroSection />
      <FadeInSection>
        <LocationSection
          showCeremony={false}
          fiestaStartTime="22:00"
          fiestaDisplayTime="22:00 hs"
        />
      </FadeInSection>
      <FadeInSection>
        <RsvpSection tipoInvitado="post-cena" horaDisplay="22:00 hs" />
      </FadeInSection>
      <FadeInSection>
        <RegaloSection />
      </FadeInSection>
      <FadeInSection>
        <PhotoCarousel />
      </FadeInSection>
      <Footer />
    </main>
  );
}