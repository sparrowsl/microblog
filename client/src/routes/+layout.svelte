<script>
import "../app.css";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Navbar from "../lib/components/Navbar.svelte";

/** @type {{children: import("svelte").Snippet}} */
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const { children } = $props();
</script>

<svelte:head>
<title>Home Page | Microblog</title>
</svelte:head>

<Navbar/>
<hr>
{@render children?.()}
