import { validator } from "hono/validator";
import { z } from "zod";

export const login_schema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be more than 3 letters" }),
  password: z
    .string({ required_error: "password is required" })
    .min(3, { message: "password must be more than 3 characters" }),
  remember: z.boolean().optional().default(false),
});

export const validate_login = validator("json", (value, c) => {
  const { success, data, error } = login_schema.safeParse(value);

  if (!success) {
    const errors = Object.values(error.flatten().fieldErrors).flat();
    return c.json({ success, message: errors[0] }, 400);
  }

  return data;
});
