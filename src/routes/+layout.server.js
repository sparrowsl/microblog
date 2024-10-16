/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  return { current_user: locals.user };
}
