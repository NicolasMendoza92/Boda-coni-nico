"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { cancionSchema } from "@/lib/cancion-schema";

export async function submitCancion(formData: FormData) {
  const raw = {
    nombre: (formData.get("nombre") as string | null) ?? "",
    cancion: (formData.get("cancion") as string | null) ?? "",
  };

  const parsed = cancionSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

  const { error } = await supabaseAdmin.from("canciones").insert({
    nombre: parsed.data.nombre?.trim() || null,
    cancion: parsed.data.cancion.trim(),
    ip_hash: ipHash,
  });

  if (error) {
    console.error("[CANCION] error:", error);
    return { ok: false as const, error: "No pudimos guardar tu sugerencia" };
  }

  return { ok: true as const };
}