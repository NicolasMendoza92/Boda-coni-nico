import { createClient } from "@supabase/supabase-js";

// Cliente para server actions (tiene permisos totales — NUNCA usar en componentes cliente)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  }
);