import { z } from "zod";

const login_schema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be more than 3 letters" }),
  password: z
    .string({ required_error: "password is required" })
    .min(3, { message: "password must be more than 3 characters" }),
  remember: z
    .enum(["on", "off"])
    .transform((v) => v === "on")
    .optional(),
});

/** @param {*} value */
export const check_login_data = (value) => {
  const { success, data, error } = login_schema.safeParse(value);

  if (!success) {
    const errors = Object.values(error.flatten().fieldErrors).flat();
    return { message: errors[0] };
  }

  return { valid: success, data };
};
