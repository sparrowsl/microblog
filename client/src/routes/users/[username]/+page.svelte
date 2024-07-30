<script>
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const { data } = $props();
console.log(data);
</script>

<pre>
{JSON.stringify(data, null, 2)}
</pre>
