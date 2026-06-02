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
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto5.JPG", alt: "Foto 1" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto2.JPG", alt: "Foto 2" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto8.JPG", alt: "Foto 3" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto6.JPG", alt: "Foto 4" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/Foto9.JPG", alt: "Foto 5" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/Foto10.JPG", alt: "Foto 6" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto4.JPG", alt: "Foto 7" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/Foto11.JPG", alt: "Foto 8" },
  { src: "https://my-blog-bucket-nm.s3.eu-north-1.amazonaws.com/foto7.JPG", alt: "Foto 9" },
];

export function PhotoCarousel() {
  // 👇 useState con inicializador perezoso: se llama UNA sola vez al montar
  // Se devuelve directamente la instancia, sin .current ni acceso a ref durante render.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="px-6 py-20" aria-label="Galería de fotos">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center font-serif text-3xl md:text-4xl">
          Un poco de nosotros...
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

        {/* <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
          Desliza para ver más →
        </p> */}
      </div>
    </section>
  );
}