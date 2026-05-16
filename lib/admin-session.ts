import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "admin_session"
const SECRET = process.env.ADMIN_SESSION_SECRET!
const MAX_AGE = 60 * 60 * 24 * 120 // 120 días

function sign(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex")
}

export async function createAdminSession() {
  const value = "ok"
  const sig = sign(value)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, `${value}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  })
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_NAME)?.value
  if (!raw) return false
  const [value, sig] = raw.split(".")
  if (!value || !sig) return false
  const expected = sign(value)
  // timingSafeEqual evita timing attacks
  try {
    const a = Buffer.from(sig, "hex")
    const b = Buffer.from(expected, "hex")
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}