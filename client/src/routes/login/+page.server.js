/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		console.log(form);

		return {
			message: "Successful",
		};
	},
};
