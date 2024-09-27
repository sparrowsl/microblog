import { validator } from "hono/validator";
import { z } from "zod";

const auth_schema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(2, { message: "name is too short" }),
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(2, { message: "username is too short" }),
  email: z.string({ required_error: "email is required" }).email(),
  password: z
    .string({ required_error: "password is required" })
    .min(4, { message: "password too short" }),
});

export const validate_login = validator("json", (value, c) => {
  const { success, data, error } = auth_schema.omit({ name: true, email: true }).safeParse(value);

  if (!success) {
    const { fieldErrors } = error.flatten();
    const errors = Object.values(fieldErrors).flat();
    return c.json({ message: errors.at(0) }, 400);
  }

  return data;
});

export const validate_register = validator("json", (value, c) => {
  const { success, data, error } = auth_schema.omit({ name: true }).safeParse(value);

  if (!success) {
    const { fieldErrors } = error.flatten();
    const errors = Object.values(fieldErrors).flat();
    return c.json({ message: errors.at(0) }, 400);
  }

  return data;
});
