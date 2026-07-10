"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X, Search, Loader2 } from "lucide-react";

export type Rsvp = {
  id: string;
  created_at: string;
  nombre: string;
  asiste: boolean;
  alergias: string | null;
  tipo_invitado: string | null;
};

export function AdminRsvpList({ rsvps }: { rsvps: Rsvp[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? rsvps.filter((r) => (r.nombre ?? "").toLowerCase().includes(q))
    : rsvps;

  function startEdit(r: Rsvp) {
    setError(null);
    setEditingId(r.id);
    setEditValue(r.nombre ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  async function saveEdit(id: string) {
    const nombre = editValue.trim();
    if (!nombre) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    setSavingId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/rsvp", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo guardar.");
      }
      cancelEdit();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar.");
    } finally {
      setSavingId(null);
    }
  }

  async function remove(r: Rsvp) {
    const ok = window.confirm(
      `¿Borrar la confirmación de "${r.nombre}"?\nEsta acción no se puede deshacer.`,
    );
    if (!ok) return;

    setDeletingId(r.id);
    setError(null);
    try {
      const res = await fetch("/api/admin/rsvp", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: r.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo borrar.");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al borrar.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {/* Buscador */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre…"
          className="pl-9"
        />
      </div>

      {error && (
        <p className="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

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
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((r) => {
                const isEditing = editingId === r.id;
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">
                      {isEditing ? (
                        <Input
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(r.id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          className="h-8"
                        />
                      ) : (
                        r.nombre
                      )}
                    </TableCell>
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
                      <span suppressHydrationWarning>
                        {formatFecha(r.created_at)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => saveEdit(r.id)}
                            disabled={savingId === r.id}
                            aria-label="Guardar"
                          >
                            {savingId === r.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={cancelEdit}
                            disabled={savingId === r.id}
                            aria-label="Cancelar"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => startEdit(r)}
                            aria-label="Editar nombre"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => remove(r)}
                            disabled={deletingId === r.id}
                            aria-label="Borrar"
                          >
                            {deletingId === r.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  {q
                    ? "Sin resultados para tu búsqueda"
                    : "Aún no hay confirmaciones"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((r) => {
            const isEditing = editingId === r.id;
            return (
              <div key={r.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <Input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(r.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="h-8"
                      />
                    ) : (
                      <p className="font-medium truncate">{r.nombre}</p>
                    )}
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <TipoBadge tipo={r.tipo_invitado} />
                      <p
                        className="text-xs text-muted-foreground"
                        suppressHydrationWarning
                      >
                        {formatFecha(r.created_at)}
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

                {r.alergias && !isEditing && (
                  <p className="mt-3 text-sm text-muted-foreground border-t pt-3">
                    🍽️ {r.alergias}
                  </p>
                )}

                {/* Acciones */}
                <div className="mt-3 flex gap-2 border-t pt-3">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => saveEdit(r.id)}
                        disabled={savingId === r.id}
                      >
                        {savingId === r.id ? (
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-1 h-4 w-4" />
                        )}
                        Guardar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={cancelEdit}
                        disabled={savingId === r.id}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => startEdit(r)}
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => remove(r)}
                        disabled={deletingId === r.id}
                      >
                        {deletingId === r.id ? (
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-1 h-4 w-4" />
                        )}
                        Borrar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground py-8">
            {q
              ? "Sin resultados para tu búsqueda"
              : "Aún no hay confirmaciones"}
          </p>
        )}
      </div>
    </div>
  );
}

const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function formatFecha(iso: string) {
  // Argentina = UTC-3 fijo (sin horario de verano). Restamos 3h y leemos en
  // UTC, y armamos el string a mano: así servidor y cliente producen el mismo
  // texto byte a byte y no hay mismatch de hidratación (toLocaleString mete un
  // espacio distinto en Node vs navegador antes del "p. m.").
  const d = new Date(new Date(iso).getTime() - 3 * 60 * 60 * 1000);
  const dia = String(d.getUTCDate()).padStart(2, "0");
  const mes = MESES[d.getUTCMonth()];
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  const h24 = d.getUTCHours();
  const sufijo = h24 >= 12 ? "p. m." : "a. m.";
  const h12 = String(h24 % 12 || 12).padStart(2, "0");
  return `${dia}-${mes}, ${h12}:${min} ${sufijo}`;
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