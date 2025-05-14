import { z } from "zod";

const authSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener como mínimo 3 caracteres")
    .max(20, "El nombre de usuario puede tener hasta 20 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export { authSchema };
