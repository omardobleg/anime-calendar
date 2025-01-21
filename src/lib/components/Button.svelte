<script>
	let { children, className, onclick } = $props();
</script>

<button
	class={[
		'group relative inline-flex overflow-hidden border border-purple-700 px-4 py-0 focus:outline-none focus:ring',
		className
	]}
	onclick={() => onclick()}
	type="button"
>
	<span
		class="absolute inset-y-0 left-0 w-[2px] bg-purple-700 transition-all group-hover:w-full group-active:bg-purple-500"
	></span>

	<span
		class="relative pb-1 text-sm font-medium text-purple-700 transition-colors group-hover:text-white"
	>
		{@render children?.()}
	</span></button
>
