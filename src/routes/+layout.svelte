<script>
import "../app.css";
// biome-ignore lint/correctness/noUnusedImports:
import Navbar from "./Navbar.svelte";

// biome-ignore lint/correctness/noUnusedVariables:
const { children } = $props();
</script>

<svelte:head>
<title>Home Page | Microblog</title>
</svelte:head>

<Navbar/>
{@render children?.()}
