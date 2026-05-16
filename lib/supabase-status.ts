import { supabaseAdmin } from "./supabase"

export type SupabaseStatus =
  | { kind: "ok" }
  | { kind: "paused"; message: string }       // proyecto dormido/pausado
  | { kind: "timeout"; message: string }       // tarda demasiado
  | { kind: "auth"; message: string }          // claves inválidas
  | { kind: "unknown"; message: string }

/**
 * Hace una query rápida con timeout y clasifica el resultado.
 * Útil para distinguir "Supabase dormido" de otros fallos.
 */
export async function checkSupabaseStatus(timeoutMs = 8000): Promise<SupabaseStatus> {
  try {
    const queryPromise = supabaseAdmin
      .from("rsvp")
      .select("id", { count: "exact", head: true })

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("__TIMEOUT__")), timeoutMs)
    )

    const result = await Promise.race([queryPromise, timeoutPromise]) as
      | { error: { message: string; code?: string } | null }
      | never

    if (result.error) {
      const msg = result.error.message.toLowerCase()
      if (msg.includes("jwt") || msg.includes("invalid") || msg.includes("auth")) {
        return { kind: "auth", message: result.error.message }
      }
      return { kind: "unknown", message: result.error.message }
    }

    return { kind: "ok" }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg === "__TIMEOUT__") {
      return {
        kind: "paused",
        message: "El proyecto de Supabase parece estar pausado o tarda en responder.",
      }
    }
    if (msg.toLowerCase().includes("fetch failed") || msg.toLowerCase().includes("network")) {
      return { kind: "paused", message: "No se pudo contactar con Supabase." }
    }
    return { kind: "unknown", message: msg }
  }
}