"use client"

import { useTransition, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { wakeUpSupabase } from "@/app/admin/actions"
import { Database, RefreshCw, Moon } from "lucide-react"

export function DbPausedWarning({ message }: { message: string }) {
  const [isPending, startTransition] = useTransition()
  const [secondsWaited, setSecondsWaited] = useState(0)

  // Contador visible mientras esperamos, para que el usuario sepa que algo pasa
useEffect(() => {
  // Solo activamos el contador cuando estamos esperando.
  // Si no, no hacemos nada (no reseteamos en el effect → evita el setState síncrono).
  if (!isPending) return

  const id = setInterval(() => {
    setSecondsWaited((s) => s + 1)
  }, 1000)

  return () => clearInterval(id)
}, [isPending])

  const handleWake = () => {
    startTransition(async () => {
      await wakeUpSupabase()
    })
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <Moon className="h-7 w-7 text-amber-600" />
        </div>

        <h1 className="font-serif text-2xl mb-3">La base de datos está descansando 😴</h1>

        <p className="text-sm text-muted-foreground mb-2">
          Supabase pausa automáticamente los proyectos gratuitos tras unos días sin uso.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Pulsa el botón para despertarla. Tarda entre <strong>30 y 60 segundos</strong> la primera vez.
        </p>

        <Button
          onClick={handleWake}
          disabled={isPending}
          size="lg"
          className="w-full sm:w-auto"
        >
          {isPending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Despertando... {secondsWaited}s
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Despertar base de datos
            </>
          )}
        </Button>

        {isPending && secondsWaited > 15 && (
          <p className="mt-4 text-xs text-muted-foreground">
            Aguanta un poco más, ya casi 🙏
          </p>
        )}

        <details className="mt-8 text-left">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
            Detalles técnicos
          </summary>
          <p className="mt-2 text-xs text-muted-foreground/80 font-mono break-all">
            {message}
          </p>
        </details>
      </div>
    </main>
  )
}