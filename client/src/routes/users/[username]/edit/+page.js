import { PUBLIC_API_HOST } from "$env/static/public";
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

  return { user: data.user };
}
