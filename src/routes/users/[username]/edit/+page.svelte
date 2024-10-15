<script>
// biome-ignore lint/correctness/noUnusedImports:
import { enhance } from "$app/forms";

/** @type {{data: import("./$types").PageServerData}} */
// biome-ignore lint/correctness/noUnusedVariables:
const { data } = $props();
</script>

<section class="max-w-xl mx-auto py-10">
	<h1 class="font-bold text-xl mb-5">Edit Profile</h1>

	<form action="" method="post" use:enhance>
		<input
			type="hidden"
			name="old_name"
			id="old_name"
			value={data.user?.username}
		/>
		<fieldset class="grid gap-5">
			<div>
				<label for="username" class="block text-sm mb-2 dark:text-white">
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={data.user?.username}
					class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
					required
				/>
			</div>

			<div>
				<label for="about_me" class="block text-sm mb-2 dark:text-white">
					About me
				</label>
				<textarea
					id="about_me"
					name="about_me"
					value={data.user?.about_me}
					rows="5"
					class="py-3 px-4 block w-full border-gray-200 rounded min-h-20 text-sm disabled:opacity-50 disabled:pointer-events-none resize-none text-sm"
				></textarea>
			</div>

			<button
				type="submit"
				class="w-full py-3 px-4 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mt-5"
			>
				Submit
			</button>
		</fieldset>
	</form>
</section>
