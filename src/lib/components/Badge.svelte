<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		className,
		children,
		icon = '📺'
	}: { className?: string; children: Snippet; icon?: string } = $props();
</script>

<span class={['whitespace-nowrap bg-purple-200 px-2.5 py-0.5 text-sm text-purple-700', className]}>
	{#if icon}
		{icon}
	{:else}{/if}
	{@render children?.()}
</span>
