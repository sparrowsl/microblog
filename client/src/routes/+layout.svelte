<script>
import "../app.css";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import Navbar from "./Navbar.svelte";

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const { children } = $props();
</script>

<svelte:head>
<title>Home Page | Microblog</title>
</svelte:head>

<Navbar/>
{@render children?.()}
