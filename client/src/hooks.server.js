/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const user = event.cookies.get("user");
	const token = event.cookies.get("token");

	// biome-ignore lint/complexity/useSimplifiedLogicExpression: <more readable>
	if (!user || !token) {
		return await resolve(event);
	}

	/** @type {import("$lib/types.js").User} */
	const current_user = JSON.parse(user);
	event.locals.user = current_user;

	return await resolve(event);
}
