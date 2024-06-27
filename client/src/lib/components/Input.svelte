<script>
/** @type {{label?: string} & import("svelte/elements").HTMLInputAttributes}} props */
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const { label = "", ...props } = $props();
</script>

<label for={props.id || props.name}>
	<span class="block label-text">{label ? label : ""}</span>

	<input
		{...props}
		required={props.required === undefined}
		id={props.id || props.name}
		type={props.type || "text"}
		class="{props.class} input-sm rounded"
	/>
</label>
