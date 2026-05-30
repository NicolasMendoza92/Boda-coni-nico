import { z } from "zod";

export const rsvpSchema = z.object({
  nombre: z
    .string()
    .min(2, "Necesitamos tu nombre completo")
    .max(80, "Demasiado largo")
    .trim(),
  asiste: z.enum(["si", "no"], {
    message: "Cuéntanos si vienes 🥺",
  }),
  alergias: z.string().max(300, "Muy largo").optional().or(z.literal("")),
  tipoInvitado: z.enum(["completo", "post-cena"]).default("completo"),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;