import { Heart } from "lucide-react"
import { FloralDecoration } from "./floral-decoration"

export function Footer() {
  return (
    <footer className="relative py-20 px-6 bg-accent/20 overflow-hidden">
      {/* Decorative florals */}
      <FloralDecoration className="absolute bottom-0 left-0 w-32 h-auto opacity-30 -translate-x-1/3 translate-y-1/4" />
      <FloralDecoration className="absolute bottom-0 right-0 w-32 h-auto opacity-30 translate-x-1/3 translate-y-1/4 scale-x-[-1]" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <Heart className="w-8 h-8 text-primary mx-auto mb-6" />

        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4 italic">
          &quot;Gracias por ser parte de nuestra historia&quot;
        </p>

        <p className="text-muted-foreground mb-8">
          Con todo nuestro amor,
        </p>

        <p className="font-serif text-xl text-foreground">
          Coni & Nico
        </p>

        <div className="w-16 h-px bg-primary mx-auto my-8" />

        <p className="text-sm text-muted-foreground">
          15 de Agosto, 2026 • Tucumán, Argentina
        </p>
      </div>
    </footer>
  )
}
