import { PUBLIC_API_HOST } from "$env/static/public";
import { get_current_user } from "$lib/cookies";
import { error } from "@sveltejs/kit";

/** @type {import("./$types").PageLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`${PUBLIC_API_HOST}/users/${params.username}`);

  /** @type {import("$lib/types").API_Response} */
  const { data, message } = await res.json();

  if (!res.ok) {
    // error(404, { message: "No user with that name exists!!" })
    error(404, { message });
  }

  /** @returns {Promise<import("$lib/types").Post[]>} */
  async function get_posts() {
    const res = await fetch(`${PUBLIC_API_HOST}/posts`);
    return await res.json();
  }

  data.user.avatar = `https://robohash.org/${data.user.email}`;

  return {
    current_user: get_current_user(),
    user: data.user,
    posts: get_posts(),
  };
}
