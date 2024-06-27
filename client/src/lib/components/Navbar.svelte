<script>
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import { enhance } from "$app/forms";
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import { page } from "$app/stores";
	import Button from "./Button.svelte";
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const current_user = $derived($page.data.current_user);
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="text-xl" href="/">Microblog</a>
	</div>
	<div class="flex-none">
		<ul class="px-1 flex gap-5 text-sm">
			<li><a href="/">Home</a></li>
			{#if current_user}
				<form action="/logout" method="post" use:enhance>
					<button>Logout</button>
				</form>
			{:else}
				<li><a href="/login">Login</a></li>
			{/if}
		</ul>
	</div>
</div>
