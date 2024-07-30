import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export function load() {
  redirect(307, "/");
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: ({ cookies }) => {
    cookies.delete("token", { path: "/" });
    cookies.delete("user", { path: "/" });
    redirect(307, "/");
  },
};
