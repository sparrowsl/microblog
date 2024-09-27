import { PUBLIC_API_HOST } from "$env/static/public";
import { get_current_user } from "$lib/cookies";

/** @type {import("./$types").PageLoad} */
export async function load({ fetch }) {
  const req = await fetch(`${PUBLIC_API_HOST}/posts`);

  /** @type {import("$lib/types").API_Response} */
  const { data } = await req.json();

  if (!req.ok) {
    return { posts: [] };
  }

  return {
    current_user: get_current_user(),
    posts: data.posts,
  };
}
