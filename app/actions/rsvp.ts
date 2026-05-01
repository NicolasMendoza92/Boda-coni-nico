"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { rsvpSchema } from "@/lib/rsvp-schema";

export async function submitRsvp(formData: FormData) {
  const raw = {
    nombre: formData.get("nombre"),
    asiste: formData.get("asiste"),
    alergias: formData.get("alergias") ?? "",
  };

  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  // Hash de IP para evitar spam (no guardamos IP en claro, GDPR-friendly)
  const h = await headers();
  const ip = h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

  const { error } = await supabaseAdmin.from("rsvp").insert({
    nombre: parsed.data.nombre,
    asiste: parsed.data.asiste === "si",
    alergias: parsed.data.alergias || null,
    ip_hash: ipHash,
  });

  if (error) {
    console.error("[RSVP] error:", error);
    return { ok: false as const, error: "No pudimos guardar tu respuesta" };
  }

  return { ok: true as const };
}