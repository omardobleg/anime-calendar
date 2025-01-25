<script lang="ts">
	import type { Snippet } from 'svelte';

	let flipped = $state(false);
	let { front, back }: { front: Snippet; back: Snippet } = $props();
	const onclick = () => {
		flipped = !flipped;
	};
</script>

<div class={['flip-inner', { 'flip-it': flipped }]}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<section class="front" {onclick} role="dialog">
		{@render front()}
	</section>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<section class="back" {onclick} role="dialog">
		{@render back()}
	</section>
</div>

<style>
	.flip-box {
		perspective: 1000px;
	}

	.flip-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}
	.front,
	.back {
		display: contents;
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
		box-shadow: -1px 1px 3px black;
	}
	.back {
		transform: rotateY(180deg);
	}
	.flip-it {
		transform: rotateY(180deg);
	}
</style>
