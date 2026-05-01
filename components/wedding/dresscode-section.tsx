import { Shirt } from "lucide-react"

export function DresscodeSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-md mx-auto">
        <div className="bg-card p-8 rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
            <Shirt className="w-7 h-7 text-primary" />
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Codigo de Vestimenta
          </h2>

          <p className="text-xl text-foreground mb-6">
            Elegante Casual
          </p>

          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex items-center justify-center gap-2">
              <span className="text-primary">-</span>
              Colores claros preferidos
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-primary">-</span>
              Vestidos largos o midi
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-primary">-</span>
              Traje o pantalon de vestir
            </li>
            <li className="flex items-center justify-center gap-2 text-destructive">
              <span>x</span>
              Nada de blanco, por favor
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
