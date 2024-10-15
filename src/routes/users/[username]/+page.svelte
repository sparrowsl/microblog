<script>
/** @type {{data: import("./$types").PageServerData}} */
const { data } = $props();
// biome-ignore lint/correctness/noUnusedVariables:
const { user, current_user } = data;
</script>

<table>
	<tbody>
		<tr>
			<td>
				<img
					src={user?.avatar}
					alt="{user.username}'s avatar"
					class="max-w-52 object-center"
				/>
			</td>
			<td>
				<h1 class="font-bold text-2xl">User: {user.username}</h1>
				{#if user.about_me}
					<p>{user.about_me}</p>
				{/if}
				{#if user.last_seen}
					<p>Last seen on: {user.last_seen}</p>
				{/if}
				{#if user.id === current_user?.id}
					<a
						href="/users/{current_user?.username}/edit"
						class="underline text-blue-700 block mt-3">Edit your profile</a
					>
				{/if}
			</td>
		</tr>
	</tbody>
</table>
<hr />

{#await data.posts}
	<p>loading posts...</p>
{:then { data }}
	{#each data?.posts || [] as post}
		<table>
			<tbody>
				<tr>
					<td>
						<img
							src={post.author?.avatar}
							alt="{post.author?.username}'s avatar"
						/>
					</td>
					<td>{post.author?.username} says:<br />{post?.body}</td>
				</tr>
			</tbody>
		</table>
	{:else}
		<p class="text-gray-500 italic">no posts yet!!!</p>
	{/each}
{/await}
