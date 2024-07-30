import { API_HOST } from "$env/static/private";
import { z } from "zod";

const register_schema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be more than 3 letters" }),
  email: z.string({ required_error: "email is required" }).email(),
  password: z
    .string({ required_error: "password is required" })
    .min(3, { message: "password must be more than 3 characters" }),
  password_confirm: z
    .string({ required_error: "password is required" })
    .min(3, { message: "password must be more than 3 characters" }),
});

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    const form = Object.fromEntries(await request.formData());
    const { data, success, error } = register_schema.safeParse(form);

    if (!success) {
      const errors = Object.values(error.flatten().fieldErrors).flat();
      return { message: errors[0] };
    }

    // check if passwords match
    if (data.password !== data.password_confirm) {
      return { message: "Passwords do not match" };
    }

    const res = await fetch(`${API_HOST}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const { data: _, message } = await res.json();

    if (!res.ok) {
      return { message };
    }

    return { message: "Register successfull" };
  },
};
