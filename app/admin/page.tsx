import { redirect } from "next/navigation"
import Link from "next/link"
import { isAdminLoggedIn, destroyAdminSession } from "@/lib/admin-session"
import { supabaseAdmin } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, LogOut, Users, Check, X } from "lucide-react"

// Sin caché — siempre datos frescos
export const dynamic = "force-dynamic"

async function logout() {
  "use server"
  await destroyAdminSession()
  redirect("/admin/login")
}

export default async function AdminPage() {
  if (!(await isAdminLoggedIn())) redirect("/admin/login")

  const { data: rsvps, error } = await supabaseAdmin
    .from("rsvp")
    .select("id, created_at, nombre, asiste, alergias")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-destructive">Error cargando datos: {error.message}</p>
      </main>
    )
  }

  const total = rsvps?.length ?? 0
  const sies = rsvps?.filter((r) => r.asiste).length ?? 0
  const noes = total - sies

  return (
    <main className="min-h-100dvh bg-background px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl">Panel de invitados</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Confirmaciones recibidas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver web
              </Link>
            </Button>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard icon={<Users className="h-4 w-4" />} label="Total" value={total} />
          <StatCard
            icon={<Check className="h-4 w-4 text-green-600" />}
            label="Asisten"
            value={sies}
          />
          <StatCard
            icon={<X className="h-4 w-4 text-muted-foreground" />}
            label="No asisten"
            value={noes}
          />
        </div>

        {/* Export */}
        <div className="mb-4">
          <Button asChild className="w-full md:w-auto">
            <a href="/api/admin/export" download>
              <Download className="mr-2 h-4 w-4" />
              Descargar lista (Excel)
            </a>
          </Button>
        </div>

        {/* Tabla — desktop */}
        <div className="hidden md:block rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>¿Asiste?</TableHead>
                <TableHead>Alergias</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvps && rsvps.length > 0 ? (
                rsvps.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.nombre}</TableCell>
                    <TableCell>
                      {r.asiste ? (
                        <Badge className="bg-green-600 hover:bg-green-600">Sí</Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.alergias || "—"}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    Aún no hay confirmaciones
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-3">
          {rsvps && rsvps.length > 0 ? (
            rsvps.map((r) => (
              <div key={r.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{r.nombre}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {r.asiste ? (
                    <Badge className="bg-green-600 hover:bg-green-600 shrink-0">Sí</Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">No</Badge>
                  )}
                </div>
                {r.alergias && (
                  <p className="mt-3 text-sm text-muted-foreground border-t pt-3">
                    🍽️ {r.alergias}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aún no hay confirmaciones
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div className="rounded-lg border bg-card p-3 md:p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-2xl md:text-3xl font-serif">{value}</p>
    </div>
  )
}