<script>
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { applyAction, enhance } from "$app/forms";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Button from "$lib/components/Button.svelte";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Input from "$lib/components/Input.svelte";
</script>

<main class="container max-w-2xl mx-auto">
	<form
		novalidate
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
		<fieldset class="grid gap-3">
			<legend class="font-bold mb-2">Sign In</legend>
			<Input label="Username" name="username" required={false} />
			<Input label="Password" name="password" type="password" />

			<label for="remember" class="flex items-center gap-3 w-fit">
				<input
					type="checkbox"
					class="checkbox checkbox-sm"
					id="remember"
					name="remember"
				/>
				<span class="label-text">Remember Me</span>
			</label>

			<Button class="w-fit">Sign In</Button>
		</fieldset>
	</form>
</main>
