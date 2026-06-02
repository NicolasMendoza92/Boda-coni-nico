import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminLoggedIn, destroyAdminSession } from "@/lib/admin-session";
import { supabaseAdmin } from "@/lib/supabase";
import { checkSupabaseStatus } from "@/lib/supabase-status";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DbPausedWarning } from "@/components/wedding/db-paused-warning";
import { Download, ExternalLink, LogOut, Users, Check, X } from "lucide-react";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";
  await destroyAdminSession();
  redirect("/admin/login");
}

export default async function AdminPage() {
  if (!(await isAdminLoggedIn())) redirect("/admin/login");

  const status = await checkSupabaseStatus();

  if (status.kind === "paused" || status.kind === "timeout") {
    return <DbPausedWarning message={status.message} />;
  }

  if (status.kind !== "ok") {
    return (
      <main className="min-h-100dvh flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-lg border border-destructive/30 bg-destructive/5 p-6">
          <h2 className="font-medium text-destructive mb-2">
            Error de conexión con la base de datos
          </h2>
          <p className="text-sm text-muted-foreground mb-2">{status.message}</p>
          <p className="text-xs text-muted-foreground">
            Revisa <code>SUPABASE_SERVICE_ROLE_KEY</code> en las variables de
            entorno.
          </p>
        </div>
      </main>
    );
  }

  const { data: rsvps, error } = await supabaseAdmin
    .from("rsvp")
    .select("id, created_at, nombre, asiste, alergias, tipo_invitado") // ← añadir tipo_invitado
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-destructive">
          Error cargando datos: {error.message}
        </p>
      </main>
    );
  }

  const { data: canciones, error: cancionesError } = await supabaseAdmin
    .from("canciones")
    .select("id, created_at, nombre, cancion")
    .order("created_at", { ascending: false });

  if (cancionesError) {
    console.error("[ADMIN] error canciones:", cancionesError);
  }

  const total = rsvps?.length ?? 0;
  const sies = rsvps?.filter((r) => r.asiste).length ?? 0;
  const noes = total - sies;

  // Stats por tipo de invitado (solo quienes asisten)
  const asistenCompleto =
    rsvps?.filter((r) => r.asiste && r.tipo_invitado === "completo").length ??
    0;
  const asistenPostCena =
    rsvps?.filter((r) => r.asiste && r.tipo_invitado === "post-cena").length ??
    0;

  return (
    <main className="min-h-100dvh bg-background px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl">
              Panel de invitados
            </h1>
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

        {/* Stats principales */}
        <div className="mb-3 grid grid-cols-3 gap-3">
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Total"
            value={total}
          />
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

        {/* Stats por tipo (desglose de los que asisten) */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <StatCard
            icon={<Check className="h-4 w-4 text-primary" />}
            label="Ceremonia + fiesta"
            value={asistenCompleto}
          />
          <StatCard
            icon={<Check className="h-4 w-4 text-secondary" />}
            label="Post-cena"
            value={asistenPostCena}
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
                <TableHead>Tipo</TableHead>
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
                        <Badge className="bg-green-600 hover:bg-green-600">
                          Sí
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <TipoBadge tipo={r.tipo_invitado} />
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
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
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
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <TipoBadge tipo={r.tipo_invitado} />
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {r.asiste ? (
                    <Badge className="bg-green-600 hover:bg-green-600 shrink-0">
                      Sí
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">
                      No
                    </Badge>
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
        {/* Canciones sugeridas */}
        <section className="mt-16 border-t pt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl md:text-2xl">
                Canciones sugeridas
              </h2>
              <p className="text-xs text-muted-foreground">
                {canciones?.length ?? 0} sugerencias
              </p>
            </div>
            {canciones && canciones.length > 0 && (
              <Button asChild variant="outline" size="sm">
                <a href="/api/admin/export-canciones" download>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </a>
              </Button>
            )}
          </div>

          {canciones && canciones.length > 0 ? (
            <ul className="space-y-2">
              {canciones.map((c) => (
                <li key={c.id} className="rounded-lg border bg-card p-3">
                  <CancionTexto texto={c.cancion} />
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{c.nombre || "Anónimo"}</span>
                    <span>·</span>
                    <span>
                      {new Date(c.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              Aún no hay sugerencias
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border bg-card p-3 md:p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-2xl md:text-3xl font-serif">{value}</p>
    </div>
  );
}

function CancionTexto({ texto }: { texto: string }) {
  const urlMatch = texto.match(/https?:\/\/\S+/);
  if (!urlMatch) {
    return <p className="font-medium wrap-break-words">{texto}</p>;
  }
  const url = urlMatch[0];
  const before = texto.slice(0, urlMatch.index);
  const after = texto.slice(urlMatch.index! + url.length);
  return (
    <p className="font-medium wrap-break-words">
      {before}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:no-underline"
      >
        {url}
      </a>
      {after}
    </p>
  );
}

function TipoBadge({ tipo }: { tipo: string | null | undefined }) {
  if (tipo === "post-cena") {
    return (
      <Badge variant="outline" className="border-secondary text-secondary">
        Post-cena
      </Badge>
    );
  }
  // default: completo (también cubre null/undefined de registros viejos)
  return <Badge variant="outline">Completo</Badge>;
}
