import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-session";
import { supabaseAdmin } from "@/lib/supabase";

// El service_role key se salta RLS, así que desde aquí sí podemos
// borrar y actualizar filas (la política anon solo permite INSERT).

// ---- Borrar una confirmación -------------------------------------------
export async function DELETE(req: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("rsvp").delete().eq("id", id);
  if (error) {
    console.error("[ADMIN] error borrando rsvp:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// ---- Editar el nombre de una confirmación ------------------------------
export async function PATCH(req: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let id: unknown;
  let nombre: unknown;
  try {
    ({ id, nombre } = await req.json());
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  const nombreLimpio = typeof nombre === "string" ? nombre.trim() : "";
  if (!nombreLimpio) {
    return NextResponse.json(
      { error: "El nombre no puede estar vacío" },
      { status: 400 },
    );
  }
  if (nombreLimpio.length > 120) {
    return NextResponse.json(
      { error: "El nombre es demasiado largo" },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("rsvp")
    .update({ nombre: nombreLimpio })
    .eq("id", id);

  if (error) {
    console.error("[ADMIN] error editando rsvp:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}