<script>
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import { enhance } from "$app/forms";
	// biome-ignore lint/correctness/noUnusedImports: <explanation>
	import { page } from "$app/stores";
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const current_user = $derived($page.data.current_user);
</script>

<div class="navbar bg-base-100">
	<a class="text-xl flex-1" href="/">Microblog</a>

	<ul class="px-1 flex gap-5 text-sm flex-none">
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
