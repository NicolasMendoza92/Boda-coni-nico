
import { Shirt, Music,  } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InfoSection() {

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto grid gap-8 auto-rows-auto">
        {/* Card 1 & 2: las dos que ya tenías */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Código de Vestimenta */}
          <div className="bg-card p-8 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
              <Shirt className="w-7 h-7 text-primary" />
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Dress Code
            </h2>
            <p className="text-xl text-foreground mb-6">Elegante</p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-center justify-center gap-2">
                <span className="text-primary">-</span>
                Ellas: Vestido de fiesta
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-primary">-</span>
                Ellos: Traje formal
              </li>
            </ul>
          </div>

          {/* Nuestra Playlist */}
          {/* <div className="bg-card p-8 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
              <Music className="w-8 h-8 text-secondary" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Nuestra Playlist
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-10" />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Elegí tus canciones favoritas para que suenen esa noche. Queremos
              que la fiesta tenga un poco de cada uno de ustedes.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6"
            >
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music className="w-5 h-5 mr-2" />
                Agregar Canciones
              </a>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}