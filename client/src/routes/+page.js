import { PUBLIC_API_HOST } from "$env/static/public";

/** @type {import("./$types").PageLoad} */
export async function load({ fetch }) {
  const req = await fetch(`${PUBLIC_API_HOST}/posts`);
  const { posts } = await req.json();

  if (!req.ok) {
    return { posts: [] };
  }

  return {
    // current_user: locals.user,
    posts,
  };
}
