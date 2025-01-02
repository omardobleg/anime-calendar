<script lang="ts">
	import type { Snippet } from "svelte";

	let { className, children, icon }:{className:string,children:Snippet,icon?:Snippet} = $props();
</script>

<span
	class={[
		'whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700',
		className
	]}
>
	{#if icon}
		{@render icon()}
	{:else}
		📺
	{/if}
	{@render children?.()}
</span>
