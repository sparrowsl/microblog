import { API_HOST } from "$env/static/private";

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`${API_HOST}/users/${params.username}`);
  const { data } = await res.json();

  return {
    user: data.user,
  };
}
