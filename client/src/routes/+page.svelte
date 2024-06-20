<script>
	/** @type {{data: import("./$types").PageServerData}} */
	const { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>

{#each data.posts as post}
	<div>
		<h3>{post.author.username}</h3>
		<p>{post.body}</p>
	</div>
{/each}
