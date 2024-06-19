<script>
/** @type {{children: import("svelte").Snippet}} */
const { children } = $props();
</script>

<svelte:head>
<title>Home Page | Microblog</title>
</svelte:head>

{@render children?.()}
