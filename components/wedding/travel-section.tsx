import { Hotel, Plane } from "lucide-react"

export function TravelSection() {
  return (
    <section className="py-24 px-6 bg-secondary/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
            <Plane className="w-8 h-8 text-secondary" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Venis desde Espana?
          </h2>

          <div className="w-16 h-px bg-primary mx-auto mb-6" />
        </div>

        {/* Hotel info - centered */}
        <div className="bg-card p-8 rounded-lg max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <Hotel className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-4">
              Donde Alojarte
            </h3>
            <ul className="space-y-3 text-muted-foreground w-full">
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondary">-</span>
                <span><strong>Hotel Garden Park</strong> - Cerca del centro</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondary">-</span>
                <span><strong>Sheraton Tucuman</strong> - Premium</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-secondary">-</span>
                <span><strong>Hotel Carlos V</strong> - Opcion economica</span>
              </li>
              <li className="pt-2 text-sm text-center">
                Todos a menos de 20 min del venue
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
