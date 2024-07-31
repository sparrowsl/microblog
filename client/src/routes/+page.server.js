import { API_HOST } from "$env/static/private";

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, locals }) {
  const req = await fetch(`${API_HOST}/posts`);
  const { posts } = await req.json();

  if (!req.ok) {
    return { posts: [] };
  }

  return {
    current_user: locals.user,
    posts,
  };
}
