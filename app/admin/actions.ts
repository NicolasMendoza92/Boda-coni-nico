"use server"

import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase"

/**
 * Hace una request "barata" a Supabase para forzar el despertar del proyecto.
 * Si está pausado por inactividad, esta llamada arranca el proceso de despertar
 * y suele estar listo en 30-60s.
 */
export async function wakeUpSupabase() {
  try {
    // head: true → no descarga filas, solo cuenta. Más rápido y barato.
    await supabaseAdmin.from("rsvp").select("id", { count: "exact", head: true })
  } catch {
    // Ignoramos el error: lo importante es disparar la request,
    // aunque falle por timeout el proyecto ya está despertando.
  }
  revalidatePath("/admin")
}