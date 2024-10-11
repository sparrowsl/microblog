<script>
/** @type {{data: import("./$types").PageData}} */
const { data } = $props();
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const user = data.user;
</script>

<!-- <pre>
{JSON.stringify(data, null, 2)}
</pre> -->

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
  {/each}
{/await}
