"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitCancion } from "@/app/actions/cancion";
import { cancionSchema, type CancionInput } from "@/lib/cancion-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";

export function CancionesSection() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CancionInput>({
    resolver: zodResolver(cancionSchema),
    defaultValues: { nombre: "", cancion: "" },
  });

  const onSubmit = (values: CancionInput) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("nombre", values.nombre ?? "");
      fd.append("cancion", values.cancion);

      const res = await submitCancion(fd);
      if (res.ok) {
        toast.success("¡Anotada! 🎶 Gracias por sumar a la playlist");
        // Mantener el nombre, limpiar solo la canción para que sea fácil mandar otra
        reset({ nombre: getValues("nombre"), cancion: "" });
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <section
      id="canciones"
      className="px-6 py-24 scroll-mt-20"
      aria-labelledby="canciones-title"
    >
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Music className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 id="canciones-title" className="font-serif text-3xl md:text-4xl">
            Aañade tus canciones favoritas
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ayudanos a armar la playlist de la noche 🎶
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* <div className="space-y-2">
            <Label htmlFor="cancion-nombre">
              Tu nombre
              <span className="ml-1 text-xs text-muted-foreground">
                (opcional)
              </span>
            </Label>
            <Input
              id="cancion-nombre"
              autoComplete="name"
              placeholder="Para saber quién la pidió"
              {...register("nombre")}
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="cancion">Canción o link</Label>
            <Input
              id="cancion"
              placeholder="Ej: Azul - Cristian Castro · o link de Spotify/YouTube"
              aria-invalid={!!errors.cancion}
              {...register("cancion")}
            />
            {errors.cancion && (
              <p className="text-xs text-destructive">{errors.cancion.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Sugerir canción"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Podés sugerir todas las que quieras ✨
          </p>
        </form>
      </div>
    </section>
  );
}