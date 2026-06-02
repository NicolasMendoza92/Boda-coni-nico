import { z } from "zod";

export const cancionSchema = z.object({
  nombre: z.string().max(80).optional(),
  cancion: z
    .string()
    .min(2, "Decinos qué canción te gustaría escuchar")
    .max(500, "La sugerencia es demasiado larga"),
});

export type CancionInput = z.infer<typeof cancionSchema>;