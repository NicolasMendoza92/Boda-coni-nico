"use client";

import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = [
  { src: "https://picsum.photos/seed/coni1/800/1000", alt: "Foto 1" },
  { src: "https://picsum.photos/seed/coni2/800/1000", alt: "Foto 2" },
  { src: "https://picsum.photos/seed/coni3/800/1000", alt: "Foto 3" },
  { src: "https://picsum.photos/seed/coni4/800/1000", alt: "Foto 4" },
  { src: "https://picsum.photos/seed/coni5/800/1000", alt: "Foto 5" },
];

export function PhotoCarousel() {
  // 👇 useState con inicializador perezoso: se llama UNA sola vez al montar
  // Se devuelve directamente la instancia, sin .current ni acceso a ref durante render.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="px-6 py-20" aria-label="Galería de fotos">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center font-serif text-3xl md:text-4xl">
          Nuestra historia en imágenes
        </h2>

        <Carousel
          plugins={[autoplay]}
          opts={{ loop: true, align: "center" }}
          className="w-full"
        >
          <CarouselContent>
            {photos.map((photo, i) => (
              <CarouselItem key={i} className="md:basis-2/3 lg:basis-1/2">
                <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}