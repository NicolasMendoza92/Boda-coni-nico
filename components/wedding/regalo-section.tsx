"use client";
import { Check, Copy, Gift } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function RegaloSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isCopied = (key: string) => copiedKey === key;

  return (
    <section className="py-16 px-4 md:py-24 bg-card">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15">
          <Gift className="w-7 h-7 text-emerald-600" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl text-foreground">
          El mejor regalo: ¡tu presencia!
        </h2>

        <p className="text-sm md:text-base text-muted-foreground">
          Si además querés hacernos un presente, te dejamos nuestras cuentas
          para que elijas la que te quede más cómoda.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-6 text-left bg-background/60 border border-border rounded-xl shadow-sm"
        >
          {/* Cuenta USD */}
          <AccordionItem value="usd">
            <AccordionTrigger className="px-4 md:px-6">
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Cuenta en dólares (USD)</span>
                <span className="text-xs text-muted-foreground">
                  Banco BBVA
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 md:px-6 md:pb-6 space-y-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Datos de la cuenta
              </div>

              <div className="space-y-2">
                {/* CBU USD */}
                <div className="flex items-center gap-2 bg-muted/70 px-3 py-2 rounded-md">
                  <span className="text-xs font-semibold text-emerald-700">
                    CBU
                  </span>
                  <span className="flex-1 text-sm font-mono select-all break-all">
                    0170215844000063201578
                  </span>
                  <button
                    onClick={() =>
                      handleCopy("cbu-usd", "0170215844000063201578")
                    }
                    aria-label="Copiar CBU cuenta dólar"
                    className="flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition h-8 w-8"
                  >
                    {isCopied("cbu-usd") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Alias USD */}
                <div className="flex items-center gap-2 bg-muted/70 px-3 py-2 rounded-md">
                  <span className="text-xs font-semibold text-emerald-700">
                    Alias
                  </span>
                  <span className="flex-1 text-sm font-mono select-all break-all">
                    CONI.NICO.TUCUMAN
                  </span>
                  <button
                    onClick={() =>
                      handleCopy("alias-usd", "CONI.NICO.TUCUMAN")
                    }
                    aria-label="Copiar alias cuenta dólar"
                    className="flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition h-8 w-8"
                  >
                    {isCopied("alias-usd") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Cuenta Pesos */}
          <AccordionItem value="ars">
            <AccordionTrigger className="px-4 md:px-6">
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">Cuenta en pesos (ARS)</span>
                <span className="text-xs text-muted-foreground">
                  Banco BBVA
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 md:px-6 md:pb-6 space-y-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Datos de la cuenta
              </div>

              <div className="space-y-2">
                {/* CBU ARS */}
                <div className="flex items-center gap-2 bg-muted/70 px-3 py-2 rounded-md">
                  <span className="text-xs font-semibold text-emerald-700">
                    CBU
                  </span>
                  <span className="flex-1 text-sm font-mono select-all break-all">
                    0170215840000022795296
                  </span>
                  <button
                    onClick={() =>
                      handleCopy("cbu-ars", "0170215840000022795296")
                    }
                    aria-label="Copiar CBU cuenta pesos"
                    className="flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition h-8 w-8"
                  >
                    {isCopied("cbu-ars") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Alias ARS */}
                <div className="flex items-center gap-2 bg-muted/70 px-3 py-2 rounded-md">
                  <span className="text-xs font-semibold text-emerald-700">
                    Alias
                  </span>
                  <span className="flex-1 text-sm font-mono select-all break-all">
                    BODA.CONI.NICO
                  </span>
                  <button
                    onClick={() =>
                      handleCopy("alias-ars", "BODA.CONI.NICO")
                    }
                    aria-label="Copiar alias cuenta pesos"
                    className="flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition h-8 w-8"
                  >
                    {isCopied("alias-ars") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-4 text-xs text-muted-foreground">
          Gracias por acompañarnos en este momento tan especial.
        </p>
      </div>
    </section>
  );
}

// 0720067088000040561840 --CBU SANTANDER PESOS