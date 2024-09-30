<script>
/** @type {{data: import("./$types").PageData}} */
const { data } = $props();
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const user = $derived(data.user);
</script>

<!-- <pre>
{JSON.stringify(data, null, 2)}
</pre> -->

<table>
  <tbody>
    <tr>
      <td><img src={user?.avatar} alt="" /></td>
      <td><h1 class="font-bold text-2xl">User: {user.username}</h1></td>
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
