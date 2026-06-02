import {
  MapPin,
  Car,
  Church,
  Clock,
  PartyPopperIcon,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCalendar } from "./add-to-calendar";

interface LocationSectionProps {
  /** Si false, oculta la ceremonia y muestra solo la fiesta. Default: true */
  showCeremony?: boolean;
  /** Hora de inicio de la fiesta en formato HH:MM. Default: "17:15" */
  fiestaStartTime?: string;
  /** Texto descriptivo de la hora que se muestra en pantalla. Default: "17:15 hs" */
  fiestaDisplayTime?: string;
}

export function LocationSection({
  showCeremony = true,
  fiestaStartTime = "17:15",
  fiestaDisplayTime = "17:15 hs",
}: LocationSectionProps) {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        {showCeremony && (
          <>
            {/* Ceremonia - Iglesia */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Church className="w-6 h-6 text-secondary" />
                <h3 className="font-serif text-3xl text-foreground">
                  Ceremonia
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video md:aspect-auto md:h-64 bg-muted rounded-lg overflow-hidden order-2 md:order-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.6!2d-65.3!3d-26.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94224328be1c5b0f%3A0x8c8b8b8b8b8b8b8b!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Valle!5e0!3m2!1ses!2sar!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicacion de la ceremonia"
                  />
                </div>

                <div className="space-y-4 order-1 md:order-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-secondary">
                    <Clock className="w-5 h-5" />
                    <span className="font-serif text-xl">
                      Sabado 15 de Agosto - <b>16:00 hs</b>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">
                      Parroquia Nuestra Señora del Valle
                    </h4>
                    <p className="text-muted-foreground">
                      Florida Sur 251
                      <br />
                      T4107 Yerba Buena, Tucumán
                      <br />
                      Argentina
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <a
                        href="https://maps.app.goo.gl/EjT7TDvo42PbrZik6"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        Ver en Google Maps
                      </a>
                    </Button>

                    <AddToCalendar
                      title="Ceremonia · Boda Coni & Nico"
                      description="Te esperamos en la Parroquia Nuestra Señora del Valle para celebrar nuestra ceremonia."
                      location="Parroquia Nuestra Señora del Valle, Florida Sur 251, Yerba Buena, Tucumán, Argentina"
                      startDate="2026-08-15"
                      startTime="16:00"
                      endDate="2026-08-15"
                      endTime="17:15"
                      uid="ceremonia"
                      buttonLabel="Agendar ceremonia"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground font-serif text-lg">
                y luego...
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </>
        )}{" "}
        {/* Fin de la sección de  ceremonia, que se muestra solo si showCeremony es true */}
        {/* Fiesta */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <PartyPopperIcon className="w-6 h-6 text-secondary" />
            <h3 className="font-serif text-3xl text-foreground">Fiesta</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video md:aspect-auto md:h-64 bg-muted rounded-lg overflow-hidden order-2 md:order-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.6!2d-65.317005!3d-26.828916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942243006f0f99c5%3A0x8bce8b3a06e4bd3f!2sNuevo%20Terrazas%20de%20San%20Jos%C3%A9!5e0!3m2!1ses!2sar!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion de la fiesta"
              />
            </div>

            <div className="space-y-4 order-1 md:order-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-secondary">
                <Clock className="w-5 h-5" />
                <span className="font-serif text-xl">
                  Sabado 15 de Agosto - <b>17:15 hs</b>
                </span>
              </div>

              <div>
                <h4 className="font-serif text-xl text-foreground mb-2">
                  Terrazas de San Jose
                </h4>
                <p className="text-muted-foreground">
                  Camino de Sirga y La Rioja
                  <br />
                  Yerba Buena, Tucuman 4107
                  <br />
                  Argentina
                </p>
              </div>

              <div className="flex items-start justify-center md:justify-start gap-3 text-muted-foreground">
                <Car className="w-5 h-5 text-primary mt-1 shrink-0" />
                <p className="text-sm text-left">
                  A 20 minutos del centro de San Miguel de Tucuman. Recomendamos
                  ir en remis/taxi o Uber.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <a
                    href="https://maps.app.goo.gl/owq1WYBxqrCQasNt9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Ver en Google Maps
                  </a>
                </Button>

                <AddToCalendar
                  title="Fiesta · Boda Coni & Nico"
                  description="¡A celebrar! Te esperamos en Terrazas de San José."
                  location="Terrazas de San José, Camino de Sirga y La Rioja, Yerba Buena, Tucumán, Argentina"
                  startDate="2026-08-15"
                  startTime="17:15"
                  endDate="2026-08-16"
                  endTime="01:00"
                  uid="fiesta"
                  buttonLabel="Agendar fiesta"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Dress Code */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Shirt className="w-6 h-6 text-secondary" />
            <h3 className="font-serif text-3xl text-foreground">
              Dress Code
            </h3> 
          </div>
          <p className="text-muted-foreground font-bold mb-1">Elegante</p>
          <ul className="flex flex-col gap-0.5 text-sm text-muted-foreground">
            <li>Ellas: vestido de fiesta</li>
            <li>Ellos: traje formal</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
