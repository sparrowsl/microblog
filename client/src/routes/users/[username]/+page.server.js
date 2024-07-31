import { API_HOST } from "$env/static/private";

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`${API_HOST}/users/${params.username}`);
  const { data } = await res.json();

  if (!res.ok) {
    return {
      user: {},
    };
  }

  data.user.avatar = `https://robohash.org/${data.user.email}`;

  return {
    user: data.user,
  };
}
