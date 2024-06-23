<script>
/** @type {import("svelte/elements").HTMLButtonAttributes} */
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const { children, ...props } = $props();
</script>

<button {...props} class="{props.class} btn btn-sm">
  {#if children}
    {@render children()}
  {:else}
    Click Me
  {/if}
</button>
