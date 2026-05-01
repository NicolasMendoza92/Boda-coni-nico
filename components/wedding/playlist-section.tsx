import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlaylistSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
          <Music className="w-8 h-8 text-secondary" />
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          Nuestra Playlist
        </h2>
        
        <div className="w-16 h-px bg-primary mx-auto mb-10" />
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Elegí tus canciones favoritas para que suenen esa noche. Queremos que la fiesta tenga un poco de cada uno de ustedes.
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
      </div>
    </section>
  )
}
