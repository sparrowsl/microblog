<script>
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { applyAction, enhance } from "$app/forms";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { goto } from "$app/navigation";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Button from "$lib/components/Button.svelte";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Input from "$lib/components/Input.svelte";
</script>

<main class="container max-w-2xl mx-auto">
	<form
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "success") {
					alert(String(result.data?.message));
					goto("/login");
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<fieldset class="grid gap-3">
			<legend class="font-bold mb-2">Register</legend>
			<Input label="Username" name="username" />
			<Input label="Email" name="email" />
			<Input label="Password" name="password" type="password" />
			<Input label="Repeat Password" name="password_confirm" type="password" />

			<Button class="w-fit">Register</Button>
		</fieldset>
	</form>
</main>
