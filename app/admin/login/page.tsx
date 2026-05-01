import { redirect } from "next/navigation"
import { isAdminLoggedIn, createAdminSession } from "@/lib/admin-session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

async function login(formData: FormData) {
  "use server"
  const password = formData.get("password")
  if (typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1")
  }
  await createAdminSession()
  redirect("/admin")
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  if (await isAdminLoggedIn()) redirect("/admin")
  const { error } = await searchParams

  return (
    <main className="flex min-h-100dvh items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-serif text-2xl">Panel privado</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Solo para Coni & Nico 💍
          </p>
        </div>

        <form action={login} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
            {error && (
              <p className="text-xs text-destructive">
                Contraseña incorrecta
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>
        </form>
      </div>
    </main>
  )
}