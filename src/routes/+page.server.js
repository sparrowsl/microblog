import { redirect } from "@sveltejs/kit";

/** @type {import("./$types").PageServerLoad} */
export async function load({ locals }) {
  const posts = [
    {
      author: { username: "John" },
      body: "Beautiful day in Portland!",
    },
    {
      author: { username: "Susan" },
      body: "The Avengers movie was so cool!",
    },
  ];

  return { posts, current_user: locals.user };
}

/** @type {import("./$types").Actions} */
export const actions = {
  logout: ({ cookies }) => {
    cookies.delete("token", { path: "/" });
    redirect(307, "/");
  },
};
