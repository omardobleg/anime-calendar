<script lang="ts">
	import type { Anime } from '$lib/models/anime-schedule';
	import Badge from '$lib/components/Badge.svelte';
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import { toggle } from '$lib/db/animes.svelte';
	import { getFiltersContext, type Filters } from '$lib/store/filter.store.svelte';
	type AnimeCardProps = { fav: boolean; anime: Anime; delay: number };
	let { anime, delay = 10, fav }: AnimeCardProps = $props();
	const filters = getFiltersContext();
	let flipped = $derived(!fav && filters.faved);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	in:fade={{ duration: 200, delay }}
	class={[
		'sahdow-lg row-span-4 grid max-h-50 grid-rows-subgrid overflow-hidden rounded-lg bg-gray-100 ',
		flipped ? 'outline-2 outline-purple-700' : '',
		'flip-inner ',
		{ 'flip-it': flipped }
	]}
>
	<div
		class={[
			'row-span-2 flex max-h-100 bg-gray-300 lg:max-h-[25h] xl:max-h-[30vh] 2xl:max-h-[40vh]',
			{ hidden: flipped }
		]}
	>
		<img
			class="h-auto w-full object-contain object-center"
			alt=""
			src={anime.images.jpg.image_url}
		/>
	</div>
	<div class={['row-span-1 py-2 text-center sm:py-6', { hidden: flipped }]}>
		<p class="mb-2 text-xl font-bold text-gray-700">
			<a target="_blank" href={anime.url}>{anime.title}</a>
		</p>
	</div>
	<div class={['row-span-1', { hidden: flipped }]}>
		<div class="flex justify-between">
			<Button
				onclick={() => {
					toggle(anime);
				}}
				className="rounded-se-lg rounded-es-lg ">👍</Button
			>
			<Badge
				className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl px-3 py-1.5"
				>{anime.episodes ?? '?'}</Badge
			>
		</div>
	</div>

	<div class={['row-span-4', 'back', '', { hidden: !flipped }]}></div>
</div>

<style>
	.flip-inner {
		perspective: 1000px;
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
		min-height: 100%;
	}
	.back {
		transform: rotateY(180deg);
		margin: 2rem;
		min-height: 400px;
		background-color: var(--color-purple-200);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%238200db' fill-opacity='0.97' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
	}
	.flip-it {
		transform: rotateY(180deg);
	}
</style>
