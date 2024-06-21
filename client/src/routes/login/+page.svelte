<script>
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import { applyAction, enhance } from "$app/forms";
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import Button from "$lib/components/Button.svelte";
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import Input from "$lib/components/Input.svelte";
</script>

<main>
	<h1>Sign In</h1>
	<form
		action=""
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "success") {
					alert(String(result.data?.message));
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<fieldset>
			<Input label="Username" name="username" required={false} />
			<Input label="Password" name="password" type="password" />

			<label for="remember" class="flex items-center gap-3">
				<input
					type="checkbox"
					class="checkbox checkbox-sm"
					id="remember"
					name="remember"
				/>
				<span class="label-text">Remember Me</span>
			</label>

			<!-- TODO: add content here -->
			<Button></Button>
		</fieldset>
	</form>
</main>
