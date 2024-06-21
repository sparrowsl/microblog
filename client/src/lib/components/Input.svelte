<script>
	/** @type {{label?: string} & import("svelte/elements").HTMLInputAttributes}} props */
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const { label = "", ...props } = $props();
</script>

<label for={props.name || props.id}>
	<span class="block label-text">{(label && label) || ""}</span>

	<input
		{...props}
		id={props.name || props.id}
		type={props.type || "text"}
		class="{props.class} input-sm rounded"
	/>
</label>
