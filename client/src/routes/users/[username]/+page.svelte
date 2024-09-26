<script>
const { data } = $props();
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const user = $derived(data.user);
</script>

<pre>
{JSON.stringify(data, null, 2)}
</pre>

<table>
    <tbody>
        <tr>
            <td><img src={user?.avatar} alt="" /></td>
            <td><h1>User: {user.username}</h1></td>
        </tr>
    </tbody>
</table>
<hr />
{#each user.posts as post}
    <table>
        <tbody>
            <tr>
                <td><img src={post.author?.avatar} alt="" /></td>
                <td>{post.author?.username} says:<br />{post?.body}</td>
            </tr>
        </tbody>
    </table>
{/each}
