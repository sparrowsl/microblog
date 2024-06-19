/** @type {import("./$types").PageServerLoad} */
export function load() {
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

	return { posts };
}
