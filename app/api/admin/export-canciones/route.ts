import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-session";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function csvCell(value: string | null | boolean | undefined): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("canciones")
    .select("nombre, cancion, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }

  const headers = ["Nombre", "Canción", "Fecha"];
  const rows = (data ?? []).map((r) => [
    csvCell(r.nombre || "Anónimo"),
    csvCell(r.cancion),
    csvCell(new Date(r.created_at).toLocaleString("es-AR")),
  ]);

  const csv =
    "\uFEFF" +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="canciones-boda-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}