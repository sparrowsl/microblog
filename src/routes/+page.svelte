<script>
/** @type {{data: import("./$types").PageServerData}} */
// biome-ignore lint/correctness/noUnusedVariables:
const { data } = $props();
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<h1 class="capitalize">Hi, {data.current_user?.username || "there"}!</h1>
{#each data.posts as post}
	<div>
		<p>{post.author?.username} says: <b>{post.body}</b></p>
	</div>
{/each}
