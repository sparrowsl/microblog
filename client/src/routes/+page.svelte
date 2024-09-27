<script>
// import { get_current_user } from "$lib/cookies";

/** @type {{data: import("./$types").PageData}} */
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const { data } = $props();
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// const current_user = get_current_user();
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<h1 class="capitalize">Hi, {data.current_user?.username}!</h1>
{#each data.posts as post}
  <div>
    <p>{post.author.username} says: <b>{post.body}</b></p>
  </div>
  <!-- <div>
    <h3>{post.author.username}</h3>
    <p>{post.body}</p>
  </div> -->
{/each}
