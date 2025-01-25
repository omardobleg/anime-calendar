<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		className,
		children,
		icon = '📺',
		onclick
	}: { className?: string; children: Snippet; icon?: string; onclick?: () => void } = $props();
</script>

<button
	{onclick}
	class={[
		'bg-purple-200 px-2.5 py-0.5 text-sm whitespace-nowrap text-purple-700',
		{
			'before:ease relative h-12 w-40 overflow-hidden border  shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-purple-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180':
				!!onclick
		},
		{ 'pointer-events-none': !onclick },
		className
	]}
>
	<span class="relative z-10 font-semibold">
		{#if icon}
			{icon}
		{:else}{/if}
		{@render children?.()}
	</span>
</button>
