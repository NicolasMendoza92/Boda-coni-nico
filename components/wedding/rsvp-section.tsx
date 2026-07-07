"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitRsvp } from "@/app/actions/rsvp";
import { rsvpSchema, type RsvpInput } from "@/lib/rsvp-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Check, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface RsvpSectionProps {
  // ← nuevo
  tipoInvitado?: "completo" | "post-cena"; // ← nuevo
  horaDisplay?: string; // ← nuevo (para el texto bajo el título)
}

export function RsvpSection({
  tipoInvitado = "completo",
  horaDisplay = "16:00 hs",
}: RsvpSectionProps = {}) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { nombre: "", alergias: "", tipoInvitado },
  });

  const asisteValue = watch("asiste");

  const onSubmit = (values: RsvpInput) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("nombre", values.nombre);
      fd.append("asiste", values.asiste);
      fd.append("alergias", values.alergias ?? "");
      fd.append("tipoInvitado", tipoInvitado);

      const res = await submitRsvp(fd);
      if (res.ok) {
        setDone(true);
        toast.success("¡Confirmación recibida! 💕");
      } else {
        toast.error(res.error);
      }
    });
  };

  if (done) {
    return (
      <section
        id="rsvp"
        className="px-6 py-24 text-center scroll-mt-20"
        aria-labelledby="rsvp-title"
      >
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 id="rsvp-title" className="font-serif text-3xl">
            ¡Gracias! 🥂
          </h2>
          <p className="text-muted-foreground">
            Hemos recibido tu confirmación. Nos vemos pronto.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="px-6 py-24 scroll-mt-20"
      aria-labelledby="rsvp-title"
    >
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Heart className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 id="rsvp-title" className="font-serif text-3xl md:text-4xl">
            Confirma tu asistencia
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            15 de Agosto - {horaDisplay} {/* ← dinámico */}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Antes del 25 de Julio, por favor 🙏
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre y Apellido</Label>
            <Input
              id="nombre"
              autoComplete="name"
              inputMode="text"
              placeholder="Ej: Juan Pérez"
              aria-invalid={!!errors.nombre}
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-xs text-destructive">
                {errors.nombre.message}
              </p>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">
                *Completar de manera individual por cada invitado
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label="Más información"
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground/40 text-muted-foreground transition hover:border-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      ¿Cómo completar?
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-left leading-relaxed">
                      Cada invitado debe confirmar de forma individual. Si estás
                      invitado con tu pareja, completá el formulario una vez por
                      cada persona: primero con el nombre y apellido de uno y
                      luego con el del otro.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">¿Vendrás?</legend>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 transition ${
                  asisteValue === "si"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:border-muted-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  value="si"
                  className="sr-only"
                  {...register("asiste")}
                />
                <span className="text-sm">¡Si, confirmo! 💃</span>
              </label>
              <label
                className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 transition ${
                  asisteValue === "no"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:border-muted-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  value="no"
                  className="sr-only"
                  {...register("asiste")}
                />
                <span className="text-sm">No podré 😢</span>
              </label>
            </div>
            {errors.asiste && (
              <p className="text-xs text-destructive">
                {errors.asiste.message}
              </p>
            )}
          </fieldset>

          {asisteValue === "si" && tipoInvitado === "completo" && (
            <div className="space-y-2">
              <Label htmlFor="alergias">
                Alergias o restricciones alimentarias
                <span className="ml-1 text-xs text-muted-foreground">
                  (opcional)
                </span>
              </Label>
              <Textarea
                id="alergias"
                rows={3}
                placeholder="Ej: vegetariana, sin gluten, alergia a frutos secos..."
                {...register("alergias")}
              />
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Confirmar"}
          </Button>
        </form>
      </div>
    </section>
  );
}
